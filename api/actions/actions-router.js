// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

router.get('/', async (req, res) => {
    const actions = await Actions.get();
    if (!actions) {
        res.send([]);
    } else {
        res.json(actions);
    }
})

router.get('/:id', (req, res) => {
    
})

router.post('/', (req, res) => {
    
})

router.put('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

module.exports = router;