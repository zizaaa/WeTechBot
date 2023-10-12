const Report = require('../model/report'); // Replace with the actual path

async function reportCommand(client, interaction) {
    try {
        const { user, options, guild } = interaction;

        // Get the reported user's ID and reason from the options
        const reportedUserId = options.getUser('user').id;
        const reportedUsername = options.getUser('user').username;
        const reason = options.getString('reason');
        
        // Create a new report entry
        const newReport = new Report({
            reporterUserId: user.id,
            reportedUserId,
            reportedUsername,
            reason,
            status: 'Pending', // Initial status is pending
        });

        await newReport.save();

        // Notify specific users (admins/moderators) to review the report
        // const specificUserIds = ['1010013077762224270', '869968873544376391']; // Add specific user IDs or usernames
         // Add specific user IDs or usernames
        
        // specificUserIds.forEach(async (specificUserId) => {
            try {
                // Fetch the specific user by their ID or username
                const specificChannelId = '1161660952442322965';
                const specificChannel = await client.channels.fetch(specificChannelId); 
                
                // Send a message with buttons for approval to the specific user
                const reportMessage = await specificChannel.send({
                    content: `New Report: ${reportedUsername} (${reportedUserId})`,
                    embeds: [
                        {
                            title: 'Reported Reason:',
                            description: reason,
                            color: 0xFF5733
                        },
                    ],
                    components: [
                        {
                            type: 1, // ACTION_ROW
                            components: [
                                {
                                    type: 2, // BUTTON
                                    style: 3, // SUCCESS
                                    label: 'Approve',
                                    custom_id: `approve_report_${newReport._id}`, // Unique ID for approval button
                                },
                                {
                                    type: 2, // BUTTON
                                    style: 4, // DANGER
                                    label: 'Disapprove',
                                    custom_id: `disapprove_report_${newReport._id}`, // Unique ID for disapproval button
                                },
                            ],
                        },
                    ],
                });

                // You can also send a message to the report log channel here
            } catch (error) {
                // Handle the case where the specific user was not found or an error occurred
                console.error('Error sending report to specific user:', error);
            }
        // });

        // Respond to the reporter with an ephemeral message
        await interaction.reply({
            content: `Thank you for reporting ${reportedUsername}. Your report has been recorded and is under review by the admins.`,
            ephemeral: true,
        });

    } catch (error) {
        console.error(error);
        await interaction.reply({
            content:'An error occurred while processing your report. Please try again later.',
            ephemeral: true
        });
    }
}


module.exports = {
    reportCommand
};
