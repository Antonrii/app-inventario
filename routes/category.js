const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft, count } = require("../controllers/category");

router.post("/category", create);
router.get("/category/:slug", read);
router.put("/category/:slug", update);
router.delete("/category/:slug", remove);
router.patch("/category/:slug", removeSoft);
router.get("/category/count", count);
router.get("/categories", list);

module.exports = router;