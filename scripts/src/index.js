import fetchTeams from "./fetch-teams";
import getAllTeams from "./get-all-teams";
import fetchPlayers from "./fetch-players";
import {
  createHeader,
  tableDataToRow,
  addActiveClass,
  removeActiveClass,
  clearTables,
} from "./table-functions";
import {
  conferencePlacement,
  divisionPlacement,
  setPlayerId,
  getPlayerImg
} from "./placement-and-player-functions";
import loaderHandle from "./loader-handle";


//Links
const linkConference = document.querySelector(".conference");
const linkDivison = document.querySelector(".division");
const submit = document.querySelector(".all-teams__btn");
const goBackArrowHolder = document.querySelector(".arrow-back");
const goBackArrow = document.querySelector(".arrow-back span");

//Tables from DOM
const dataTableEastern = document.querySelector(".data-table--eastern");
const dataTableWestern = document.querySelector(".data-table--western");
const dataTableAtlantic = document.querySelector(".data-table--atlantic");
const dataTableCentral = document.querySelector(".data-table--central");
const dataTableSouthEast = document.querySelector(".data-table--southeast");
const dataTableNorthWest = document.querySelector(".data-table--northwest");
const dataTablePacific = document.querySelector(".data-table--pacific");
const dataTableSouthWest = document.querySelector(".data-table--southwest");
const dataTableAllPlayers = document.querySelector(".data-table--all-players");
const dataTableSinglePlayerStats = document.querySelector(
  ".data-table--singe-player-stats"
);

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

//Player Tables
const playerTables = [dataTableAllPlayers];

//Single player table
const singlePlayerTables = [dataTableSinglePlayerStats];

function singlePlayerStats(api) {
  return function () {
    fetchPlayers(api).then(data => {
      goBackArrowHolder.style.display = "block";

      const headerData = [
        "Name",
        "Team",
        "Position",
        "GP",
        "GS",
        "MPG",
        "PPG",
        "OREB",
        "DREB",
        "REB",
        "ASS",
        "STL",
        "BLK",
        "FG%",
        "3P%",
        "FT%"
      ];

      createHeader(headerData, singlePlayerTables);

      const dataRow = document.createElement("tr");
      const singlePlayerStatsData = [
        data.Name,
        data.Team,
        data.Position,
        data.Games,
        data.Started,
        `${(data.Minutes / data.Games).toFixed(1)}`,
        `${(data.Points / data.Games).toFixed(1)}`,
        `${(data.OffensiveRebounds / data.Games).toFixed(1)}`,
        `${(data.DefensiveRebounds / data.Games).toFixed(1)}`,
        `${(data.Rebounds / data.Games).toFixed(1)}`,
        `${(data.Assists / data.Games).toFixed(1)}`,
        `${(data.Steals / data.Games).toFixed(1)}`,
        `${(data.BlockedShots / data.Games).toFixed(1)}`,
        `${data.FieldGoalsPercentage} %`,
        `${data.ThreePointersPercentage} %`,
        `${data.FreeThrowsPercentage} %`
      ];

      tableDataToRow(singlePlayerStatsData, dataRow);
      dataTableSinglePlayerStats.appendChild(dataRow);
    });
  };
}

function conferenceStandings() {
  const api = "https://api.fantasydata.net/v3/nba/stats/JSON/Standings/2019";

  removeActiveClass(tables);
  addActiveClass(conferenceTables);

  fetchTeams(api).then(data => {
    data.sort((a, b) => b.Percentage - a.Percentage);
    const headerData = [
      "Name",
      "Wins",
      "Losses",
      "Last Ten",
      "Home",
      "Road",
      "Percentage"
    ];

    createHeader(headerData, conferenceTables);

    data.forEach(team => {
      const dataRow = document.createElement("tr");
      const singleTeamData = [
        team.Name,
        team.Wins,
        team.Losses,
        `${team.LastTenWins} -  ${10 - team.LastTenWins}`,
        `${team.HomeWins} - ${team.HomeLosses}`,
        `${team.AwayWins} - ${team.AwayLosses}`,
        `${team.Percentage.toFixed(3).replace(/^0+/, "")}`
      ];

      tableDataToRow(singleTeamData, dataRow);
      conferencePlacement(team, dataRow);
    });
  });
}

function divisionStandings() {
  const api = "https://api.fantasydata.net/v3/nba/stats/JSON/Standings/2019";

  fetchTeams(api).then(data => {
    const headerData = [
      "Name",
      "Wins",
      "Losses",
      "Last Ten",
      "Home",
      "Road",
      "Percentage"
    ];

    createHeader(headerData, divisionTables);

    data.forEach(team => {
      const dataRow = document.createElement("tr");
      const singleTeamData = [
        team.Name,
        team.Wins,
        team.Losses,
        `${team.LastTenWins} - ${10 - team.LastTenWins}`,
        `${team.HomeWins} - ${team.HomeLosses}`,
        `${team.AwayWins} - ${team.AwayLosses}`,
        `${team.Percentage.toFixed(3).replace(/^0+/, "")}`
      ];

      tableDataToRow(singleTeamData, dataRow);
      divisionPlacement(team, dataRow);
    });
  });
}

function playerStatsByTeam() {
  const select = document.querySelector(".all-teams");
  const api = `https://api.fantasydata.net/v3/nba/stats/JSON/Players/${
    select.value
  }`;

  fetchPlayers(api).then(data => {
    const headerData = [
      "Image",
      "Name",
      "Birth Date",
      "College",
      "Experience",
      "Position",
      "Number"
    ];

    createHeader(headerData, playerTables);

    data.forEach(player => {
      const playerImg = getPlayerImg(player.PhotoUrl);
      const dataRow = document.createElement("tr");
      let college;
      player.College === null ?
        (college = "High School / International") :
        (college = player.College);

      const singleTeamData = [
        playerImg,
        player.YahooName,
        player.BirthDate.replace("T00:00:00", ""),
        college,
        player.Experience,
        player.Position,
        player.Jersey
      ];

      tableDataToRow(singleTeamData, dataRow);

      dataTableAllPlayers.appendChild(dataRow);

      const playerNameTable = dataRow.childNodes.item(1);

      playerNameTable.classList.add("player-name");

      setPlayerId("data-id", playerNameTable, player.PlayerID);
    });

    dataTableAllPlayers.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      if (e.target.classList.contains("player-name")) {
        setupTable();
        const api = `https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByPlayer/2019/${e.target.getAttribute(
          "data-id"
        )}`;
        loaderHandle(singlePlayerStats(api));
      }
    });
  });
}


function setupTable() {
  removeActiveClass(tables);
  clearTables(tables);
  goBackArrowHolder.style.display = "none";
}

function setupListeners() {
  linkConference.addEventListener("click", function (e) {
    e.preventDefault();
    setupTable();
    addActiveClass(divisionTables);
    loaderHandle(conferenceStandings);
  });
  linkDivison.addEventListener("click", function (e) {
    e.preventDefault();
    setupTable();
    addActiveClass(divisionTables);
    loaderHandle(divisionStandings);
  });
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    setupTable();
    addActiveClass(playerTables);
    loaderHandle(playerStatsByTeam);
  });
  goBackArrow.addEventListener("click", function () {
    setupTable();
    addActiveClass(playerTables);
    goBackArrowHolder.style.display = "none";
    loaderHandle(playerStatsByTeam);
  });
}

setupListeners();