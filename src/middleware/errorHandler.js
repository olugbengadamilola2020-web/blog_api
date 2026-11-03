const multer = require("multer");

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack || '');
    const status = err.status || 500;
    res.status(status).json({ error: err.message});

if (err instanceof multer.MulterError) {
    res.status(400).json('Invalid file type or too large file');
}
res.status(status).json({error: err.message});
};

module.exports = errorHandler;

