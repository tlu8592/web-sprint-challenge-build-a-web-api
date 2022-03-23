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

module.exports = router;