const { Client, Intents, MessageAttachment, MessageEmbed } = require("discord.js");
const dotEnv = require('dotenv');

const { User } = require('../model/User')
const Verify = require("./bot-action");
const reaction = require('./deploy-commands');
const { makeExcelFile } = require('../util/makeExcelFile');
const { checkHolder } = require('../util/contract');

dotEnv.config();

const GUILD_ID = process.env.SERVER_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once("ready", async () => {
  const guild = client.guilds.cache.get(GUILD_ID);
  const channel = guild.channels.cache.get(CHANNEL_ID);
  channel.send("bot 기동완료");

  Verify.ready(client);
  console.log(`Ready!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;
  switch (commandName) {
    case 'ping':
      await interaction.reply('Pong!');
      break;
    case 'server':
      await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
      break;
    case 'submit-wallet':
      const {id, username} = interaction.user;
      const chain = interaction.options.getString("chain");
      const address = interaction.options.getString("address");
      const result = await checkHolder(address);
      const newUser = {id, name: username, chain, address, nftCount: result.message};

      // 1. Check NFT Holder
      if(result.code !== 200) {
        await interaction.reply({ content : `you are not a holder.. "${exUser.name}" \n plz get a NFT`,});
        break;
      }
      // 2. Check already registed
      const exUser = await User.findOneById(newUser.id);
      if(exUser) {
        await interaction.reply({ content : `already registed, "${exUser.name}" \n your wallet address is "${exUser.address}"`,});
        break;
      }
      // 3. Regist user
      await User.create(newUser)
      .then(async userInfo => {
        console.log('Registing userInfo Successfull! : ', userInfo);
        await interaction.reply({ content : `Registing userinfo Successfull, "${userInfo.name}" \n your wallet address is "${userInfo.chain} | ${userInfo.address}"`,});
      })
      .catch(async err => {
        console.log('Cant regist userinfo.. : ', err);
        await interaction.reply({ content : `can't regist userinfo.. because "${err}"`,});
      })
      break;
    case 'holder-list':
      const excel = await makeExcelFile(await User.findAll());
      const file = new MessageAttachment(await excel.xlsx.writeBuffer(), 'Holder_List.xlsx'); 
      await interaction.reply({ content : `Here is HolderList🤫`,
                                files: [file]});
      break;
      case 'what-nft':
        const embed = new MessageEmbed() //
          .setTitle("NFT 정보로 이동하기")
          .setDescription(`위에 문구를 눌러서 NFT SCOPE를 확인하세요.`)
          .setURL(`https://baobab.scope.klaytn.com/nft/${process.env.CONTRACT_ADDR}?tabId=nftTransfer`);
        
        await interaction.reply({ embeds: [embed] });
        break;
    default:
      break;
  }
});

client.login(process.env.BOT_TOKEN).then((result) => {
  console.log("login success!! : ", result);
}).catch((err) => {
  console.log('login error :', err)
});


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