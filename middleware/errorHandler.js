 const{constants}=require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed ", message: err.message, stackTrace: err.stact });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stact });
        
        case constants.FORBIDDEN:
                res.json({ title: "Forbidden", message: err.message, stackTrace: err.stact });

        case constants.SERVER_ERROR:
                    res.json({ title: "Server Error", message: err.message, stackTrace: err.stact });        
        default:
            console.log("No Error, All good !");
            break;
    }

};

module.exports = errorHandler;