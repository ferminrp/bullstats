module.exports = {
	index: (req, res) => {
		res.redirect("/");
	},
	team: (req, res) => {
		res.render(
			"ftu",
			{
				titulo: "\xa1Oops!",
				thumbnail: "/images/thumbnails/basketball-player.svg",
				parrafo: "Todavia estamos construyendo esta p\xe1gina. Te esperamos dentro de poco.",
				boton: "Elegir una Liga",
				link: "/",
			},
		);
	},
};
