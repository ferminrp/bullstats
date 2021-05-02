module.exports = {
    index: (req, res) => {
        res.redirect('/')
    },
    team: (req, res) => { 
        res.render("ftu",{
            titulo: "¡Oops!",
            thumbnail: "/images/thumbnails/basketball-player.svg",
            parrafo: "Todavia estamos construyendo esta página. Te esperamos dentro de poco.",
            boton: "Elegir una Liga",
            link: "/"
        });
    }
};