const express = require("express");
const bodyParser = require("body-parser");
const Caver = require("caver-js");
const dotEnv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');
const { add_nft_role } = require('./bot');
const { makeExcelFile } = require('./makeExcelFile');

dotEnv.config();

const app = express();
const corsOptions = {
    origin : 'https://klaytn-dean.vercel.app',
    credentials : true,
}

app.use(bodyParser.json(),cors(corsOptions));

app.get("/", async (request, response) => {
  const excel = await makeExcelFile(request);
  const fileName = 'Holder_List.xlsx';

  response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  excel.xlsx.write(response).then(()=>response.end()); // download
});

app.post("/api_discord_connect", async (request, response) => {
  // 1. get NFT info
  const address = request.body.address;
  if(address === null) return response.json({
    code: 400,
    message: "plz connect your wallet",
  });
  
  let ret;
  ret = await contract.balanceOf(address);
  const count = Number(ret);
  console.log("count", count);

  if(count === 0) return response.json({
    code: 400,
    message: "your are not holder",
  });

  // 2. get discord ID info
  const url = "https://discord.com/api/oauth2/token";
  const code = request.body.code
    const oauthResult = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIECT_URI,
        scope: "identify",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }); 
    console.log("oauthResult", oauthResult);

    const oauthData = await oauthResult.json();
    console.log("oauthData", oauthData);
    const userResult = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${oauthData.token_type} ${oauthData.access_token}`,
      },
    });

    const userData = await userResult.json();
    console.log("userData", userData);

  // 3. give auth
  add_nft_role(userData.id);
  return response.json({
    code: 200,
    message: "ok",
  });
});

app.post("/api_wallet", async (request, response) => {
  console.log("api_wallet", request.body);
  const addr = request.body.addr;
  if(addr === null) return response.json({
    code: 400,
    message: "plz connect your wallet",
  });
  
  let ret;
  ret = await contract.balanceOf(addr);
  const count = Number(ret);
  console.log("count", count);

  return response.json({
    code: 200,
    message: "ok",
    count,
  });
});

async function initContract() {
    contract = await caver.kct.kip17.create(process.env.CONTRACT_ADDR);
    console.log("initContract ok");
}

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

const caver = new Caver(process.env.RPC_URL);

let contract = null;

initContract();

  
