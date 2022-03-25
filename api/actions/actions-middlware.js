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

function validateActionUpdate (req, res, next) {
    const { name, description, completed, project_id } = req.body;
    if (!name || !description || !completed || project_id) {
        res.status(400).json({
            message: "provide notes, description, completed, or project_id for update"
        })
    } else {
        next();
    }
}

module.exports = {
    validateActionId,
    validateActionUpdate
}