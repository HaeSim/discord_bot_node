const { MessageEmbed } = require("discord.js");
const dotEnv = require('dotenv');

dotEnv.config();

const CH_VERIFY = process.env.CHANNEL_ID;
const URL_ATUH = process.env.AUTH_URL;

async function ready(client) {
  const ch = await client.channels.fetch(CH_VERIFY);

  const embed = new MessageEmbed() //
    .setTitle("여기를 눌러 지갑을 연동 하기")
    .setDescription(`위에 문구를 눌러서 지갑을 연동하세요`)
    .setURL(URL_ATUH);
  ch.send({ embeds: [embed] }).then(() => {});
}

module.exports = {
  ready,
};
