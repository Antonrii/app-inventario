const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stockSchema = new mongoose.Schema(
    {
        name: { type: "String", trim: true, text: true, maxlength: 32, required: "Name is required"},
        slug: { type: "String", unique: true, lowercase: true, index: true},
        sku: { type: "String", required: "Sku is required"},
        value: { type: "Number", default: 0},
        category: { type: ObjectId, ref: Category },
        store: { type: ObjectId, ref: Store }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);