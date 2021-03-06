const priceService = require("../service/priceService");

const getPrice = async (req, res) => {
  const prices = await priceService.getPrice();
  // console.log("controller", prices);
  res.status(200).send({
    success: true,
    data: prices
  });
};

const clearPrice = async (req, res) => {
  const prices = await priceService.clearPrice();
  console.log("controller", prices);
  res.status(200).send({
    success: true
  });
};

// const addPrice = async (req, res) => {
//   const addPrice = await priceService.addPrice(234);
//   console.log("controller", addPrice);
//   res.status(200).send({
//     success: true
//   });
// };

module.exports = {
  getPrice,
  clearPrice
  // addPrice
};
