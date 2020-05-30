const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '4d2bd6e6f41a42ecbb4478f7fe976678'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const {
        id
    } = req.body;

    db('users')
        .where('id', '=', id)
        .returning('entries')
        .increment('entries', 1)
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}