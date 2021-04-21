module.exports = {
    index: (req, res) => {
        res.send('Este es el listado de teams!')
    },
    team: (req, res) => { 
        res.send('Este es el team ' + req.params.id)
    }
};