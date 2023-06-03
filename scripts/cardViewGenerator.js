import { requiredTrials } from './probability.js';
import { stonePocketValue } from './LinageM.js'

/**
 * creates card view with template
 * @param {HTMLElement} parentNode 
 * @param {string} title 
 * @param {string} description 
 * @param {string} estimationString 
 * @param {string} queryString 
 */
function createCardView(parentNode, title, description, estimationString, queryString, imgFileName) {
  const colNode = document.createElement('div');
  colNode.classList.add('col');
  colNode.innerHTML = `
  <div class="card h-100">
    <img class="card-img-top m-2" src="img/${imgFileName}">
    <div class="card-body border-top">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text">${estimationString}</p>
    </div>
    <div class="card-footer p-0">
      <a href="/WhaleSimulator/detailed-calc?${queryString}" class="btn btn-outline-info btn-block w-100 rounded-bottom-1 rounded-top-0 border-0">상세보기</a>
    </div>
  </div>`;
  parentNode.appendChild(colNode);
}

export function cardViewStr(craftItems) {
  const rowNode = document.createElement('div');
  rowNode.classList.add("row", "row-cols-auto", "g-4", "justify-content-center");
  const cardInfo = Array.from(craftItems, (elem) => {
    const itemName = elem[0];
    const probPercent = elem[1];
    const NMstones = elem[2];
    const HQstones = elem[3];
    const imgFileName = elem[4];
    const NMstoneStrnig = (NMstones > 0) ? `스톤 주머니 ${NMstones}개` : ``;
    const HQstoneStrnig = (HQstones > 0) ? ` or 고급 스톤 주머니 ${HQstones}개` : ``;
    const costPerTrial = stonePocketValue * NMstones;
    const costString = ` (${costPerTrial.toFixed(2)}다이아)`;
    const description = `제작 확률: ${probPercent}%<br>재료: ${NMstoneStrnig}${HQstoneStrnig}${costString}`;
    const avgTrials = requiredTrials(probPercent / 100, 1, 0.5);
    const estimationString = `기댓값: ${avgTrials}회 = ${(avgTrials * costPerTrial).toFixed(1)}다이아`;
    const queryString = `itemName=${itemName}&probPercent=${probPercent}&NMstones=${NMstones}&HQstones=${HQstones}`;
    return [itemName, description, estimationString, queryString, imgFileName];
  });
  cardInfo.forEach((elem) => {
    createCardView.call(undefined, rowNode, ...elem);
  });
  return rowNode.outerHTML;
}