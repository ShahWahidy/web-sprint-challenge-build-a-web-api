const Actions = require('./actions-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    const { method, url } = req;
    console.log(`[${timestamp}] ${method} to ${url}`);
    next();
}

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            res.status(404).json({
                message: 'action not found'
            })
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        res.status(404).json({
            message: 'action not found',
        })

    }
}
function validateAction(req, res, next) {
    const {project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({
            message: 'missing required  fields'
        })
    } else {
        req.description = description.trim();
        req.notes = notes.trim();
        next();
    }
}

module.exports = {
    logger,
    validateActionId,
    validateAction
}