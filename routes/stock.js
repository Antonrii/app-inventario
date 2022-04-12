const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft, count, changeStock } = require("../controllers/stock");

router.post("/stock", create);
router.get("/stock/:slug", read);
router.put("/stock/:slug", update);
router.delete("/stock/:slug", remove);
router.patch("/stock/:slug", removeSoft);
router.get("/stock/count", count);
router.get("/stocks", list);
router.post("/stock/:slug", changeStock);

module.exports = router;