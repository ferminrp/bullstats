module.exports = {
    index: (req, res) => {
        res.send('Este es el listado de players!')
    },
    player: (req, res) => { 
        res.send('Este es el player ' + req.params.id)
    }
};