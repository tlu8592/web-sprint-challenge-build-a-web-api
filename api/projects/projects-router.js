// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

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

module.exports = router;