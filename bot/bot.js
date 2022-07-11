const { Client, Intents } = require("discord.js");
const Verify = require("./bot-action");
const dotEnv = require('dotenv');

dotEnv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

const GUILD_ID = process.env.SERVER_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.once("ready", async () => {
  const guild = client.guilds.cache.get(GUILD_ID);
  const channel = guild.channels.cache.get(CHANNEL_ID);
  channel.send("bot 기동완료");

  Verify.ready(client);
  console.log(`Ready!`);
});

client.login(process.env.BOT_TOKEN);
console.log("login");


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

module.exports = {
  add_nft_role,
};