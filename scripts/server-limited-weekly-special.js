import { cardViewStr } from './cardViewGenerator.js'
const craftItems = [
  ['스킬 카드 뽑기팩 상자(기간) 40개', 1, 3, 1,'신화스킬북선택상자(각인).JPG'],
  ['드래곤의 성수 500개', 1, 3, 1,'신화스킬북선택상자(각인).JPG'],
  ['최상급 변신 뽑기팩(기간) 5개', 1, 4, 0,'신화스킬북선택상자(각인).JPG'],
  ['최상급 마법인형 뽑기팩(기간) 5개', 1, 4, 0,'신화스킬북선택상자(각인).JPG'],
  ['수호석 150개', 1, 3, 1,'신화스킬북선택상자(각인).JPG'],
  ['+6 수호의 인장', 1, 1, 0,'신화스킬북선택상자(각인).JPG'],
  ['+6 회복의 인장', 1, 1, 0,'신화스킬북선택상자(각인).JPG'],
  ['+7 수호의 인장', 1, 6, 2,'신화스킬북선택상자(각인).JPG'],
  ['+7 회복의 인장', 1, 6, 2,'신화스킬북선택상자(각인).JPG'],
  ['[미스터리 변신 카드]영웅', 1, 2, 0,'신화스킬북선택상자(각인).JPG']
];

class customCardView extends HTMLElement {
  connectedCallback() {
    this.outerHTML = cardViewStr(craftItems);
  }
}
customElements.define('cardview-placeholder', customCardView);