//Create table header for each table
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
  //Create td cell for each data piece, and append it to the row
  singleTeamData.forEach(dataItem => {
    const dataPiece = document.createElement("td");
    dataPiece.innerHTML = dataItem;
    row.appendChild(dataPiece);
  });
}

//Add active(display class) for current table
function addActiveClass(arr) {
  arr.forEach(item => {
    item.classList.add("active");
  });
}

//Remove all active (display) classes - To be sure that only current is showing
function removeActiveClass(arr) {
  arr.forEach(item => {
    item.classList.remove("active");
  });
}

//Clear all tables on click
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