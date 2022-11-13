export default async function handler(req, res) {

    const matchPlayBase = "https://matchplay.events/data/series/";
    const acceptableResponses = [200, 304];
    
    const { id } = req.query;
    const getLeagueData = async () => {
        const response = await fetch(matchPlayBase + id);
        if (! acceptableResponses.includes(response.status) ){
            return "hrmm, something went wrong, is your ID right?";
        }
        const jsonData = await response.json();
        return jsonData.name;
    };
  
    const getPlayerData = async () => {
        const response = await fetch(matchPlayBase + id + "/standings");
        if (! acceptableResponses.includes(response.status) ){
            return [{}];
        }
        const jsonData = await response.json();
        return jsonData.overall;
    };

    const leagueName = await getLeagueData();
    const playerList = await getPlayerData();
    res.status(200).json({ name: leagueName, players: playerList })
  }