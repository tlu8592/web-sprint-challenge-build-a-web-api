// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();
const {
    validateActionId
} = require('./actions-middlware');

router.get('/', async (req, res) => {
    const actions = await Actions.get();
    if (!actions) {
        res.send([]);
    } else {
        res.json(actions);
    }
})

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        res.status(200).json(req.action);
    } catch (err) {
        next(err);
    }
})

router.post('/', (req, res) => {
    const newAction = req.body;
    if (!newAction.notes || !newAction.description || !newAction.project_id) {
        res.status(400).json({
            message: "project id, description, and notes are required"
        })
    } else if (newAction.description.length > 128) {
        res.status(400).json({
            message: "description can be up to 128 characters long"
        })
    } else {
        Actions.insert(newAction)
            .then(actionCreated => {
                res.status(201).json(actionCreated);
            })
            .catch(err => {
                req.status(500).json({
                    message: "error creating action",
                    err: err.message
                })
            })
    }
})

router.put('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

router.use((err, req, res, next) => {
    res.status(500).json({
        message: "error in actions router",
        err: err.message
    })
})

module.exports = router;