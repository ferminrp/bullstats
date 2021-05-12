const fetch = require('node-fetch');

module.exports = {
	index: (req, res) => {
		res.redirect("/");
	},
	team: (req, res) => {
		let liga = req.params.league;
		let teamId = req.params.teamId;

		let url = "https://bullstats-default-rtdb.firebaseio.com/teams/" + liga +"/"+ teamId +".json";
		console.log(url);
		fetch(url)
			.then(res => res.json())
			.then(json => res.send(JSON.stringify(json)))
			.catch(function(error) {
				console.log(error);
			  });
	},
};
