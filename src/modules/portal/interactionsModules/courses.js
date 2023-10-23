async function courses(interaction,EmbedBuilder){
        const wavingHandEmoji = String.fromCodePoint(0x1F44B);
        const embed = new EmbedBuilder()
        .setTitle(`Greetings, ${interaction.user.username} ${wavingHandEmoji}`)
        .setDescription(`Welcome to the WeTech Portal. Please make your selection from the available courses for enrollment.`)
        .setImage('https://i.imgur.com/z7FCU1X.png')
        .setColor(0xFF5733);

        await interaction.update({
            embeds: [embed],
            components: [
                {
                    type: 1, // ACTION_ROW
                    components: [
                        {
                            type: 2, // BUTTON
                            style: 3,
                            label: 'Web Dev',
                            custom_id: 'course_button_web',
                            disabled:false
                        },
                        {
                            type: 2, 
                            style: 3,
                            label: 'C++',
                            custom_id:'course_button_c++',
                            disabled:false
                        },
                        {
                            type: 2, 
                            style: 3,
                            label: 'Python',
                            custom_id:'course_button_python',
                            disabled:false
                        },
                        {
                            type: 2, 
                            style: 3,
                            label: 'Java',
                            custom_id:'course_button_java',
                            disabled:false
                        },
                    ],
                },
            ],
            ephemeral: true,
        });
}

module.exports = {
    courses
}