const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete(req.body.id);

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    const doc = await Model.create({
      userId: jwt.decode(token).id,
      title: req.body.title,
      message: req.body.message,
      dateTime: req.body.dateTime,
      email: req.body.email,
    });

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    const doc = await Model.find({ userId: jwt.decode(token).id });

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      results: doc.length,
      events: doc,
    });
  });
