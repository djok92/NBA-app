async function fetchTeams(api) {
  const key = "3b8db034eeb7440191d952baac83520d";
  const paramsObject = {
    headers: {
      "Ocp-Apim-Subscription-Key": key
    }
  };
  const apiCall = await fetch(api, paramsObject);
  const data = await apiCall.json();
  return data;
}

export default fetchTeams;