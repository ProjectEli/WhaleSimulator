class NavBuilder extends HTMLElement
{
  connectedCallback() {
    this.outerHTML = `
    <nav class="navbar navbar-expand-sm mb-2 bg-body-tertiary">
      <div class="container-lg">
        <a class="navbar-brand" href="/WhaleSimulator/">과금뚝배기</a>
        <button class="navbar-toggler p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-12 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                카드뽑기
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">변신/인형뽑기</a></li>
                <li><a class="dropdown-item" href="#">스킬카드뽑기</a></li>
                <li><a class="dropdown-item" href="#">다시뽑기</a></li>
                <li><a class="dropdown-item" href="#">코인뽑기</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/WhaleSimulator/direct" role="button">
                직접뽑기
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
  }
}

class buttonList extends HTMLElement
{
  connectedCallback() {
    this.outerHTML = `
    <div class="container-lg mb-2">
      <button type="button" class="btn btn-outline-primary" id="generateTableButton">표 생성</button>
      <button type="button" class="btn btn-outline-danger" id="deleteTableButton">표 삭제</button>
      <button type="button" class="btn btn-outline-warning" id="toggleColorMode">컬러모드변경</button>  
    </div>`;
  }
}

customElements.define('nav-placeholder',NavBuilder);
customElements.define('buttonlist-placeholder',buttonList);