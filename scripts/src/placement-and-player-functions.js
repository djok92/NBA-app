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

export {
  conferencePlacement,
  divisionPlacement,
  setPlayerId,
  getPlayerImg
}