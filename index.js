import request from 'request'
import Discord from 'discord.js' // Using discord.js v13.8

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    partials: ["CHANNEL"]
}); // You can change if you want to.

const OpenAI_KEY = process.env["API_KEY"]; // Use your own api key (MAKE SURE IT'S WORKING!)


client.on("ready", () => {
    console.log('I am ready!')

})

client.on("messageCreate", async message => {
    if (message.channel.type === "DM") return; // So it won't error if automod has been triggered on Direct Messages.

    // Self explanatory
    const friendlytags = {
        'sexual': "Sexual Content",
        'hate': 'Hate Speech',
        'violence': 'Violence',
        'self-harm': "Self-Harm",
        'sexual/minors': 'Child Endangerment',
        'hate/threatening': 'Threatening',
        'violence/graphic': 'Graphic Violence'
    }

    request.post({
        url: `https://api.openai.com/v1/moderations`,
        
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'content-type': 'application/json'
        },

        body: JSON.stringify({
            input: message.content
        })

    }, (err, response, body) => {
        if (err) {
            console.log("Error: ", err);
        };

        const ParsedResponseBody = JSON.parse(body)

        if (ParsedResponseBody.results[0].flagged === true) {

            let sortedEntries = Object.entries(ParsedResponseBody.results[0].categories).sort((a, b) => b[0] - a[0]);
            console.log(sortedEntries)

            for (let i = 0; i < sortedEntries.length; i++) {
                if (sortedEntries[i][1] == true) {
                    var value = sortedEntries[i][0];
                };
            };

            message.member.timeout(3600000, friendlytags[value]).then(() => {
                // Put your code here or use this:
                message.delete().catch(console.error)
                message.author.send(`Woah there! It seems you sent a message that contains ${friendlytags[value]}\nYou have been timed out for 1 hour.`)

            });
        };
    });
})

client.login(process.env["TOKEN"])