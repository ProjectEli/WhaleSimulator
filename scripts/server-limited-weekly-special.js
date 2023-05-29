class customMain extends HTMLElement {
  connectedCallback() {
    const stonePocketValue = 3000.0 / 44;

    const rowNode = document.createElement('div');
    rowNode.classList.add("row", "row-cols-auto", "g-4", "justify-content-center");
    const craftItems = [
      ['스킬 카드 뽑기팩 상자(기간) 40개', 1, 3, 1],
      ['드래곤의 성수 500개', 1, 3, 1],
      ['최상급 변신 뽑기팩(기간) 5개', 1, 4, 0],
      ['최상급 마법인형 뽑기팩(기간) 5개', 1, 4, 0],
      ['수호석 150개', 1, 3, 1],
      ['+6 수호의 인장', 1, 1, 0],
      ['+6 회복의 인장', 1, 1, 0],
      ['+7 수호의 인장', 1, 6, 2],
      ['+7 회복의 인장', 1, 6, 2],
      ['[미스터리 변신 카드]영웅', 1, 2, 0]
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
      return [itemName, description, estimationString];

    });
    cardInfo.forEach((elem) => {
      createCardView.call(undefined, rowNode, ...elem);
    });
    this.outerHTML = `
    <main>
      <div class='container-lg'>
        <div class="row row-cols-auto g-4 justify-content-center">
          <h2>서버한정 - 주말특별제작</h2>
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
      return trialsUpperBound; // select upper bound
    }
    const testProb = binomial_cdf_upper(winningProbabilityPerTrial, testTrials, targetWinnings);
    if (targetProb >= testProb) { // correction to upper side
      trialsLowerBound = testTrials + 1;
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
 */
function createCardView(parentNode, title, description, estimationString) {
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
      <a href="#" class="btn btn-outline-info w-100">상세보기</a>
    </div>
  </div>`;
  parentNode.appendChild(colNode);
}

customElements.define('main-placeholder', customMain);