const { MessageEmbed } = require("discord.js");
const { makeExcelFile } = require('./makeExcelFile');
const dotEnv = require('dotenv');

dotEnv.config();

const CH_VERIFY = process.env.CHANNEL_ID;
const URL_ATUH = process.env.AUTH_URL;
const URL_BOT = process.env.BOT_URL;

async function ready(client) {
  const ch = await client.channels.fetch(CH_VERIFY);

  const embed = new MessageEmbed() //
    .setTitle("여기를 눌러 지갑을 연동 하기")
    .setDescription(`위에 문구를 눌러서 지갑을 연동하세요`)
    .setURL(URL_ATUH);
  ch.send({ embeds: [embed] }).then(() => {});

  const embed2 = new MessageEmbed() //
    .setTitle("봇 흔들어 깨우기")
    .setDescription(`봇이 자고 있을 수 있어요. 흔들어서 깨워주세요. (30초 이내로 깨어남)`)
    .setURL(URL_BOT);
  ch.send({ embeds: [embed2] }).then(() => {});
}

async function add_nft_role(user_id) {
  const ROLE_ID_NFT = process.env.ROLE_ID
  console.log("add_nft_role", user_id);

  const guild = client.guilds.cache.get(GUILD_ID);
  const role = guild.roles.cache.get(ROLE_ID_NFT);
  const channel = guild.channels.cache.get(CHANNEL_ID);
  const member = await guild.members.fetch(user_id);
  member.roles.add(role);
  channel.send(member.user.username + " is verified!!");
}

async function send_excel_file(request, response) {
  const excel = await makeExcelFile(request);
  const fileName = 'Holder_List.xlsx';

  response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  excel.xlsx.write(response).then(()=>response.end()); // download
}

module.exports = {
  ready,
  add_nft_role,
  send_excel_file,
};
