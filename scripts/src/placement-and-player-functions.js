//Placement of teams in conferences
function conferencePlacement(team, row) {
  team.Conference === "Eastern" ?
    dataTableEastern.appendChild(row) :
    dataTableWestern.appendChild(row);
}

//Placement of teams in divisions
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
//Set data-id attribute for html elements
function setPlayerId(attributeName, row, data) {
  row.setAttribute(attributeName, data);
}

//Get player image from player data
function getPlayerImg(imgUrl) {
  const img = document.createElement("img");
  img.setAttribute("src", imgUrl);
  return img.outerHTML;
}

export {
  conferencePlacement,
  divisionPlacement,
  setPlayerId,
  getPlayerImg
}