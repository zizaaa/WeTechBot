const {sendVerificationEmail} = require('./emailSender')
const { updateEnrollmentData } = require('./updateEnrollmentData')
const { EmbedBuilder} = require('discord.js');
const generateVerificationCode = require('./otp/otpGenerator')

const { successInteraction } = require('./interactionsModules/successInteraction');
const { pendingInteraction } = require('./interactionsModules/pendingInteraction');
const { unverifiedInteraction } = require('./interactionsModules/unverifiedInteraction');

async function enrollmentEmailVerification(interaction){
    const [action, course] = interaction.customId.split('_form_');

    const firstName = interaction.fields.getTextInputValue('first_name');
    const lastName = interaction.fields.getTextInputValue('last_name');
    const gender = interaction.fields.getTextInputValue('user_gender');
    const email = interaction.fields.getTextInputValue('user_email');
    const birthDate = interaction.fields.getTextInputValue('user_birthDate');

    //input validation
    const emailRegex = /^.+@.+$/;
    const birthdateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    const newGender = gender.toLowerCase()
    
    if (!emailRegex.test(email) || !birthdateRegex.test(birthDate) || newGender !== 'male' && newGender !== 'female') {
        await interaction.reply({
            content: 'Invalid Input',
            ephemeral: true,
        });
    } else {
        // Parse the birthDate to a Date object
        const birthDateArray = birthDate.split('/');
        const userBirthDate = new Date(
            parseInt(birthDateArray[2]),
            parseInt(birthDateArray[0]) - 1,
            parseInt(birthDateArray[1])
        );

        // Calculate the user's age
        const currentDate = new Date();
        const ageDiff = currentDate.getFullYear() - userBirthDate.getFullYear();

        // Check if the user is at least 10 years old
        if (ageDiff < 10) {
            await interaction.reply({
                content: 'You must be at least 10 years old to enroll.',
                ephemeral: true,
            });
        } else{

            // Usage: Send a verification email with a randomized code
            const userEmailAddress = email;
            const verificationCode = generateVerificationCode().toString(); // Generate a random code

            //send data to db
            const data = {
                userId:interaction.user.id,
                course,
                firstName,
                lastName,
                gender,
                email,
                birthDate,
                status:'Unverified',
                otp:verificationCode
            }
            
            await updateEnrollmentData(data)
                .then(async(res)=>{
                    if(res === 'success'){

                        successInteraction(interaction, EmbedBuilder, 'update')
                        sendVerificationEmail(userEmailAddress, verificationCode)
                        return;

                    }else if(res === 'pending'){

                        pendingInteraction(interaction, EmbedBuilder,'update')
                        return;

                    }else if(res === 'unverified'){
                        unverifiedInteraction(interaction, EmbedBuilder,'update')
                        return
                    }
                })
        }
    }

}

module.exports = {
    enrollmentEmailVerification
}