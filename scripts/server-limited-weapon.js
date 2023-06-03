import { cardViewStr } from './cardViewGenerator.js'
const craftItems = [
  ['빛나는 전설 가더 선택 상자', 10, 552, 0,'빛나는 전설 가더 선택 상자.JPG'],
  ['빛나는 전설 무기 선택 상자', 10, 552, 0,'빛나는 전설 무기 선택 상자.JPG'],
  ['빛나는 전설 방어구 선택 상자', 10, 552, 0,'빛나는 전설 방어구 선택 상자.JPG'],
  ['빛나는 전설 팔찌 선택 상자', 10, 660, 0,'빛나는 전설 팔찌 선택 상자.JPG'],
  ['제브 레퀴의 전설 목걸이 선택 상자', 10, 660, 0,'제브 레퀴의 전설 목걸이 선택 상자.JPG'],
  ['최상급 룬 변환석', 10, 276, 0,'최상급 룬 변환석.JPG']
];

class customCardView extends HTMLElement {
  connectedCallback() {
    this.outerHTML = cardViewStr(craftItems);
  }
}
customElements.define('cardview-placeholder', customCardView);