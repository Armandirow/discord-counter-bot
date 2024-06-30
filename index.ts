import { Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

deployCommands({ guildId: config.GUILD_ID });

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;
      if (commands[commandName as keyof typeof commands]) {
        console.log(`executing ${commandName}`);
        await commands[commandName as keyof typeof commands].execute(
          interaction
        );
      }
    } else if (interaction.isButton()) {
      // respond to the button

      const [counterName, counterString] =
        interaction.message.content.split(": ");
      const counter = Number(counterString);
      interaction.update(`${counterName}: ${counter + 1}`);
    }
  } catch (error) {
    console.warn(`${error}`);
  }
});

client.login(config.DISCORD_TOKEN);
