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
                <li><a class="dropdown-item" href="/WhaleSimulator/metamorphosis">변신/인형뽑기</a></li>
                <li><a class="dropdown-item" href="#">스킬카드뽑기</a></li>
                <li><a class="dropdown-item" href="#">다시뽑기</a></li>
                <li><a class="dropdown-item" href="#">코인뽑기</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                확률뽑기
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/WhaleSimulator/onepercent">서버한정 주말특별제작 (1% 확률)</a></li>
                <li><a class="dropdown-item" href="#">서버한정 스킬북/비법서/주문서 (3.5% 확률)</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/WhaleSimulator/arbitrary" role="button">
                임의확률계산
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

class customFooter extends HTMLElement
{
  connectedCallback() {
    this.outerHTML =`
    <footer class="test-center text-lg-start text-muted bd-footer">
      <div class="text-center p-4">
        © 2023 <a target="_blank" href="https://projecteli.tistory.com">ProjectEli</a> &
        <a target="_blank" href="https://www.youtube.com/@nuttube2020">누뜨</a>
      </div>
    </footer>`;
  }
}

customElements.define('nav-placeholder',NavBuilder);
customElements.define('buttonlist-placeholder',buttonList);
customElements.define('footer-placeholder',customFooter);