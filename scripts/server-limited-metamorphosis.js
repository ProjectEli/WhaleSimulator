import { cardViewStr } from './cardViewGenerator.js'
const craftItems = [
  ['[미스터리 마법인형 카드] 전설', 5, 957, 0,'[미스터리 마법인형 카드] 전설.JPG'],
  ['[미스터리 변신 카드] 전설', 5, 957, 0,'[미스터리 변신 카드] 전설.JPG'],
  ['특별한 영웅 마법인형 카드 선택 상자', 5, 120, 0,'특별한 영웅 마법인형 카드 선택 상자.JPG'],
  ['특별한 영웅 변신 카드 선택 상자', 5, 120, 0,'특별한 영웅 변신 카드 선택 상자.JPG']
];

class customCardView extends HTMLElement {
  connectedCallback() {
    this.outerHTML = cardViewStr(craftItems);
  }
}
customElements.define('cardview-placeholder', customCardView);