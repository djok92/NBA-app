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
import setupTable from "./setup-table";

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
      //Show go back arrow
      goBackArrowHolder.style.display = "block";

      //Data that goes in header
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

      //Create header for each category
      createHeader(headerData, singlePlayerTables);

      const dataRow = document.createElement("tr");

      //Data that goes in table
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
  //remove all active classes of all tables
  removeActiveClass(tables);
  //add active class for current table
  addActiveClass(conferenceTables);

  fetchTeams(api).then(data => {
    //Sort data array by winning percentage of each team
    data.sort((a, b) => b.Percentage - a.Percentage);

    //Data that goes in header
    const headerData = [
      "Name",
      "Wins",
      "Losses",
      "Last Ten",
      "Home",
      "Road",
      "Percentage"
    ];

    //Create header for conference tables
    createHeader(headerData, conferenceTables);

    data.forEach(team => {
      //Create row for each team
      const dataRow = document.createElement("tr");
      //Data that goes in table
      const singleTeamData = [
        team.Name,
        team.Wins,
        team.Losses,
        `${team.LastTenWins} -  ${10 - team.LastTenWins}`,
        `${team.HomeWins} - ${team.HomeLosses}`,
        `${team.AwayWins} - ${team.AwayLosses}`,
        `${team.Percentage.toFixed(3).replace(/^0+/, "")}`
      ];

      //Create td cell for each data piece, and append it to the row
      tableDataToRow(singleTeamData, dataRow);
      //Place each team in their conference
      conferencePlacement(team, dataRow);
    });
  });
}

function divisionStandings() {
  const api = "https://api.fantasydata.net/v3/nba/stats/JSON/Standings/2019";

  fetchTeams(api).then(data => {
    //Data that goes in header
    const headerData = [
      "Name",
      "Wins",
      "Losses",
      "Last Ten",
      "Home",
      "Road",
      "Percentage"
    ];

    //Create header for division tables
    createHeader(headerData, divisionTables);

    data.forEach(team => {
      //Create row for each team
      const dataRow = document.createElement("tr");
      //Data that goes in table
      const singleTeamData = [
        team.Name,
        team.Wins,
        team.Losses,
        `${team.LastTenWins} - ${10 - team.LastTenWins}`,
        `${team.HomeWins} - ${team.HomeLosses}`,
        `${team.AwayWins} - ${team.AwayLosses}`,
        `${team.Percentage.toFixed(3).replace(/^0+/, "")}`
      ];

      //Create td cell for each data piece, and append it to the row
      tableDataToRow(singleTeamData, dataRow);
      //Place each team in their division
      divisionPlacement(team, dataRow);
    });
  });
}

function playerStatsByTeam() {
  //Get value from select
  const select = document.querySelector(".all-teams");
  //Set api url with value from select
  const api = `https://api.fantasydata.net/v3/nba/stats/JSON/Players/${
    select.value
  }`;

  fetchPlayers(api).then(data => {
    //Data for table header
    const headerData = [
      "Image",
      "Name",
      "Birth Date",
      "College",
      "Experience",
      "Position",
      "Number"
    ];

    //Create header for table
    createHeader(headerData, playerTables);

    data.forEach(player => {
      //Get image for each player
      const playerImg = getPlayerImg(player.PhotoUrl);

      //Create row for each team
      const dataRow = document.createElement("tr");

      //Check if college property is null
      let college;
      player.College === null ?
        (college = "High School / International") :
        (college = player.College);

      //Data for each team
      const singleTeamData = [
        playerImg,
        player.YahooName,
        player.BirthDate.replace("T00:00:00", ""),
        college,
        player.Experience,
        player.Position,
        player.Jersey
      ];

      //Create td cell for each data piece, and append it to the row
      tableDataToRow(singleTeamData, dataRow);

      //Append row to the table
      dataTableAllPlayers.appendChild(dataRow);

      //Select player name from table
      const playerNameTable = dataRow.childNodes.item(1);

      //Give player name td class for css purposes
      playerNameTable.classList.add("player-name");

      //Give player name data-id attribute for single player stats function fetch
      setPlayerId("data-id", playerNameTable, player.PlayerID);
    });

    //Delegate click event for each player in table
    dataTableAllPlayers.addEventListener("click", function (e) {
      e.stopImmediatePropagation();

      //Target only element that has class player name
      if (e.target.classList.contains("player-name")) {
        //clear table
        setupTable();
        //set ap
        const api = `https://api.fantasydata.net/v3/nba/stats/JSON/PlayerSeasonStatsByPlayer/2019/${e.target.getAttribute(
          "data-id"
        )}`;
        //run function for single player stats
        loaderHandle(singlePlayerStats(api));
      }
    });
  });
}

//Init Event Listeners for links
function setupListeners() {
  linkConference.addEventListener("click", function (e) {
    //prevent from submiting
    e.preventDefault();
    //remove active classes and clear tables
    setupTable();
    //remove all active classes of all tables
    addActiveClass(divisionTables);
    //handle loading animation and call function
    loaderHandle(conferenceStandings);
  });
  linkDivison.addEventListener("click", function (e) {
    //prevent from submiting
    e.preventDefault();
    //remove active classes and clear tables
    setupTable();
    //add active class for current table
    addActiveClass(divisionTables);
    //handle loading animation and call function
    loaderHandle(divisionStandings);
  });
  submit.addEventListener("click", function (e) {
    //prevent from submiting
    e.preventDefault();
    //remove active classes and clear tables
    setupTable();
    //add active class for current table
    addActiveClass(playerTables);
    //handle loading animation and call function
    loaderHandle(playerStatsByTeam);
  });
  goBackArrow.addEventListener("click", function () {
    //remove active classes and clear tables
    setupTable();
    //add active class for current table
    addActiveClass(playerTables);
    //hide go back arrow
    goBackArrowHolder.style.display = "none";
    //go back to results page
    loaderHandle(playerStatsByTeam);
  });
}

setupListeners();