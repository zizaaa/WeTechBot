const enrollment = require('../../../model/enrollmentModel');
const { EmbedBuilder} = require('discord.js');
const generateVerificationCode = require('./otpGenerator')
const {sendVerificationEmail} = require('../emailSender')

async function resendOTPValidation(interaction){
    try {
        const email = interaction.fields.getTextInputValue('resend_email');

        const emailRegex = /^.+@.+$/;

        if(emailRegex.test(email)){
            const application = await enrollment.findOne({email})
            if(!application){
                interaction.reply({
                    embeds:[
                        {
                            description: "The provided email address does not exist. Please ensure that you are using the same email address that you used during the enrollment process.",
                            color:0xFF5733
                        }
                    ],
                    ephemeral: true,
                })

                return;
            }
            const userEmailAddress = email
            const verificationCode = generateVerificationCode().toString();
            sendVerificationEmail(userEmailAddress, verificationCode)

            application.otp = `${verificationCode}`
            await application.save()

            // Show the modal to the user
            const embed = new EmbedBuilder()
            .setTitle('Email Verification')
            .setDescription('An email with a one-time password (OTP) has been sent to your registered email address. Please check your inbox or spam folder. To complete the verification process, click the "OTP" button below and enter the OTP you received.')
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
                        ],
                    },
                ],
                ephemeral: true,
            });
        }else{
            interaction.reply({
                embeds:[
                    {
                        description:'Invalid email address!',
                        color:0xFF5733
                    }
                ],
                ephemeral: true,
            })
        }
    } catch (error) {
        console.error('An error occurred:', error);
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

module.exports = {resendOTPValidation}