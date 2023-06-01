class customMain extends HTMLElement {
  connectedCallback() {
    this.outerHTML = `
    <main>
    </main>`;

    document.getElementById('btn-prob-calc').addEventListener('click', () => {
      // todo: some visibility and availability functions
      ArbitraryProbCalc();
    })
  }
}

customElements.define('main-placeholder', customMain)

/**
 * format probability string properly
 * @param {number} probVal 
 * @returns {string}
 */
function probabilityString(probVal) {
  return probVal.toString().replace(/\.0*$|(\.\d*[1-9])0+$/, '$1');
}

/** Calculate binomial probabilty from arbitrary condition */
function ArbitraryProbCalc() {
  const startTime = performance.now();
  const resultTag = document.getElementById('prob-calc-result');
  const probValuePercent = parseFloat(document.getElementById('probvalue').value);
  const probValue = probValuePercent / 100;
  const costPer = parseFloat(document.getElementById('costper').value);
  const costPerUnit = document.getElementById("costperunit").value;
  const trials = parseInt(document.getElementById("numtrials").value);
  const targetWinnings = parseInt(document.getElementById("numwant").value);

  const isValidInputTuple = inputValidityCheck(probValue, trials, targetWinnings);
  const isValidInput = isValidInputTuple[0];
  const errMsg = isValidInputTuple[1];

  if (isValidInput) {
    resultTag.innerHTML = '';
    const upperProb = binomial_cdf_upper(probValue, trials, targetWinnings);
    const probStringPercent = probabilityString(probValuePercent);
    const probNode = document.createElement('p');
    probNode.textContent = probStringPercent + '% 확률 ' + parseInt(trials).toLocaleString() + '번 뽑아서 ' + targetWinnings + '개 이상 나올 확률: ' + probabilityString(upperProb * 100) + '%';
    resultTag.appendChild(probNode);

    const reqN = requiredTrials(probValue, targetWinnings, 0.5);
    const reqNNode = document.createElement('p');
    reqNNode.textContent = '상위 50%가 ' + probStringPercent + '% 확률 상품 ' + targetWinnings + '개 획득하는 뽑기 횟수: ' + parseInt(reqN).toLocaleString() + '회';
    resultTag.appendChild(reqNNode);
  }
  else {
    resultTag.innerHTML = '';
    const errMsgNode = document.createElement('p');
    errMsgNode.textContent=errMsg;
    resultTag.appendChild(errMsgNode);
  }
}

/**
 * check validity of inputs
 * @param {number} probValue 
 * @param {number} trials 
 * @param {number} targetWinnings 
 * @returns {[boolean,string]}
 */
function inputValidityCheck(probValue, trials, targetWinnings) {
  if (trials < targetWinnings) {
    return [false, "계산 실패: 뽑기 횟수보다 당첨 횟수 목표가 더 많습니다!"]
  }
  else if (probValue >= 1) {
    return [false, "계산 실패: 1뽑 확률이 100% 이상입니다!"]
  }
  else if (trials > Number.MAX_SAFE_INTEGER - 1) {
    return [false, "계산 실패: 뽑기 시도 횟수가 너무 큽니다! (최대 9007199254740990회)"]
  }
  else {
    return [true, ""];
  }
}

/**
 * Calculate binomial probability
 * @param {number} p probability value from 0-1
 * @param {number} n number of trials
 * @param {number} x target winnings
 * @returns {number} 
 */
function binomial_exact(p, n, x) {
  const x_reduced = Math.min(x, n - x);
  let logb = 0; // log value of binomial coeff
  const q = 1 - p;
  const n1 = n + 1;
  for (let k = 0; k <= x_reduced; k++) {
    if (k > 0) {
      logb += Math.log(n1 - k) - Math.log(k);
    }
  }
  return Math.exp(b + x * Math.log(p) + (n - x) * Math.log(q));
}

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