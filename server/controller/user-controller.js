const UserCollection = require('../model/User');

//CRUD CREATE operation
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return
    }

    //new user(creiamo istanza del model)
    const user = new UserCollection({
        name: req.body.name,
        email: req.body.email,
        passwd: req.body.passwd
    });

    //save user in database
    user
        .save(user)
        .then(data => { res.redirect('/users/show-users') })
        .catch(err => { res.status(500).send({ message: err.message || 'Error to create operation' }) });
};

//CRUD READ operation
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        UserCollection.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({ message: `Not found user with id= ${id}` });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: `Error retrieving user with id= ${id}` });
            })
    } else {
        UserCollection.find()
        .then(user => { res.send(user) })
        .catch(err => { res.status(500).send({ message: err.message || 'Error to require user information' }) });
    };
}

//CRUD UPDATE operation
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: 'Data to update can not be empty' });
    };

    const id = req.params.id;
    UserCollection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with ${id}. Maybe user not found` });
            } else {
                res.redirect('/users/show-users');
            }
        })
        .catch(err => { res.status(500).send({ message: 'Error update user informations' }) });
}

//CRUD DELETE operation
exports.delete = (req, res) => {
    const id = req.params.id;

    UserCollection.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong.` })
            } else {
                res.redirect('/users/show-users');
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete user with id= ${id}.` });
        });
}