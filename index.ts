import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

// guild install with "bot" scope and "Send Messages" + "Send Messages in
// threads" permissions.
// no, you don't need MESSAGE_CONTENT intent for a bot that only acts on mentions.
// "@gork is this true" will work. I know more than you.

const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  throw new Error("DISCORD_BOT_TOKEN is not defined in environment variables.");
}

const client = new Client({
  intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

const MAGIC_EIGHT_BALL_RESPONSES = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

const TRIGGER_PHRASES = ["is this true", "is this real"];

client.on(Events.MessageCreate, (message) => {
  if (
    message.cleanContent.length > 0 &&
    TRIGGER_PHRASES.some((phrase) =>
      message.content.toLowerCase().includes(phrase.toLowerCase())
    )
  ) {
    const response =
      MAGIC_EIGHT_BALL_RESPONSES[
        Math.floor(Math.random() * MAGIC_EIGHT_BALL_RESPONSES.length)
      ];
    message.reply(response);
  }
});

client.login(token);
