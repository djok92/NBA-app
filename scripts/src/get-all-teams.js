import fetchTeams from "./fetch-teams";

const getAllTeams = (function () {
  const api = "https://api.fantasydata.net/v3/nba/stats/JSON/Standings/2019";
  const teamArr = [];
  fetchTeams(api).then(data => {
    data.forEach(team => {
      teamArr.push(team.Key);
    });
    const select = document.querySelector(".all-teams");
    teamArr.sort();
    teamArr.forEach(team => {
      let option = document.createElement("option");
      option.innerHTML = team;
      select.add(option);
    });
  });
})();

export default getAllTeams