export default async function handler(req, res) {

    const matchPlayBase = "https://matchplay.events/data/series/";
    
    const { id } = req.query;
    const getLeagueData = async () => {
        const response = await fetch(matchPlayBase + id);
        const jsonData = await response.json();
        return jsonData.name;
    };
  
    const getPlayerData = async () => {
        const response = await fetch(matchPlayBase + id + "/standings");
        const jsonData = await response.json();
        return jsonData.overall;
    };

    const leagueName = await getLeagueData();
    const playerList = await getPlayerData();
    res.status(200).json({ name: leagueName, players: playerList })
  }