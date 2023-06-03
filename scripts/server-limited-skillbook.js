import { cardViewStr } from './cardViewGenerator.js'
const craftItems = [
  ['신화 스킬북 선택 상자(각인)', 3.5, 735, 0, '신화스킬북선택상자(각인).JPG'],
  ['오시리스 무기 제작 비법서', 15, 42, 0, '오시리스 무기 제작 비법서.JPG'],
  ['전설 스킬북 선택 상자', 20, 660, 0, '전설 스킬북 선택상자.JPG'],
  ['전설 제작 비법서(각인)', 10, 201, 0, '전설 제작 비법서(각인).JPG'],
  ['장인의 무기 마법 주문서(각인)', 10, 111, 0, '장인의 무기 마법 주문서(각인).JPG']
];

class customCardView extends HTMLElement {
  connectedCallback() {
    this.outerHTML = cardViewStr(craftItems);
  }
}
customElements.define('cardview-placeholder', customCardView);