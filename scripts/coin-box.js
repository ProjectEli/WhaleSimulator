const coinProb = [
  [10000, 62.5],
  [20000, 27.0],
  [50000, 7.0],
  [100000, 2.85],
  [300000, 0.5],
  [500000, 0.15]
];

const tbody = document.getElementById('coinTableBody');
tbody.innerHTML = '';
coinProb.forEach(elem => {
  tbody.innerHTML += `
        <tr>
          <th scope="row">${elem[0]}</th>
          <td>${elem[1]}%</td>
        </tr>`;
})

const expectedCoinsPerTrial = coinProb.reduce(
  (acc, val) => {return acc + val[0]*val[1]/100}, 0
);
document.getElementById('coinsPerTrial').textContent = `상자 1개당 평균 획득 코인: ${expectedCoinsPerTrial}개`;


document.getElementById('coinsWanted').addEventListener("change", (e) => {
  const reqBoxes = parseFloat(e.target.value)*1e4/expectedCoinsPerTrial;
  document.getElementById('requiredBoxes').textContent = `필요한 상자 수 기댓값: ${reqBoxes.toFixed(3)}개`;
});