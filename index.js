require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

client.on('ready', () => {
  console.log(`🤖 Addustar is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message.content }],
    });

    const reply = response.choices[0].message.content;
    message.reply(reply);
  } catch (error) {
    console.error(error);
    message.reply("❌ Sorry, I couldn’t process your message.");
  }
});

client.login(process.env.DISCORD_TOKEN);