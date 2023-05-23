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

function binomial_cdf_upper(p, n, x) {
  let cdf = 0;
  let logb = 0; // log value of binomial coeff
  const q = 1 - p;
  const n1 = n + 1;
  for (let k = 0; k <= x; k++) {
    if (k > 0) {
      logb += Math.log(n1 - k) - Math.log(k);
    }
    cdf += Math.exp(b + k * Math.log(p) + (n - k) * Math.log(q))
  }
  return 1 - cdf;
}

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