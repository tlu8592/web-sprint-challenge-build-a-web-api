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