class customNav extends HTMLElement {
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
          <li class="nav-item">
              <a class="nav-link" href="/WhaleSimulator/coin-box" role="button">
                코인뽑기
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                서버한정
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/WhaleSimulator/server-limited-weekly-special">주말특별제작</a></li>
                <li><a class="dropdown-item" href="/WhaleSimulator/server-limited-skillbook">스킬북/비법서/주문서</a></li>
                <li><a class="dropdown-item" href="/WhaleSimulator/server-limited-metamorphosis">변신/마법인형카드</a></li>
                <li><a class="dropdown-item" href="/WhaleSimulator/server-limited-weapon">무기/방어구/장신구</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/WhaleSimulator/detailed-calc" role="button">
                상세확률계산
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/WhaleSimulator/arbitrary" role="button">
                임의확률계산
              </a>
            </li>
          </ul>
          <button type="button" class="btn btn-outline-warning navbar-btn" id="toggleColorMode">컬러모드변경</button>
        </div>
      </div>
    </nav>`;

    // colorworks
    let preferredColorMode = localStorage.getItem('preferredColorMode');
    if (preferredColorMode === 'light') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }

    let toggleColorMode = document.getElementById('toggleColorMode');

    toggleColorMode.addEventListener("click", () => {
      const currentColorMode = document.documentElement.getAttribute('data-bs-theme');
      document.documentElement.setAttribute('data-bs-theme', currentColorMode == 'light' ? 'dark' : 'light');
      localStorage.setItem('preferredColorMode',document.documentElement.getAttribute('data-bs-theme'));
    })
  }
}

class customFooter extends HTMLElement {
  connectedCallback() {
    this.outerHTML = `
    <footer class="test-center text-lg-start text-muted bd-footer">
      <div class="text-center p-4">
        © 2023 <a target="_blank" href="https://projecteli.tistory.com/page/About">ProjectEli</a> &
        <a target="_blank" href="https://www.youtube.com/@nuttube2020">누뜨</a>
      </div>
    </footer>`;
  }
}

class customGA extends HTMLElement {
  connectedCallback() {
    this.outerHTML = `
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-5Z56NDSFN7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5Z56NDSFN7');
    </script>`;
  }
}

customElements.define('nav-placeholder', customNav);
customElements.define('footer-placeholder', customFooter);
customElements.define('ga-placeholder', customGA);