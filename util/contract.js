const Caver = require("caver-js");

async function initContract() {
    const caver = new Caver(process.env.RPC_URL);
    const contract = await caver.kct.kip17.create(process.env.CONTRACT_ADDR);
    console.log("initContract ok");
    return contract;
}

module.exports = {
    initContract,
  };