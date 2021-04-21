module.exports = {
    home: (req, res) => {
        res.render('home');
    },
    league: (req, res) => {
        res.send('Liga ' + req.params.id);
    }
};