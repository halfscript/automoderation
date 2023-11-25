import Discord from 'discord.js' // Using discord.js v13.8
import openaiAutomod from './src/automod';

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
    ],
    partials: ["CHANNEL"]
});

const OpenAI_KEY = process.env["API_KEY"];
const automod = new openaiAutomod(OpenAI_KEY);

client.on("ready", () => {
    console.log('I am ready!')

})

client.on("messageCreate", async (message) => {
    if (message.channel.type === "DM") return;

    try {
        const results = await automod.runAutomod(message.content);

        if (results.isFlagged) {
            console.log("Flagged Message");
        } else {
            console.log("Message is clear");
        }
    } catch (error) {
        console.error("Automod error:", error);
    }
});

client.login(process.env["TOKEN"])