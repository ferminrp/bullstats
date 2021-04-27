module.exports = {
    home: (req, res) => {
        res.render('home');
    },
    league: (req, res) => {
        switch (req.params.id) {
            case 'liga-argentina':
                res.render('league', { liga: 'Liga Argentina', logo:'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/La_Liga_Argentina_de_B%C3%A1squet_logo.svg/1200px-La_Liga_Argentina_de_B%C3%A1squet_logo.svg.png' });
                break
            case 'liga-nacional-argentina':
            case 'liga-uruguaya':
                res.render("ftu",{
                    titulo: "¡Oops!",
                    thumbnail: "/images/thumbnails/basketball-player.svg",
                    parrafo: "Todavia estamos construyendo esta página.<br><br>Te Esperamos dentro de poco.",
                    boton: "Elegir una Liga",
                    link: "/"
                });
                break
            default:
                res.render('home')
        }
    }
};