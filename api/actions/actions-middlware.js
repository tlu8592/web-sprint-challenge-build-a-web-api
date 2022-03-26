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

function validateAction (req, res, next) {
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
        req.newAction = newAction;
        next();
    } 
}

function validateActionUpdate (req, res, next) {
    const { notes, description, completed, project_id } = req.body;
    if (!notes || !description || !completed || project_id) {
        res.status(400).json({
            message: "provide notes, description, completed, or project_id for update"
        })
    } else {
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction,
    validateActionUpdate
}