// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActionId (req, res, next) {
    const actionFound = await Actions.get(req.params.id);
    if (!actionFound) {
        res.status(404).json({
            message: "action not found"
        })
    } else {
        req.action = actionFound;
        next();
    }
}

module.exports = {
    validateActionId
}