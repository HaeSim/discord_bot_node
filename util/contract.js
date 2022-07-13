const Caver = require("caver-js");

async function initContract() {
    const caver = new Caver(process.env.RPC_URL);
    const contract = await caver.kct.kip17.create(process.env.CONTRACT_ADDR);
    console.log("initContract ok");
    return contract;
}

async function checkHolder(address) {
    const contract = await initContract();
    // 1. get NFT info
    if(address === null) return {
        code: 400,
        message: "plz connect your wallet",
      };
    
    let ret;
    ret = await contract.balanceOf(address);
    const count = Number(ret);
    console.log("count", count);
  
    if(count === 0) return {
      code: 400,
      message: "your are not holder",
    };

    return {
        code: 200,
        message: ret,
      };
}

module.exports = {
    initContract,
    checkHolder,
  };