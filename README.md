# NBA-app
App for NBA team and player stats

Small app that uses API from https://developer.fantasydata.com.

Table functions are responsible for creating table html structure, removing and adding certain classes and all variables with DOM elements, and table arrays that are needed for application - located in table-functions.js .

Placement and player functions are responsible for placing teams in their conference/division, and getting specific pieces of player data - located in placement-and-player-functions.js .

Fetch players, fetch teams, and get all teams are responsible for fetching data from API, located in same name files .js .

Loader handle function is responsible for handling loader animation on every request/change, located in loader-handle.js .

Select2-custom.js contains method from https://select2.org for styling select (now it doesn't look like it's from 1995 :) .

All .js files are bundled using https://webpack.js.org/.

