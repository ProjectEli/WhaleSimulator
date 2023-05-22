'use strict';

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

// tableworks
let generateTableButton = document.getElementById('generateTableButton');
let deleteTableButton = document.getElementById('deleteTableButton');
let probTable = document.getElementById('probTable');

deleteTableButton.addEventListener("click", () => {
    probTable.innerHTML = '';
})

generateTableButton.addEventListener('click', () => {
    probTable.innerHTML = '';
    probTable.innerHTML += `<table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>달성 가능성</th>
        <th>요구 뽑기 수</th>
        <th>예상 비용</th>
      </tr>
      <tr>
        <td>10%</td>
        <td>25회</td>
        <td>2500다이아</td>
      </tr>
      <tr>
        <td>20%</td>
        <td>53회</td>
        <td>5300다이아</td>
      </tr>
      <tr>
        <td>30%</td>
        <td>85회</td>
        <td>8500다이아</td>
      </tr>
      <tr>
        <td>40%</td>
        <td>123회</td>
        <td>12300다이아</td>
      </tr>
      <tr class="table-info">
        <td>50%</td>
        <td>167회</td>
        <td>16700다이아</td>
      </tr>
      <tr>
        <td>60%</td>
        <td>221회</td>
        <td>22100다이아</td>
      </tr>
      <tr>
        <td>70%</td>
        <td>291회</td>
        <td>29100다이아</td>
      </tr>
      <tr>
        <td>80%</td>
        <td>387회</td>
        <td>38700다이아</td>
      </tr>
      <tr class="table-success">
        <td>90%</td>
        <td>555회</td>
        <td>55500다이아</td>
      </tr>
      <tr class="table-warning">
        <td>95%</td>
        <td>723회</td>
        <td>72300다이아</td>
      </tr>
      <tr class="table-primary">
        <td>98%</td>
        <td>943회</td>
        <td>94300다이아</td>
      </tr>
      <tr class="table-danger">
        <td>99%</td>
        <td>1111회</td>
        <td>111100다이아</td>
      </tr>
    </thead>
    <tbody>
    </tbody>    
  </table>`
})

var labels = [
  '상위1%',
  '상위2.5%',
  '상위5%',
  '상위10%',
  '상위25%',
  '상위50%',
  '상위75%',
  '상위90%',
  '상위95%',
  '상위97.5%',
  '상위99%',
];

const percentiles = [1,2.5,5,10,25,50,75,90,95,97.5,99];
const reqTrials = [1,3,5,11,29,69,137,229,299,367,459];
const coords = percentiles.map( (v,i) => ({x:v, y:reqTrials[i]}) );

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'scatter',
  data: {
    labels: labels,
    datasets: [{
      label:['백분율, 뽑기횟수'],
      fill:true,
      data: coords,
    }]
  },
  options: {
    responsive: true,
    showLine: true,
    scales: {
      y: {
        title: {
          display: true,
          text: '뽑기횟수(회)'
        },        
      },
      x: {
        title: {
          display: true,
          text: '백분율(%)'
        },        
      },
    },
    elements: {
      point: {
        radius: 7
      }
    },

    plugins: {
      legend: {
        display: false
      },
    }
  }
});

// colorworks
let toggleColorMode = document.getElementById('toggleColorMode');

toggleColorMode.addEventListener("click", () => {
    currentColorMode = document.documentElement.getAttribute('data-bs-theme');
    document.documentElement.setAttribute('data-bs-theme',currentColorMode == 'light' ? 'dark': 'light');
})