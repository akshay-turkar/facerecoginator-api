const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
    apiKey: 'b5622532cb4e4eba8d888a523933e17e'
   });

const handleApiCall = (req, res) => {
    const {input} = req.body
    console.log(input)
    // app.models.
    // predict(Clarifai.FACE_DETECT_MODEL, input)
    // .then(data => {
    //     res.json(data)
    // })
    .catch(err => res.status(400).json("Unable to work with API"))
// go to clrifiy npm the to github repo then to src then to index.js to try the diffrent models

}

   
const handleImage = (req, res, db) => {
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {
        res.status(400).json("error getting the user")
    })
}

module.exports = {
    handleImage,
    handleApiCall
}