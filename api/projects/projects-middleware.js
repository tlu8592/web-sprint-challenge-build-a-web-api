// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId (req, res, next) {
    const projectFound = await Projects.get(req.params.id);
    if (!projectFound) {
        res.status(404).json({
            message: "project not found"
        });
    } else {
        req.project = projectFound;
        next();
    }
}

module.exports = {
    validateProjectId
}