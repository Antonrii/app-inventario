const Stock = require("../models/stock");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const newStock = await new Stock(req.body).save();
    res.json(newStock);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.read = async (req, res) => {
  const stock = await Stock.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(stock);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Stock.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("STOCK UPDATE ERR ---->", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Stock.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Stock delete failed");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Stock.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Stock Soft deleted failed");
  }
};

exports.count = async (req, res) => {
  let count = await Stock.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json({count});
};

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.query;
    const currentPage = page || 1;
    const perPage = 2;
    const stocks = await Stock.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(stocks);
  } catch (err) {
    console.log(err);
  }
};

exports.changeStock = async (req, res) => {
  try {

    if(req.body.type && req.body.number) {

      const stock = await Stock.findOne({
        slug: req.params.slug,
      }).exec();

      if(req.body.type == "up")
      {
        let result = stock.value + req.body.number <= 0 ? 0 : stock.value + req.body.number;
        const data = {"value":result}
        const updated = await Stock.findOneAndUpdate(
          { slug: req.params.slug },
          data,
          { new: true }
        ).exec();
        res.json(updated);

      } else if (req.body.type == "down")
      {
        let result = stock.value - req.body.number <= 0 ? 0 : stock.value - req.body.number;
        const data = {"value":result}
        const updated = await Stock.findOneAndUpdate(
          { slug: req.params.slug },
          data,
          { new: true }
        ).exec();
        res.json(updated);

      } else {
        res.status(404).json({
          err: "invalid parameter",
        });
      }

    } else {
      res.status(404).json({
        err: "required fields not found",
      });
    }

  } catch (err) {
    console.log("CHANGE STOCK UPDATE ERR ---->", err);
    res.status(400).json({
      err: err.message,
    });
  }
};