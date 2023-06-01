const stonePocketValue = 3000.0 / 44;
const HQstonePocketValue = stonePocketValue * 3;
const defaultcostPerTrial = HQstonePocketValue;
const defaultWinningRatePercent = 1;
const defaultNMstones = 3;
const defaultHQstones = 1;

const ctx = document.getElementById('luckChart');

// const url = new URL(encodeURIComponent(btoa(document.URL)));
// const searchparams = new URLSearchParams(url.search);
// console.log(searchparams.get('name'));
/**
 * Calculates upper probability
 * @param {number} p probability value from 0-1
 * @param {number} n number of trials
 * @param {number} x target winnings
 * @returns {number}
 */
function binomial_cdf_upper(p, n, x) {
  let cdf = 0;
  let logb = 0; // log value of binomial coeff
  const q = 1 - p;
  const n1 = n + 1;
  for (let k = 0; k < x; k++) {
    if (k > 0) {
      logb += Math.log(n1 - k) - Math.log(k);
    }
    cdf += Math.exp(logb + k * Math.log(p) + (n - k) * Math.log(q))
  }
  return 1 - cdf;
}

/**
 * Calculate required trials using binary search method
 * @param {number} winningProbabilityPerTrial winning probability per trials (0-1)
 * @param {number} targetWinnings target number of winnings
 * @param {number} targetProb probability taget for targetWinnings (0-1)
 * @returns {number} required trials for target probability
 */
function requiredTrials(winningProbabilityPerTrial, targetWinnings, targetProb) {
  let trialsLowerBound = 1;
  let trialsUpperBound = Number.MAX_SAFE_INTEGER;
  do {
    const testTrials = Math.floor((trialsLowerBound + trialsUpperBound) / 2); // avg
    if (testTrials === trialsUpperBound) {
      const testProb = binomial_cdf_upper(winningProbabilityPerTrial, testTrials, targetWinnings);
      if (targetProb <= testProb) { // last correction
        return (testTrials == 1 )? testTrials: testTrials - 1 ;
      }
      return trialsUpperBound; // select upper bound
    }
    const testProb = binomial_cdf_upper(winningProbabilityPerTrial, testTrials, targetWinnings);
    if (targetProb >= testProb) { // correction to upper side
      trialsLowerBound = testTrials +1 ;
    }
    else { // correction to lower side
      trialsUpperBound = testTrials - 1;
    }
  } while (trialsLowerBound <= trialsUpperBound);
}

/**
 * update required cost results
 */
function updateResult() {
  const isHQ = document.getElementById('HQselect').checked;
  const ingredientName = (isHQ) ? "고급 스톤 주머니/성장물약" : "스톤 주머니/성장물약";
  const quantity = (isHQ) ? parseFloat(document.getElementById('HQstoneQuantity').value) : parseFloat(document.getElementById('NMstoneQuantity').value);
  const costPerTrial = (isHQ) ? HQstonePocketValue * quantity : stonePocketValue * quantity;
  const winningRatePercent = parseFloat(document.getElementById('WinningRatePercent').value);

  document.getElementById("costPerTrial").textContent = `${ingredientName} ${quantity}개 = ${costPerTrial.toFixed(3)} 다이아`;
  document.getElementById("currentWinningProbability").textContent = `적용 확률= ${winningRatePercent.toFixed(5)}%`;

  const estimationTable = document.getElementById("estimationTable");
  const caseTypes = ["운 좋을 때", "평균 운", "운 없을 때"];
  const percentiles = [25, 50, 75];
  const _requiredTrials = Array.from(percentiles, (pPercent) => requiredTrials(winningRatePercent / 100, 1, pPercent / 100.0));
  const requiredCosts = Array.from(_requiredTrials, trials => trials * costPerTrial);
  const tbody = estimationTable.querySelector('tbody')

  tbody.innerHTML = '';
  caseTypes.forEach((caseType, idx) => {
    let trNode = document.createElement("tr");
    let typeNode = document.createElement("th", { scope: "row" });
    typeNode.textContent = caseType;
    let percentileNode = document.createElement("th");
    percentileNode.textContent = `${percentiles[idx]}%`;
    let trialsNode = document.createElement("th");
    trialsNode.textContent = `${_requiredTrials[idx]}회`;
    let costsNode = document.createElement("th");
    costsNode.textContent = `${requiredCosts[idx].toFixed(1)} 다이아`;

    trNode.appendChild(typeNode);
    trNode.appendChild(percentileNode);
    trNode.appendChild(trialsNode);
    trNode.appendChild(costsNode);
    tbody.appendChild(trNode);
  });

  const customPercent = document.getElementById('adjustLuckSlider').value;
  const customLuckResult = document.getElementById("customLuckResult");
  const customReqTrials = requiredTrials(winningRatePercent / 100, 1, parseFloat(customPercent) / 100.0);
  customLuckResult.textContent = `운 상위 ${customPercent}% = ${customReqTrials}회 (${(customReqTrials * costPerTrial).toFixed(1)} 다이아)`;

  let resultChart = Chart.getChart(ctx.id);
  resultChart.options.plugins.tooltip.callbacks = {
    title: () => null,
    label: (tooltipItem) => {
      if (tooltipItem.parsed.x <= 50) {
        return `운 상위 ${tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y * costPerTrial).toFixed(1)}다이아)`;
      }
      else {
        return `운 하위 ${100 - tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y * costPerTrial).toFixed(1)}다이아)`;
      }
    },
  };
  resultChart.update();
}

function setValuesFromURL() {
  const parsedURL = new URL(document.URL);
  const itemName = parsedURL.searchParams.get('itemName');
  if (itemName) {
    document.getElementById('itemName').textContent = `: ${itemName}`;
  }
  const winningRatePercent = parseFloat(parsedURL.searchParams.get('probPercent'));
  const NMstones = parseFloat(parsedURL.searchParams.get('NMstones'));
  const HQstones = parseFloat(parsedURL.searchParams.get('HQstones'));
  document.getElementById('WinningRatePercent').value = (Number.isNaN(winningRatePercent)) ? defaultWinningRatePercent: winningRatePercent;
  document.getElementById('NMstoneQuantity').value = (Number.isNaN(NMstones)) ? defaultNMstones : NMstones;
  document.getElementById('HQstoneQuantity').value = (Number.isNaN(HQstones)) ? defaultHQstones : HQstones;

  drawChart((Number.isNaN(winningRatePercent)) ? defaultWinningRatePercent: winningRatePercent);
  updateResult();
  updateLuckPoint();
}

/**
 * draw chart based on winning rate percent value
 * @param {number} winningRatePercent winning rate percent (0-100)
 */
function drawChart(winningRatePercent) {
  const percentiles = [1, 2.5, 5, 10, 25, 50, 75, 90, 95, 97.5, 99];
  const reqTrials = Array.from(percentiles, (pPercent) => requiredTrials(winningRatePercent / 100, 1, pPercent / 100.0));
  const coords = percentiles.map((v, i) => ({ x: v, y: reqTrials[i] }));

  const customPercent = document.getElementById('adjustLuckSlider').value;
  const customReqTrials = requiredTrials(winningRatePercent / 100, 1, parseFloat(customPercent) / 100.0);

  Chart.defaults.font.size = 14;
  Chart.defaults.font.family = "'NanumSquare', sans-serif";
  Chart.defaults.font.weight = 'bold';
  Chart.getChart(ctx.id)?.destroy();
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        fill: true,
        data: coords,
        order: 2
      }, {
        data: [{ x: customPercent, y: customReqTrials }],
        order: 1
      }]
    },
    options: {
      responsive: true,
      showLine: true,
      scales: {
        y: {
          type: 'logarithmic',
          title: {
            display: true,
            text: '뽑기횟수(회), 로그스케일'
          },
        },
        x: {
          title: {
            display: true,
            text: '백분율(%)'
          },
        },
      },
      elements: {
        point: {
          radius: 7
        }
      },

      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            title: () => null,
            label: (tooltipItem) => {
              if (tooltipItem.parsed.x <= 50) {
                return `운 상위 ${tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y * defaultcostPerTrial).toFixed(1)}다이아)`;
              }
              else {
                return `운 하위 ${100 - tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y * defaultcostPerTrial).toFixed(1)}다이아)`;
              }
            },
          },
        }
      }
    }
  });
}

function updateLuckPoint() {
  const selectedIngredient = document.querySelector("input[name='ingredients']:checked");
  const quantity = selectedIngredient.parentNode.parentNode.querySelector("input[type='number']").value;
  const costPerTrial = (selectedIngredient.value === "HQ") ? HQstonePocketValue * quantity : stonePocketValue * quantity;
  const customPercent = document.getElementById('adjustLuckSlider').value;
  const customLuckResult = document.getElementById("customLuckResult");
  const winningRatePercent = parseFloat(document.getElementById('WinningRatePercent').value);
  const reqTrials = requiredTrials(winningRatePercent / 100, 1, parseFloat(customPercent) / 100.0);
  const resultChart = Chart.getChart(ctx.id);
  customLuckResult.textContent = `운 상위 ${customPercent}% = ${reqTrials}회 (${(reqTrials * costPerTrial).toFixed(1)} 다이아)`;
  resultChart.data.datasets[1].data = [{ x: customPercent, y: reqTrials }];
  resultChart.update('none');
}

setValuesFromURL();

window.addEventListener('resize', () => {
  for (let id in Chart.instances) {
    Chart.instances[id].resize();
  }
});


document.querySelectorAll("input[name='ingredients']").forEach((elem) => {
  elem.addEventListener("input", (e) => {
    updateResult();
  });
});

document.querySelectorAll("input[type='number']").forEach((elem) => {
  for (eventType of ["change"]) {
    elem.addEventListener(eventType, (e) => {
      if (e.target.id === 'WinningRatePercent') {
        drawChart(parseFloat(e.target.value))
      }
      else {
        const radioButton = e.target.parentNode.querySelector("input[name='ingredients']");
        radioButton.checked = true;
      }
      updateResult();
      updateLuckPoint();
    });
  }
});

document.querySelectorAll("input[type='range']").forEach((elem) => {
  for (eventType of ["input", "change"]) {
    elem.addEventListener(eventType, (e) => {
      updateLuckPoint();
    });
  }
});