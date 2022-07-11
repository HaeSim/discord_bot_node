const { MessageEmbed } = require("discord.js");
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

  // const embed2 = new MessageEmbed() //
  //   .setTitle("봇 흔들어 깨우기")
  //   .setDescription(`봇이 자고 있을 수 있어요. 흔들어서 깨워주세요. (30초 이내로 깨어남)`)
  //   .setURL(URL_BOT);
  // ch.send({ embeds: [embed2] }).then(() => {});
}

module.exports = {
  ready,
};