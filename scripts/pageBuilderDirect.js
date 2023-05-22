class customMain extends HTMLElement
{
  connectedCallback() {
    this.outerHTML = `<main></main>`;
  }
}

customElements.define('main-placeholder',customMain)