class customMain extends HTMLElement
{
  connectedCallback() {
    this.outerHTML = `
    <main>
      <div class="container-sm">
        <article>
          <section>
            <h2>제작 취지</h2>
            <p>
              2023년 기준으로 다수의 게임사들이 확률형 뽑기 아이템을 이용한 수익 모델을 도입하고 있으며, 상당수의 플레이어들이 자산을 투자하여 인게임 재화를 얻고 있다(이하 과금이라 함). 개별 플레이어의 과금 액수나 전체 과금 시장 규모는 수 년 전에 비하여 기하급수적으로 성장하였으나, 확률 정보 공개를 꺼리는 게임사와 습득할 수 있는 정보에 한계가 있는 플레이어들 간의 정보 비대칭으로 인해 실제 확률과 인지하는 확률 또는 예상 보상 기대값 간에 괴리가 발생하여 불필요한 과금을 하는 사례도 증가하고 있다.
            </p>
            <p>
              2021년 초 넥슨의 메이플스토리 확률 오류 사건을 계기로 다양한 게임사에서 확률형 아이템의 설정 확률을 공개하고 있으나, 여전히 다수의 플레이어들에게는 해당 정보를 제대로 해석하기 어려운 상황이다. 따라서 확률 뽑기를 진행할 때 정확한 기댓값에 대한 계산 없이 감에 의존하여 뽑는 경우가 많으며, 결과적으로 실제와의 차이가 발생할 수 있다.
            </p>
            <p>
              변동 확률의 가능성을 배제하고 독립 시행을 전제하는 경우, 공개된 확률에 대하여 예상 비용을 산출하려면 이항확률(binomial probability) 계산을 수행하여야 하지만, 다수의 사람들에게 이는 귀찮거나 쉽지 않은 작업이 된다.  이를 보완하기 위하여 <a href="https://projecteli.tistory.com/199">임의의 확률 및 임의의 목표 당첨 횟수에 대해 계산할 수 있는 공개 웹앱</a>이 구현되었으나, 상황에 따라 입력값을 추가로 계산해야 하는 등 여전히 사용에 진입 장벽이 있는 것으로 파악되었다.
            </p>
            <p>
              본 프로젝트는 언급된 문제점들을 극복하고 플레이어들이 좀 더 예측 가능한 소비를 할 수 있도록 다음을 추구한다.
              <ul>
                <li>확률형 뽑기에 대한 각종 계산의 진입장벽을 획기적으로 낮추는 온라인 플랫폼</li>
                <li>확률형 뽑기 관련 용어 및 가치 환산에 대한 기준점을 제시하는 플랫폼</li>
                <li>사용자가 원하는 확률 계산을 맞춤형으로 수행할 수 있는 플랫폼</li>
                <li>계산 과정을 투명하게 공개하는 믿을 수 있는 확률 계산 플랫폼</li>
                <li>예상 뽑기 횟수에 대한 인식과 실제의 괴리를 줄일 수 있는 설명 또는 학습 자료를 제공하는 플랫폼</li>
                <li>합리적인 과금 문화를 정착시키는 데 기여하는 플랫폼</li>
              </ul>
            </p>
            <p>
              인지 오류를 일으키지 않는 투명한 실시간 확률 공개가 상식이 되고 이 사이트가 더 이상 필요 없어지게 되기를 희망한다.
            </p>
            <p style="text-align: right">
              Eli (https://projecteli.tistory.com/)<br>2023.05.30
            </p>
          </section>
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