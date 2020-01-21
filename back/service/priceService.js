const { db } = require("../configuration/database/connection");
const { resultPrix } = require("../utils/easy");

//

var ref = db.ref("prices");

const getPrice = () => ref.once("value").then(snap => snap.val());

const addPrice = async (date, data) => {
  const { departurePrix, returnPrix } = await resultPrix(data);
  db.ref("prices/" + date).set({
    departurePrix,
    returnPrix
  });
};

const clearPrice = () => ref.remove();

module.exports = {
  getPrice,
  addPrice,
  clearPrice
};
