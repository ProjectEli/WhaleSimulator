class customMain extends HTMLElement
{
  connectedCallback() {
    this.outerHTML = `
    <main>
    </main>`;

    document.getElementById('btn-prob-calc').addEventListener( 'click', () => {
      // todo: some visibility and availability functions
      setTimeout(ArbitraryProbCalc,100); // ms
    } )
  }
}

customElements.define('main-placeholder',customMain)

/** Calculate binomial probabilty from arbitrary condition */
function ArbitraryProbCalc() {
  const startTime = performance.now();
  let resultTag = document.getElementById('prob-calc-result');
  const probValue = parseFloat(document.getElementById('probvalue').value)/100;
  const costPer = parseFloat(document.getElementById('costper').value);
  const costPerUnit = document.getElementById("costperunit").value;
  const trials = parseInt(document.getElementById("numtrials").value);
  const targetWinnings = parseInt(document.getElementById("numwant").value);

  const isValidInputTuple = inputValidityCheck(probValue,trials,targetWinnings);
  const isValidInput = isValidInputTuple[0]
  const errMsg = isValidInputTuple[1];

  if (isValidInput) {
    let upperProb = binomial_cdf_upper(probValue,trials,targetWinnings);
    resultTag.textContent = trials + '번 뽑아서 ' + targetWinnings + '개 이상 나올 확률: ' + (upperProb*100).toString() + ' %';
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
  else if (probValue>=1) {
    return [false, "계산 실패: 1뽑 확률이 100% 이상입니다!"]
  }
  else if (trials>10000000) {
    return [false, "계산 실패: 뽑기 시도 횟수가 천만 회보다 큽니다!(최대 10000000회)"]
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
 * @param {number} testfun test function returns probability
 * @returns {number} required trials for target probability
 */
function binary_probability_search(winningProbabilityPerTrial, targetWinnings, targetProb, testfun) {
  let trialsLowerBound = 1;
  let trialsUpperBound = Number.MAX_SAFE_INTEGER - 1;
  do {
    const testTrials = Math.floor((trialsLowerBound + trialsUpperBound) / 2); // avg
    if (testTrials === trialsUpperBound) {
      return trialsUpperBound; // select upper bound
    }
    const testProb = testfun(targetWinnings - 1, testTrials, winningProbabilityPerTrial);
    if (targetProb >= testProb) { // correction to upper side
      trialsLowerBound = testTrials + 1;
    }
    else { // correction to lower side
      trialsUpperBound = testTrials - 1;
    }
  } while (trialsLowerBound <= trialsUpperBound);
}