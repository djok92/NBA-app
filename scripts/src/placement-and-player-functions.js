const dataTableEastern = document.querySelector(".data-table--eastern");
const dataTableWestern = document.querySelector(".data-table--western");
const dataTableAtlantic = document.querySelector(".data-table--atlantic");
const dataTableCentral = document.querySelector(".data-table--central");
const dataTableSouthEast = document.querySelector(".data-table--southeast");
const dataTableNorthWest = document.querySelector(".data-table--northwest");
const dataTablePacific = document.querySelector(".data-table--pacific");
const dataTableSouthWest = document.querySelector(".data-table--southwest");

//Tables from DOM

const dataTableAllPlayers = document.querySelector(".data-table--all-players");
const dataTableSinglePlayerStats = document.querySelector(
  ".data-table--singe-player-stats"
);


//Conference tables
const conferenceTables = [dataTableEastern, dataTableWestern];

//Division tables
const divisionTables = [
  dataTableAtlantic,
  dataTableCentral,
  dataTableSouthEast,
  dataTableNorthWest,
  dataTablePacific,
  dataTableSouthWest
];

//All tables
const tables = [
  dataTableEastern,
  dataTableWestern,
  dataTableAtlantic,
  dataTableCentral,
  dataTableSouthEast,
  dataTableNorthWest,
  dataTablePacific,
  dataTableSouthWest,
  dataTableAllPlayers,
  dataTableSinglePlayerStats
];

//Player Tables
const playerTables = [dataTableAllPlayers];

//Single player table
const singlePlayerTables = [dataTableSinglePlayerStats];

function conferencePlacement(team, row) {
  team.Conference === "Eastern" ?
    dataTableEastern.appendChild(row) :
    dataTableWestern.appendChild(row);
}


function divisionPlacement(team, row) {
  switch (team.Division) {
    case "Atlantic":
      dataTableAtlantic.appendChild(row);
      break;
    case "Central":
      dataTableCentral.appendChild(row);
      break;
    case "Southeast":
      dataTableSouthEast.appendChild(row);
      break;
    case "Northwest":
      dataTableNorthWest.appendChild(row);
      break;
    case "Pacific":
      dataTablePacific.appendChild(row);
      break;
    case "Southwest":
      dataTableSouthWest.appendChild(row);
      break;
  }
}

function setPlayerId(attributeName, row, data) {
  row.setAttribute(attributeName, data);
}

function getPlayerImg(imgUrl) {
  const img = document.createElement("img");
  img.setAttribute("src", imgUrl);
  return img.outerHTML;
}

function tableTitle(tableArr) {
  tableArr.forEach(table => {
    const tableHeader = document.createElement("thead");
    const tableCaptionHolder = document.createElement("tr");
    let tableName = document.createElement("td");
    tableName.classList.add("table__caption");
    tableName.innerHTML = table.getAttribute("data-name");
    tableCaptionHolder.appendChild(tableName);
    tableHeader.appendChild(tableCaptionHolder);
    table.appendChild(tableHeader);
  });
}

export {
  dataTableAllPlayers,
  dataTableSinglePlayerStats,
  tables,
  conferenceTables,
  divisionTables,
  playerTables,
  singlePlayerTables,
  conferencePlacement,
  divisionPlacement,
  setPlayerId,
  getPlayerImg,
  tableTitle
}