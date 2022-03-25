// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();
const { 
    validateProjectId,
    validateProjectUpdate 
} = require('./projects-middleware');
const res = require('express/lib/response');

router.get('/', async (req, res) => {
    const projects = await Projects.get();
    if (!projects) {
        res.send([]);
    } else {
        res.json(projects);
    }
})

router.get('/:id', async (req, res) => {
    const project = await Projects.get(req.params.id);
    if (!project) {
        res.status(404).json({
            message: "project not found"
        })
    } else {
        res.status(200).json(project);
    }
})

router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
        res.status(400).json({
            message: "Please provide the name and description of the project"
        });
    } else {
        Projects.insert(newProject)
            .then(projectCreated => {
                res.status(201).json(projectCreated);
            })
            .catch(err => {
                req.status(500).json({
                    message: "error creating project",
                    err: err.message
                })
            })
    }
})

router.put('/:id', validateProjectId, async (req, res, next) => {
    try {
        const { name, description, completed } = req.body;
        const updatedProject = await Projects.update(req.params.id, req.body);
        if (!name || !description || !completed) {
            res.status(400).json({
                message: "missing fields: name, description, or completed",
                err: err.message
            });
        } else {
            res.json(updatedProject);
            console.log("updatedProject -->", updatedProject)
            // const project = await Projects.get(req.params.id);
            // res.status(200).json(project);
        }
    } catch (err) {
        next();
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.json(req.project);
    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => {
    res.status(500).json({
        message: "error in projects router",
        err: err.message
    })
})

module.exports = router;