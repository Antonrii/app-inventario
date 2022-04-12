const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft, count } = require("../controllers/store");

router.post("/store", create);
router.get("/store/:slug", read);
router.put("/store/:slug", update);
router.delete("/store/:slug", remove);
router.patch("/store/:slug", removeSoft);
router.get("/store/count", count);
router.get("/stores", list);

module.exports = router;