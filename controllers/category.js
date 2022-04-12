const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const newCategory = await new Category(req.body).save();
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.read = async (req, res) => {
  const category = await Category.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(category);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("CATEGORY UPDATE ERR ---->", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Category Soft deleted failed");
  }
};

exports.count = async (req, res) => {
  let count = await Category.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json({count});
};

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.query;
    const currentPage = page || 1;
    const perPage = 2;
    const categories = await Category.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(categories);
  } catch (err) {
    console.log(err);
  }};