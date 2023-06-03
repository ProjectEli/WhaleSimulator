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
export function requiredTrials(winningProbabilityPerTrial, targetWinnings, targetProb) {
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