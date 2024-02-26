const convertFormDataToJson = (req, res, next) => {
    try {
        req.body = {...req.body};
        if(req.body.ingredients) {
            req.body.ingredients = JSON.parse(req.body.ingredients);
        }
        if(req.body.instructions) {
            req.body.instructions = JSON.parse(req.body.instructions);
        }
        if(req.body.category) {
            req.body.category = JSON.parse(req.body.category);
        }
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = convertFormDataToJson;