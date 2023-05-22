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