const { returnData } = require("../cronJobs");

const getData = async (req, res) => {
  const data = returnData();

  res.status(200).send({
    success: true,
    data
  });
};

module.exports = {
  getData
};
