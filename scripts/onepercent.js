const stonePocketValue = 3000.0/44;
const HQstonePocketValue = stonePocketValue *3;
const defaultcostPerTrial = HQstonePocketValue;
const winingRatePercent = 1.0;

const ctx = document.getElementById('myChart');

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
      return trialsUpperBound; // select upper bound
    }
    const testProb = binomial_cdf_upper(winningProbabilityPerTrial,testTrials, targetWinnings);
    if (targetProb >= testProb) { // correction to upper side
      trialsLowerBound = testTrials + 1;
    }
    else { // correction to lower side
      trialsUpperBound = testTrials - 1;
    }
  } while (trialsLowerBound <= trialsUpperBound);
}

/**
 * update required cost results
 * @param {string} ingredientName ingredient name
 * @param {number} quantity ingredient quantities
 * @param {number} costPerTrial cost per trial
 */
function updateResult(ingredientName,quantity,costPerTrial) {
  document.getElementById("costPerTrial").textContent = `${ingredientName} ${quantity}개 = ${costPerTrial.toFixed(3)} 다이아`;

  const estimationTable = document.getElementById("estimationTable");
  const caseTypes = ["운 좋을 때", "평균 운", "운 없을 때"];
  const percentiles = [25, 50, 75];
  const _requiredTrials = Array.from(percentiles, (pPercent) => requiredTrials(winingRatePercent/100,1,pPercent/100.0));
  const requiredCosts = Array.from(_requiredTrials, trials => trials * costPerTrial);
  const tbody = estimationTable.querySelector('tbody')
  
  tbody.innerHTML = '';
  caseTypes.forEach( (caseType, idx) => {
    let trNode = document.createElement("tr");
    let typeNode = document.createElement("th",{scope: "row"});
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

  resultChart.options.plugins.tooltip.callbacks = {
    title: () => null,
    label: (tooltipItem) => {
      if (tooltipItem.parsed.x <= 50) {
        return `운 상위 ${tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y*costPerTrial).toFixed(1)}다이아)`;
      }
      else {
        return `운 하위 ${100-tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y*costPerTrial).toFixed(1)}다이아)`;
      }
    },
  };
  resultChart.update();
}

const percentiles = [1,2.5,5,10,25,50,75,90,95,97.5,99];
const reqTrials = Array.from(percentiles, (pPercent) => requiredTrials(winingRatePercent/100,1,pPercent/100.0));
const coords = percentiles.map( (v,i) => ({x:v, y:reqTrials[i]}) );

Chart.defaults.font.size = 14;
Chart.defaults.font.family = "'NanumSquare', sans-serif";
Chart.defaults.font.weight = 'bold';
let resultChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    
    datasets: [{
      fill:true,
      data: coords,
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
              return `운 상위 ${tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y* defaultcostPerTrial).toFixed(1)}다이아)`;
            }
            else {
              return `운 하위 ${100-tooltipItem.parsed.x}% = ${tooltipItem.parsed.y}회 (${(tooltipItem.parsed.y*defaultcostPerTrial).toFixed(1)}다이아)`;
            }
          },
        },
      }
    }
  }
});

window.addEventListener('resize', () => {
  for (let id in Chart.instances) {
    Chart.instances[id].resize();
  }
});


document.querySelectorAll("input[name='ingredients']").forEach( (elem) =>{
  elem.addEventListener("input", (e) => {
    const quantity = e.target.parentNode.parentNode.querySelector("input[type='number']").value;
    const costPerTrial = (e.target.value === "HQ")? HQstonePocketValue * quantity: stonePocketValue * quantity;
    const ingredientName = (e.target.value === "HQ")? "고급 스톤 주머니/성장물약" : "스톤 주머니/성장물약";
    updateResult(ingredientName,quantity,costPerTrial);
  });
});

document.querySelectorAll("input[type='number']").forEach( (elem) =>{
  for (eventType of ["click", "change"]) {
    elem.addEventListener(eventType, (e) => {
      const radioButton = e.target.parentNode.querySelector("input[name='ingredients']");
      radioButton.checked = true;
      const quantity = e.target.value;
      const costPerTrial = (radioButton.value === "HQ")? HQstonePocketValue * quantity: stonePocketValue * quantity;
      const ingredientName = (e.target.parentNode.querySelector("input[name='ingredients']").value === "HQ")? "고급 스톤 주머니/성장물약" : "스톤 주머니/성장물약";
      updateResult(ingredientName,quantity,costPerTrial);
    });
  }
});