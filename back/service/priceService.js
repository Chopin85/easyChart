const { db } = require("../configuration/database/connection");
const { resultPrix } = require("../utils/easy");

//

var ref = db.ref("prices");

const getPrice = () => ref.once("value").then(snap => snap.val());

const addPrice = async date => {
  const { departurePrix, returnPrix } = await resultPrix();
  db.ref("prices/" + date).set({
    departurePrix,
    returnPrix
  });
};

module.exports = {
  getPrice,
  addPrice
};
