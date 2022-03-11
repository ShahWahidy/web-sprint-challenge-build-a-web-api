const Projects = require('./projects-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    const { method, url } = req;
    console.log(`[${timestamp}] ${method} to ${url}`);
    next();
}

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            res.status(404).json({
                message: 'project not found'
            })
        } else {
            req.project = project;
            next();
        }
    } catch (err) {
        res.status(404).json({
            message: 'project not found',
        })

    }
}
function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description ) {
        res.status(400).json({
            message: 'missing required  fields'
        })
    } else {
        req.name = name.trim();
        req.description = description.trim()
        next();
    }
}

module.exports = {
    logger,
    validateProjectId,
    validateProject
}