const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
        name: { type: "String", required: true },
        slug: { type: "String", unique: true, lowercase: true, index: true},
        address: { type: "String", required: true },
        status: { type: String, default: "Active", enum: ["Active", "Inactive"],}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);