const express = require("express");
const validator = require("express-validator");
//encode and decode html tags
const he = require("he");
const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ status: 200, message: "Application wroking fine" });
});


//To replace call ascii unicodes
const replaceAscii = (value) => {
    console.log(value.replace(/<\/?[^>]+(>|$)/g, ""));
    return value.replace(/<\/?[^>]+(>|$)/g, "")
}

// Custom sanitizer to decode HTML entities after escaping
const decodeEntities = (value) => {
    return he.decode(value);
};

router.get(
    "/sanitize",
    validator.query("name").notEmpty().customSanitizer(replaceAscii).escape(),

    (req, res) => {
        const result = validator.validationResult(req);

        if (!result.isEmpty()) {
            return res.json({ status: 400, message: "QUERY FIELD IS REQUIRED" });
        }

        return res.json({ status: 200, message: req.query.name });
    }
);



router.post(
    "/sanitize",
    // Apply the custom sanitizer to strip tags and escape, then decode entities
    validator.body('*').notEmpty().customSanitizer(replaceAscii),
    // .customSanitizer(decodeEntities),
    (req, res) => {
        // const result = validator.validationResult(req);

        // if (!result.isEmpty()) {
        //     return res.status(400).json({ status: 400, message: "Invalid input data", errors: result.array() });
        // }

        return res.json({ status: 200, sanitizedBody: req.body });
    }
);
module.exports = router;