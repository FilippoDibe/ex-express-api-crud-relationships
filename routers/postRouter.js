const express = require("express");
const router = express.Router();

const {
    index,
    showBySlug,
    create,
    update,
    destroy
} = require('../controllers/postController.js')

const uniqueSlug = require('../middlewares/uniqueSlug.js');

router.post("/", uniqueSlug, create);
router.put("/:slug", uniqueSlug, update);

router.get("/:slug", showBySlug);
router.get("/", index);
router.delete("/:slug", uniqueSlug, destroy);

module.exports = router;