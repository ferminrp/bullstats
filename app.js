const express = require("express");
const app = express();

// gray-matter to read the .md files better
const matter = require('gray-matter');

const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const indexRoutes = require("./routes/indexRoutes");
const leagueRoutes = require("./routes/leagueRoutes");
const glosarioRoutes = require("./routes/glosarioRoutes");

const port = process.env.PORT;

const methodOverride = require("method-override");
// Requerimos este módulo para asegurar compatibilidad de métodos PUT y DELETE en todos los navegadores.
app.use(methodOverride("_method"));
// Para configurarlo indicamos a app que use este método, con app.use lo empleamos a nivel aplicación.

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/leagues", leagueRoutes);
app.use("/glosario", glosarioRoutes);



app.use((req, res, next) => {
	res.status(404).render(
		"ftu",
		{
			titulo: "\xa1Oops!",
			thumbnail: "/images/thumbnails/404.svg",
			parrafo: "Perdon, la pagina que buscabas no existe",
			boton: "Elegir una Liga",
			link: "/",
		},
	);
});

app.listen(
	port || 3_000,
	() => console.log("Servidor escuchando en puerto 3000"),
);
