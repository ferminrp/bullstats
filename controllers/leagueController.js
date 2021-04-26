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
                res.render('home');
                break
            case 'liga-uruguaya':
                res.render('home');
                break
            default:
                res.render('home')
        }
    }
};