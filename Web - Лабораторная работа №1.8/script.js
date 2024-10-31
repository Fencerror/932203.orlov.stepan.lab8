function addRow(data = { input1: '', input2: '' }) {
  const table = document.getElementById('main-table');
  const newRow = document.createElement('tr');

  const cell1 = document.createElement('td');
  const input1 = document.createElement('input');
  input1.className = 'data';
  input1.value = data.input1;
  cell1.appendChild(input1);
  newRow.appendChild(cell1);

  const cell2 = document.createElement('td');
  const input2 = document.createElement('input');
  input2.className = 'data';
  input2.value = data.input2;
  cell2.appendChild(input2);
  newRow.appendChild(cell2);

  const cell3 = document.createElement('td');

  const upButton = document.createElement('button');
  upButton.textContent = '↑';
  upButton.onclick = function () {
    moveRowUp(newRow);
  };
  cell3.appendChild(upButton);

  const downButton = document.createElement('button');
  downButton.textContent = '↓';
  downButton.onclick = function () {
    moveRowDown(newRow);
  };
  cell3.appendChild(downButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.onclick = function () {
    table.removeChild(newRow);
    saveTable();
  };
  cell3.appendChild(deleteButton);

  newRow.appendChild(cell3);
  table.appendChild(newRow);
}


function saveTable() {
  const rows = Array.from(document.querySelectorAll('#main-table tr')).slice(1);
  const data = rows.map((row, index) => {
    const inputs = row.querySelectorAll('input');
    return { [`${index + 1}-й`]: inputs[0].value, "второй": inputs[1].value };
  });
  
  localStorage.setItem('tableData', JSON.stringify(data));
  displayTableData(data); 
}



function loadTable() {
  const data = JSON.parse(localStorage.getItem('tableData'));
  if (data) {
    data.forEach(rowData => addRow({ input1: rowData['1-й'], input2: rowData['второй'] }));
  }
}


function displayTableData(data) {
  const outputDiv = document.getElementById('output');
  
 
  const formattedData = data.map((row, index) => {
    const key1 = `${index + 1}-й`;
    const value1 = row[key1];
    const value2 = row["второй"];
    return `"${key1}":"${value1}","второй":"${value2}"`;
  }).join(", ");
  
  outputDiv.innerHTML = `{${formattedData}}`;
}


function moveRowUp(row) {
  const previousRow = row.previousElementSibling;
  if (previousRow && previousRow.tagName === 'TR') {
    row.parentNode.insertBefore(row, previousRow);
    saveTable();
  }
}


function moveRowDown(row) {
  const nextRow = row.nextElementSibling;
  if (nextRow) {
    row.parentNode.insertBefore(nextRow, row);
    saveTable();
  }
}


window.onload = loadTable;
