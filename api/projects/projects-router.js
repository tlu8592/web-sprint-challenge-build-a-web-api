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

module.exports = router;