// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();
const {
    validateActionId,
    validateAction,
    validateActionUpdate
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
        next();
    }
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.newAction)
        .then(actionCreated => {
            res.status(201).json(actionCreated);
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateActionUpdate, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction);
        })
        .catch(next);
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id);
        res.json(req.action);
    } catch (err) {
        next();
    }
})

router.use((err, req, res, next) => {
    res.status(500).json({
        message: "error in actions router",
        err: err.message
    })
})

module.exports = router;