const { Client, Intents } = require("discord.js");
const Verify = require("./bot-action");
const dotEnv = require('dotenv');

dotEnv.config();
const runBot = () => {
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
}

module.exports  = {
  runBot
};