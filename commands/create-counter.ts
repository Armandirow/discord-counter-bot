import {
  ActionRow,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  SlashCommandBuilder,
  type APIActionRowComponent,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("create-counter")
  .setDescription("Create counter")
  .addStringOption((option) =>
    option.setName("counter-name").setDescription("The name of the counter")
  );

export async function execute(interaction: CommandInteraction) {
  //   const target = interaction.options.get("target");
  const option = interaction.options.get("counter-name");
  if (!option) {
    return await interaction.reply("Please provide a counter-name");
  }
  const { value: counteName } = option;

  const plusOneButton = new ButtonBuilder()
    .setCustomId("plus-one")
    .setLabel("+1")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    plusOneButton
  );

  const response = await interaction.reply({
    content: `${counteName}: 0`,
    components: [row],
  });
}
