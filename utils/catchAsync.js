const catchAsyn = rt => {
  return (req, res, next) => {
    rt(req, res, next).catch(error => next(error));
  };
};

module.exports = { catchAsyn };
