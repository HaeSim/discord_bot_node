const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');


const router = express.Router();

router.use(cors())

router.get('/', (req, res) => {
  res.send('Hello, discord');
});

router.post("/verify", async (req, res) => {
    const contract = await initContract();
    // 1. get NFT info
    const address = req.body.address;
    if(address === null) return res.json({
      code: 400,
      message: "plz connect your wallet",
    });
    
    let ret;
    ret = await contract.balanceOf(address);
    const count = Number(ret);
    console.log("count", count);
  
    if(count === 0) return res.json({
      code: 400,
      message: "your are not holder",
    });
  
    // 2. get discord ID info
    const url = "https://discord.com/api/oauth2/token";
    const code = req.body.code
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
    return res.json({
      code: 200,
      message: "ok",
    });
  });


module.exports = router;