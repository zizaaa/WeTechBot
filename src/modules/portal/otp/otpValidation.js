const enrollment = require('../../../model/enrollmentModel')
const { EmbedBuilder} = require('discord.js');

async function otpValidation(client, interaction){
    try {
        const userId = interaction.user.id
        const userName = interaction.user.username
        const otpCode = interaction.fields.getTextInputValue('user_otp');

            const data = await enrollment.findOne({userId:userId})

            if(!data){
                await interaction.reply({
                    embeds: [
                        {
                            description: 'application form not defined',
                            color: 0xFF5733
                        }
                    ],
                    ephemeral: true,
                });

                return;
            }

            if(data.otp === otpCode){
                data.status = 'Pending';
                data.otp = '';

                await data.save()
                
                        // Show the modal to the user
                        const embed = new EmbedBuilder()
                        .setTitle('Congratulations 🎉 ')
                        .setDescription('You have successfully completed the enrollment process. Please await further announcements. We will provide you with the credentials to access the WeTech Portal shortly. 🚀')
                        .setImage('https://i.imgur.com/z7FCU1X.png')
                        .setColor(0x56F387);

                        await interaction.update({
                            embeds: [embed],
                            components: [],
                            ephemeral: true,
                        });


                        // 0xFF5733 
                        //send to enrollment log for admins approval
                        const channelId = '1161963168080347156'
                        const specificChannel = await client.channels.fetch(channelId);
                        
                        await specificChannel.send({
                            embeds:[
                                {
                                    title:'Enrollment Form',
                                    description:`Name: \`\`\`${data.firstName} ${data.lastName}\`\`\`\n 
                                                Gender: \`\`\`${data.gender}\`\`\`\n 
                                                Course:\`\`\`${data.course === 'web' ? 'Web Development':data.course}\`\`\`\n 
                                                Email: \`\`\`${data.email}\`\`\` \n 
                                                Birth date: \`\`\`${data.birthDate}\`\`\`\n 
                                                Status: \`\`\`${data.status}\`\`\``,
                                    color:0xFF5733
                                }
                            ],
                            components: [
                                {
                                    type: 1, // ACTION_ROW
                                    components: [
                                        {
                                            type: 2, // BUTTON
                                            style: 3,
                                            label: 'Approve',
                                            custom_id: `approved_enrollment_${data._id}`,
                                            disabled:false
                                        },
                                        {
                                            type: 2, 
                                            style: 4,
                                            label: 'Disapprove',
                                            custom_id:`disapproved_enrollment_${data._id}`,
                                            disabled:false
                                        },
                                    ],
                                },
                            ],
                        })

                        const enrollChannelID = '1161971355705675788'
                        const enrollChannel = await client.channels.fetch(enrollChannelID);
                        await enrollChannel.send({
                            embeds:[
                                {
                                    description:`${userName} has successfully completed the enrollment process for the course ${data.course === 'web' ? 'Web Development':data.course}. Congratulations! 🎉`,
                                    color: 0x56F387
                                }
                            ]
                        })
            }else{
                 // Show the modal to the user
                        const embed = new EmbedBuilder()
                        .setTitle('Invalid OTP')
                        .setDescription('The One-Time Password (OTP) you entered is invalid. Please make sure to enter a valid 4-digit OTP to proceed.')
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
                                            label: 'Enrollment Form',
                                            custom_id: 'enrollment_form_button',
                                            disabled:true
                                        },
                                        {
                                            type: 2, 
                                            style: 2,
                                            label: 'OTP',
                                            custom_id:'otp_button',
                                            disabled:false
                                        },
                                        {
                                            type: 2, 
                                            style: 2,
                                            label: 'Resend OTP',
                                            custom_id:'resend_otp_button',
                                            disabled:false
                                        },
                                    ],
                                },
                            ],
                            ephemeral: true,
                        });
            }
    } catch (error) {
        console.error(error)
        interaction.reply({
            embeds: [
                {
                    description: 'An error occurred while processing your request. Please try again later.',
                    color: 0xFF5733
                }
            ],
            ephemeral: true,
        });
    }
}

module.exports = {otpValidation}