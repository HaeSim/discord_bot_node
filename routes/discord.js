const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const { User } = require('../model/User')
const { initContract, checkHolder } = require('../util/contract');
const { add_nft_role } = require('../bot/bot');
const { makeExcelFile } = require('../util/makeExcelFile');


const router = express.Router();

router.use(cors())

router.get('/', (req, res) => {
  res.send('Hello, discord');
});

router.get('/test', async (req, res) => {
  const result = await User.findAll();
  const excel = await makeExcelFile(result);
  const fileName = 'Holder_List_test.xlsx';

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  excel.xlsx.write(res).then(()=>res.end()); // download
});

router.post('/create', async (req, res) => {
  let cnt = 0;
  const sampleData = [
    { id: '746392810101669979', name: 'Joon',   chain: 'klaytn',    address: '0x01172076A62A8ee348F5aaC995dDbC617294c410', nftCount: 1},
    { id: '984266914731794472', name: 'JOY',    chain: 'ethereum',  address: '0xBe037070D68b73b1dD8959B392E96b536D2523d5', nftCount: 4},
    { id: '953210139245162537', name: 'Emilly', chain: 'polygon',   address: '0x01172076A62A8ee348F5aaC995dDbC617294c410', nftCount: 2},
    { id: '970830481513926676', name: 'James',  chain: 'ethereum',  address: '0x01172076A62A8ee348F5aaC995dDbC617294c410', nftCount: 7},
    { id: '970581203914727424', name: 'Jack',   chain: 'klaytn',    address: '0xBe037070D68b73b1dD8959B392E96b536D2523d5', nftCount: 1},
    { id: '951060533476466709', name: 'K',      chain: 'ethereum',  address: '0x01172076A62A8ee348F5aaC995dDbC617294c410', nftCount: 1},
    { id: '991531608832217188', name: 'Hopper', chain: 'polygon',   address: '0x01172076A62A8ee348F5aaC995dDbC617294c410', nftCount: 1},
  ];
  for(let i in sampleData) {
    if(await User.findOneById(sampleData[i].id)) {
      continue;
    }
    await User.create(sampleData[i])
    .then(userInfo => {
      cnt++;
    })
    .catch(err => res.status(500).send(err))
  }
  return res.status(201).send(cnt+' create complete');
})

//Create
router.post('/register', (req, res) => {
  User.create(req.body)
    .then(userInfo => {
      return res.status(201).send({
        success: true,
        user: 'hello ' + req.body.name,
      })
    })
    .catch(err => res.status(500).send(err))
})

//Verify-give roll
router.post("/verify", async (req, res) => {
    const address = req.body.address;
    // 1. get NFT info
    let result = await checkHolder(address);
    if(result.code !== 200) return res.json(result);
   
    // 2. get discord ID info
    const url = "https://discord.com/api/oauth2/token";
    const code = req.body.code;
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
  
    const oauthData = await oauthResult.json();
    const userResult = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${oauthData.token_type} ${oauthData.access_token}`,
      },
    });
    const userData = await userResult.json();  
    // 3. give auth
    add_nft_role(userData.id);
    return res.json({
      code: 200,
      message: "ok",
    });
  });


module.exports = router;