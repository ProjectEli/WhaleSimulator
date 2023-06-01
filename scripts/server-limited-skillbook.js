class customMain extends HTMLElement {
  connectedCallback() {
    const stonePocketValue = 3000.0 / 44;
    const pageTitle = '서버한정 - 스킬북/비법서/주문서';

    const rowNode = document.createElement('div');
    rowNode.classList.add("row", "row-cols-auto", "g-4", "justify-content-center");
    const craftItems = [
      ['신화 스킬북 선택 상자(각인)', 3.5, 735, 0],
      ['오시리스 무기 제작 비법서', 15, 42, 0],
      ['전설 스킬북 선택 상자', 20, 660, 0],
      ['전설 제작 비법서(각인)', 10, 201, 0],
      ['장인의 무기 마법 주문서(각인)', 10, 111, 0]
    ];
    const cardInfo = Array.from(craftItems, (elem) => {
      const itemName = elem[0];
      const probPercent = elem[1];
      const NMstones = elem[2];
      const HQstones = elem[3];
      let NMstoneStrnig = (NMstones > 0) ? `스톤 주머니 ${NMstones}개` : ``;
      let HQstoneStrnig = (HQstones > 0) ? ` or 고급 스톤 주머니 ${HQstones}개` : ``;
      let costPerTrial = stonePocketValue * NMstones;
      let costString = ` (${costPerTrial.toFixed(2)}다이아)`;
      const description = `제작 확률: ${probPercent}%<br>재료: ${NMstoneStrnig}${HQstoneStrnig}${costString}`;
      const avgTrials = requiredTrials(probPercent / 100, 1, 0.5);
      const estimationString = `기댓값: ${avgTrials}회 = ${(avgTrials * costPerTrial).toFixed(1)}다이아`;
      const queryString = `itemName=${itemName}&probPercent=${probPercent}&NMstones=${NMstones}&HQstones=${HQstones}`;
      return [itemName, description, estimationString, queryString];

    });
    cardInfo.forEach((elem) => {
      createCardView.call(undefined, rowNode, ...elem);
    });
    this.outerHTML = `
    <main>
      <div class='container-lg'>
        <div class="row row-cols-auto g-4 justify-content-center">
          <h2>${pageTitle}</h2>
        </div>
        ${rowNode.outerHTML}
      </div>
    </main>`;
  }
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

/**
 * creates card view with template
 * @param {HTMLElement} parentNode 
 * @param {string} title 
 * @param {string} description 
 * @param {string} estimationString 
 * @param {string} queryString 
 */
function createCardView(parentNode, title, description, estimationString, queryString) {
  const colNode = document.createElement('div');
  colNode.classList.add('col');
  colNode.innerHTML = `
  <div class="card h-100">
    <img class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text">${estimationString}</p>
    </div>
    <div class="card-footer">
      <a href="/WhaleSimulator/detailed-calc?${queryString}" class="btn btn-outline-info w-100">상세보기</a>
    </div>
  </div>`;
  parentNode.appendChild(colNode);
}

customElements.define('main-placeholder', customMain);