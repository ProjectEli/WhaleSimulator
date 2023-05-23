class customMain extends HTMLElement
{
  connectedCallback() {
    this.outerHTML = `
    <main>
      <div class="row row-cols-auto g-4">
        <div class="col">
          <div class="card h-100">
            <img class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">신비한 변신 뽑기</h5>
              <p class="card-text">고급 95.3% 희귀 4.5% 영웅 0.2%</p>
              <p class="card-text">
                영웅등급 1개 기댓값: 137팩(IQR:50-310팩)<br>
                희귀등급 1개 기댓값: 137팩(IQR:50-310팩)
              </p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-outline-info w-100">상세보기</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">신비한 마법인형 뽑기</h5>
              <p class="card-text">고급 95.3% 희귀 4.5% 영웅 0.2%</p>
              <p class="card-text">
                영웅등급 1개 기댓값: 137팩(IQR:50-310팩)<br>
                희귀등급 1개 기댓값: 137팩(IQR:50-310팩)
              </p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-outline-info w-100">상세보기</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">최상급 변신 뽑기</h5>
              <p class="card-text">고급 93.59% 희귀 5.50% 영웅 0.8999% 전설 0.01%</p>
              <p class="card-text">
                영웅등급 1개 기댓값: 137팩(IQR:50-310팩)<br>
                희귀등급 1개 기댓값: 137팩(IQR:50-310팩)
              </p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-outline-info w-100">상세보기</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">최상급 마법인형 뽑기</h5>
              <p class="card-text">고급 93.59% 희귀 5.50% 영웅 0.8999% 전설 0.01%</p>
              <p class="card-text">
                영웅등급 1개 기댓값: 137팩(IQR:50-310팩)<br>
                희귀등급 1개 기댓값: 137팩(IQR:50-310팩)
              </p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-outline-info w-100">상세보기</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">신비한 변신/인형뽑기</h5>
              <p class="card-text">고급 95.3% 희귀 4.5% 영웅 0.2%</p>
              <p class="card-text">
                영웅등급 1개 기댓값: 137팩(IQR:50-310팩)<br>
                희귀등급 1개 기댓값: 137팩(IQR:50-310팩)
              </p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-outline-info w-100">상세보기</a>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">신비한 변신/인형뽑기</h5>
              <p class="card-text">고급 95.3% 희귀 4.5% 영웅 0.2%</p>
              <p class="card-text">
                영웅등급 1개 기댓값: 137팩<br>
                희귀등급 1개 기댓값: 137팩
              </p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-outline-info w-100">상세보기</a>
            </div>
          </div>
        </div>
      </div>
    </main>`;
  }
}

customElements.define('main-placeholder',customMain)