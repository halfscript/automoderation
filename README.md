<p align = "center">
 <h1> 
   <b> 
    Automod based on OpenAI API for your Discord Server
    </b>
 </h1>
</p>

## What should you do
You need to download this repo or import it to [Replit](https://repl.it/)

# **How to get Discord Bot Token and OpenAI API Key**
## Getting Discord bot token
*Guess that's easy, but just in case, here is the tutorial for that*

 To get Bot Token, go to [Discord Developers](https://discord.com/developers/applications)

 Find the `New Application` button and create the new application
 
 Next, click to `Bot` button, and find the `Add Bot` button, then click to `Reset Token` and copy and paste into `TOKEN=`

## Getting OpenAI API Key
**Make sure you have OpenAI account!**

 Go to [OpenAI API Keys](https://platform.openai.com/account/api-keys) and find `Create new secret key` button

 It'll ask you to name it, but it's optional, if you don't want to name your key then just press `Create secret key` and then copy it

 ### **Important**
 You won't be able to view your OpenAI API Key again through your account. If you lose this secret key, you'll need recreate. 

# **Using VSCode**
Go to `.env` and enter the values into the following:

```
API_KEY=your_api_key
TOKEN=discord_bot_token
```
Then, open terminal and enter `node .`

 *(If you have Node.JS installed on your PC)*

# **Using Replit**

*If you do not have a replit account, then register.*

Go to [Replit](https://repl.it/), and click to `Create Repl` button, then click to `Insert from Github` and paste the following link: `https://github.com/halfscript/automoderation.git`

After that, go to the "Secrets" tab, enter your OpenAI API and Discord Bot Token in the "API_KEY" and "TOKEN" keys.

Next, press `Run`.

# Guess it's done
Feel free submitting PR (Pull Request) for suggestions.


