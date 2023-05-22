'use strict';

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