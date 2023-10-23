const enrollment = require('../../../model/enrollmentModel');
const generateRandomPassword = require('./passwordGenerator');
const axios = require('axios');
const bcrypt = require('bcrypt');
require('dotenv').config();
const API = process.env.API;

async function enrollmentApproval(client, interaction,EmbedBuilder){
    try {
        const [action, dataId] = interaction.customId.split('_enrollment_');

        const data = await enrollment.findById(dataId)

            if(!data || data.status === 'Approved'){
                await interaction.update({
                    embeds:[
                        {
                            title: 'Enrollment Approval',
                            description: "We can't find this request; it may have already been resolved, the data has been deleted, or the applicant canceled their application.",
                            color: 0x56F387, // Light green color
                        }
                        
                    ],
                    components: [
                        {
                            type: 1, // ACTION_ROW
                            components: [
                                {
                                    type: 2, // BUTTON
                                    style: 4,
                                    label: 'resolved',
                                    custom_id: `enrollment_button`,
                                    disabled:true
                                }
                            ],
                        },
                    ],
                })

                return;
            } 

        const user = await interaction.client.users.fetch(data.userId);

        if(action === 'approved' && data.status === 'Pending'){

            const firstName = data.firstName.replace(/ /g, '');
            const lastName = data.lastName.replace(/ /g, '.');
            const birthday = data.birthDate.replace(/\//g, '-');
            const combined = `${firstName}.${lastName}@wetech.com`;
            const username = combined.toLowerCase()
            const password = generateRandomPassword(6); // Change 6 to any desired length

            //send to db
            const newData = {
                discordId:data.userId,
                firstname:data.firstName,
                lastname:data.lastName,
                birthday:birthday,
                gender:data.gender,
                email:data.email,
                username:username,
                password:password,
                courseId:data.course
            }

            await axios.post(`${API}`,newData)
            .then(async()=>{

                //has pash
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(password, salt);
            
                // Update user information
                data.status = 'Approved';
                data.acountUserName = username;
                data.password = hash;
                await data.save();

                await interaction.update({
                    embeds:[
                        {
                            title: 'Enrollment Approval',
                            description: `You have just approved the enrollment form for ${data.firstName}. The applicant will be notified accordingly.`,
                            color: 0x56F387, 
                        }
                        
                    ],
                    components: [
                        {
                            type: 1, // ACTION_ROW
                            components: [
                                {
                                    type: 2, // BUTTON
                                    style: 3,
                                    label: '✔️ Approved',
                                    custom_id: `approved_enrollment_${data._id}`,
                                    disabled:true
                                }
                            ],
                        },
                    ],
                })
    
    
                const embed = new EmbedBuilder()
                .setTitle(`Welcome, ${user.username}!`)
                .setDescription(`We are delighted to welcome you to WeTech. Here are your credentials for accessing the WeTech Portal for the course '${data.course}':\n\n**Username**: \`\`\`${username}\`\`\`\n**Password**: \`\`\`${password}\`\`\``)
                .setImage('https://i.imgur.com/z7FCU1X.png')
                .setColor(0x56F387);
    
                await user.send({
                    embeds:[embed]
                })

                return;
            })
            .catch(async(error)=>{
                await interaction.reply({
                    embeds: [
                        {
                            description: 'An error occurred. Please contact our support team for further assistance.',
                        }
                    ],
                    ephemeral: true,
                });

                return;
            })

            return;
        }else if(action === 'disapproved' && data.status === 'Pending'){
            await data.deleteOne({_id:dataId})

            await interaction.update({
                embeds:[
                    {
                        title: 'Enrollment Approval',
                        description: `You have just disapproved the enrollment form for ${data.firstName}. The applicant will be notified accordingly.`,
                        color: 0x56F387, // Light green color
                    }
                    
                ],
                components: [
                    {
                        type: 1, // ACTION_ROW
                        components: [
                            {
                                type: 2, // BUTTON
                                style: 4,
                                label: '❌ disapproved',
                                custom_id: `enrollment_${data._id}`,
                                disabled:true
                            }
                        ],
                    },
                ],
            })

            const embed = new EmbedBuilder()
            .setTitle(`Application Status`)
            .setDescription(`We appreciate your interest in WeTech. Unfortunately, your application has not been approved at this time. We encourage you to reapply in the future or contact our support team for more information.`)
            .setImage('https://i.imgur.com/z7FCU1X.png')
            .setColor(0x56F387);

            await user.send({
                embeds:[embed]
            })

            return;
        }else{
            await interaction.update({
                embeds:[
                    {
                        title: 'Enrollment Approval',
                        "description": "The issue has been successfully resolved.",
                        color: 0x56F387, // Light green color
                    }
                ],
                components: [
                    {
                        type: 1, // ACTION_ROW
                        components: [
                            {
                                type: 2, // BUTTON
                                style: 4,
                                label: 'Resolved',
                                custom_id: `enrollment_${data._id}`,
                                disabled:true
                            }
                        ],
                    },
                ],
            })
            return;
        }

    } catch (error) {
        console.error(error);
        await interaction.reply({
            embeds: [
                {
                    description: 'An error occurred. Please contact our support team for further assistance.',
                }
            ],
            ephemeral: true,
        });
        return;
    }
}

module.exports = {
    enrollmentApproval
}