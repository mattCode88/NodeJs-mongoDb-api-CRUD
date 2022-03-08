const axios = require('axios');

exports.homeRoutes = (req, res) => {

    // invio richiesta axios a api/users per ottenere il json degli utenti da passare alla show-user
    axios.get('http://localhost:3000/api/users')
        .then(response => {
            //passo alla show.ejs l' oggetto contenente la respose
            res.render('show-user', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })

};

exports.addUser = (req, res) => {
    res.render('add-user');
};

exports.updateUser = (req, res) => {

    /*faccio la stessa operazione della create indicando il parametro id utente per ottenere i dati dell' utente corrispondente */
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(userData => {
            res.render('update-user', { user: userData.data })
        })
        .catch(err => {
            res.send(err);
        })
}