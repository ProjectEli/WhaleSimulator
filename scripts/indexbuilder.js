class customMain extends HTMLElement
{
  connectedCallback() {
    this.outerHTML = `
    <main>
      <div class="container-lg">
        <article>
          <h2>카드뽑기</h2>
          <aside>
            <p>영웅등급 이상 확률: 1%, 전설등급 이상 확률: 0.1%</p>
          </aside>

          <h3>영웅등급(1% 확률)</h3>
          <div class="accordion" id="영웅등급계산결과">
            <div class="accordion-item">
              <h4 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#영웅뽑기설명" aria-expanded="true" aria-controls="영웅뽑기설명">
                  영웅등급 아무거나 1개 뽑기횟수 기댓값: 69회
                </button>
              </h4>
              <div id="영웅뽑기설명" class="accordion-collapse collapse show">
                <div class="accordion-body">
                  <p>
                    위 기댓값은 1000명 중 500명이 뽑는 확률을 의미합니다. 운 없는 500명 안에 든다면 못 뽑을수도 있습니다.
                  </p>
                  <p>
                    상위 10% 기댓값: 11회<br>
                    상위 25% 기댓값: 30회<br>
                    상위 50% 기댓값: 69회<br>
                    상위 75% 기댓값: 148회<br>
                    상위 90% 기댓값: 229회<br>
                    상위 95% 기댓값: 299회<br>
                    상위 99% 기댓값: 459회
                  </p>
                  <div class="w-auto p-2">
                    <canvas id="myChart" class="mh-100"></canvas>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h4 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#뽑기설명2" aria-expanded="true" aria-controls="뽑기설명2">
                  영웅등급 내가 원하는 종류 1개 뽑기횟수 기댓값: 1385회
                </button>
              </h4>
              <div id="뽑기설명2" class="accordion-collapse collapse show">
                <div class="accordion-body">
                  <p>
                    위 기댓값은 1000명 중 500명이 뽑는 확률을 의미합니다. 운 없는 500명 안에 든다면 못 뽑을수도 있습니다.
                  </p>
                  <p>
                    상위 10% 기댓값: 211회<br>
                    상위 25% 기댓값: 644회<br>
                    상위 50% 기댓값: 1385회<br>
                    상위 75% 기댓값: 2869회<br>
                    상위 90% 기댓값: 4605회<br>
                    상위 95% 기댓값: 5989회<br>
                    상위 99% 기댓값: 9209회
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>`
  }
}

customElements.define('main-placeholder',customMain)