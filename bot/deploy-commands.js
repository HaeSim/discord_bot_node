const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const GUILD_ID = process.env.SERVER_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('this is test for health check'),
	new SlashCommandBuilder().setName('server').setDescription('server info!'),
	new SlashCommandBuilder().setName('submit-wallet').setDescription('if you are holder, submit your wallet')
	.addStringOption(option =>
		option.setName('chain')
			.setDescription('wallet to be tracked')
			.setRequired(true)
			.addChoices(
				{ name: 'ETH', value: 'ethereum' },
				{ name: 'SOL', value: 'solana' },
				{ name: 'KLAY', value: 'klaytn' },
				{ name: 'MATIC', value: 'polygon' },))
	.addStringOption(option =>
		 option.setName('address')
		 	.setDescription('enter your wallet address')
			.setRequired(true)),
	new SlashCommandBuilder().setName('holder-list').setDescription('this is excel file about holder list'),]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();