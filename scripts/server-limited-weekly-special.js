import { cardViewStr } from './cardViewGenerator.js'
const craftItems = [
  ['스톤주머니(성장물약)1개상품', 1, 1, 0,'6지휘관 휘장.JPG'],
  ['스톤주머니(성장물약)2개상품', 1, 2, 0,'특별한 영웅 마법인형 카드 선택 상자.JPG'],
  ['스톤주머니(성장물약)3개상품', 1, 3, 0,'상급변신뽑기팩100개.JPG'],
  ['스톤주머니(성장물약)4개상품', 1, 4, 0,'최상급 변신 뽑기팩.JPG'],
  ['스톤주머니(성장물약)5개상품', 1, 5, 0,'6지휘관 휘장.JPG'],
  ['스톤주머니(성장물약)6개상품', 1, 6, 0,'희귀 컬렉션 선택상자.JPG'],
  ['스톤주머니(성장물약)8개상품', 1, 8, 0,'변신카드(현상범쿠작).JPG'],
  ['스톤주머니(성장물약)9개상품', 1, 9, 0,'6지휘관 휘장.JPG']
];

class customCardView extends HTMLElement {
  connectedCallback() {
    this.outerHTML = cardViewStr(craftItems);
  }
}
customElements.define('cardview-placeholder', customCardView);