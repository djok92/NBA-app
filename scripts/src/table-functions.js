function createHeader(data, tables) {
  tables.forEach(table => {
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    data.forEach(item => {
      const headerItem = document.createElement("td");
      headerItem.innerHTML = item;
      headerRow.appendChild(headerItem);
      tableHeader.appendChild(headerRow);
      table.appendChild(tableHeader);
    });
  });
}

function tableDataToRow(singleTeamData, row) {
  singleTeamData.forEach(dataItem => {
    const dataPiece = document.createElement("td");
    dataPiece.innerHTML = dataItem;
    row.appendChild(dataPiece);
  });
}

function addActiveClass(arr) {
  arr.forEach(item => {
    item.classList.add("active");
  });
}

function removeActiveClass(arr) {
  arr.forEach(item => {
    item.classList.remove("active");
  });
}

function clearTables(arr) {
  arr.forEach(table => (table.innerHTML = ""));
}



export {
  createHeader,
  tableDataToRow,
  addActiveClass,
  removeActiveClass,
  clearTables,
};