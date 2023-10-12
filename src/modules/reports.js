//models
const Report = require('../model/report');
const UserReport = require('../model/userReportModel');

async function reports (client, interaction){
    const [action, reportId] = interaction.customId.split('_report_');
    const report = await Report.findById(reportId);

    if (!report) {

        await interaction.update({
            components: [
                {
                    type: 1, // ACTION_ROW
                    components: [
                        {
                            type: 2, // BUTTON
                            style: 1, // PRIMARY (or any other style you prefer)
                            label: 'Resolved',
                            custom_id: 'report_status_button', // Add a custom id for the button
                            disabled: true, // Disable the button
                        },
                    ],
                },
            ],
            content: 'This report has already been resolved or does not exist anymore!.',
        });
        return;
    }

    const userData = await UserReport.findOne({ reportedUserId: report.reportedUserId });

    if (report && action === 'approve') {

        // report.status = 'approved'
        // await report.save();

        if (!userData) {
            const newUserData = new UserReport({
                reporterUserId: [report.reporterUserId],
                reportedUserId: report.reportedUserId,
                reason: [report.reason],
                timesReported: 1
            });
            await newUserData.save();
        } else {
            userData.reporterUserId.push(report.reporterUserId);
            userData.reason.push(report.reason);
            userData.timesReported += 1;
            await userData.save();
        }

        // Delete the report
        await Report.deleteOne({ _id: reportId });

        // Notify the reporter
        const reporter = await interaction.client.users.fetch(report.reporterUserId);
        const reported = await interaction.client.users.fetch(report.reportedUserId);
        
        await reporter.send({
            embeds:[
                {
                    title:'Report update',
                    description:`Your report against ${reported} has been reviewed and approved by an administrator or moderator. Thank you for helping us maintain a safe and respectful community.`,
                    color:0x03FA6E
                }
            ]
        });

        // Notify the reported user
        await reported.send({
            embeds:[
                {
                    title:'You have been reported by another user!',
                    description:`A report against you has been reviewed and approved by an administrator or moderator. The reason for the report was:\`\`\` ${report.reason} \`\`\`. Please ensure you follow the community guidelines and avoid any behavior that led to the report. If you have any concerns or questions, you can contact the administrators and moderators for more information.`,
                    color: 0xFF5733
                }
            ]
        });

                // Update the interaction with the buttons
        await interaction.update({
            components: [
                {
                    type: 1, // ACTION_ROW
                    components: [
                        {
                            type: 2, // BUTTON
                            style: 1, // PRIMARY for approved or 4 (DANGER) for disapproved
                            label:'Approved',
                            custom_id: 'report_status_button', // Add a custom id for the button
                            disabled: true, // Disable the button
                            color:0x03FA6E, 
                        },
                    ],
                },
            ],
            content: 'This report has been approved'
        });

    } else if (report && action === 'disapprove') {

        // report.status = 'disapproved'
        // await report.save();
        // Delete the report
        await Report.deleteOne({ _id: reportId });

        // Notify the reporter
        const reporter = await interaction.client.users.fetch(report.reporterUserId);
        const reported = await interaction.client.users.fetch(report.reportedUserId);
        await reporter.send({
            embeds:[
                {
                    title:'Report update',
                    description:`Your report against ${reported} has been reviewed by an administrator or moderator and, unfortunately, it has been disapproved. It seems there may not be sufficient information or evidence to support your report. If you have additional details or evidence related to this report, please consider reaching out to the administrators and moderators for further review and assistance.`,
                    color: 0xFF5733
                }
            ]
        });

        // Update the interaction with the buttons
        await interaction.update({
            components: [
                {
                    type: 1, // ACTION_ROW
                    components: [
                        {
                            type: 2, // BUTTON
                            style: 1, // PRIMARY for approved or 4 (DANGER) for disapproved
                            label: 'Disapproved',
                            custom_id: 'report_status_button', // Add a custom id for the button
                            disabled: true, // Disable the button
                            color: 0xFF0000,
                        },
                    ],
                },
            ],
            content: 'disapproved'
        });

    }
}

module.exports = {
    reports
}