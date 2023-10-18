const { EmbedBuilder } = require('discord.js');
const roleRequest = require('../../model/roleRequest')
const { updateRequestRole } = require('./interactionsModules/updateRequestRole')
function capitalizeWords(input) {
    // Split the input string into words
    const words = input.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        // Ensure the word is not empty
        if (word.length === 0) {
            return '';
        }

        // Capitalize the first letter and make the rest of the word lowercase
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();

        return firstLetter + restOfWord;
    });

    // Join the capitalized words back into a single string
    const result = capitalizedWords.join(' ');

    return result;
}
async function roleApproval(interaction){
    const [type,action] = interaction.customId.split('_role_');
    const { guild } = interaction;

    const data = await roleRequest.find()

        if(!data){
            await interaction.reply({
                embeds:[
                    {
                        description:'No Data Available'
                    }
                ],
                ephemeral: true
            })
            return;
        }

    const requestNumber = interaction.fields.getTextInputValue('requested_role_approval');

    const requestInfo = data[requestNumber - 1];

        if(!requestInfo){

            await updateRequestRole(data, interaction, EmbedBuilder)

            await interaction.followUp({
                embeds:[
                    {
                        description:'No data available!'
                    }
                ],
                ephemeral: true
            })
            return;
        }

    const newrequestInfo = {
        user:{...requestInfo.user},
        role:capitalizeWords(requestInfo.role),
        status:requestInfo.status
    }

    //check if the status is pending
    if(newrequestInfo.status !== 'Pending'){
        await interaction.reply({
            embeds:[
                {
                    description:'This request is already resolved'
                }
            ],
            ephemeral: true
        })
        return;
    }

    if (action === 'approve') {

        if (!newrequestInfo) {
            await interaction.reply(`Invalid request number.`);
            return;
        }

        const randomColor = Math.floor(Math.random()*16777215).toString(16); // Generate a random color code

        let role = guild.roles.cache.find(role => role.name.toLowerCase() === newrequestInfo.role.toLowerCase());
        if (!role) {
            // Create the role if it doesn't exist
            role = await guild.roles.create({
                name: newrequestInfo.role,
                color: randomColor, // Set the random color
                permissions: [],
            });
        }

        const requester = guild.members.cache.get(newrequestInfo.user.id);

        if (requester) {
            await requester.roles.add(role);
            requestInfo.status = '✔️ Approved'
            await requestInfo.save();
        } else {
            await interaction.reply(`Error: Requester not found.`);
            return;
        }

        // Display the list of pending roles
        updateRequestRole(data, interaction, EmbedBuilder)
    }
    
    if (action === 'disapprove') {
        if (isNaN(requestNumber) || requestNumber <= 0 || requestNumber > data.length) {
            await interaction.reply(`Invalid request number.`);
            return;
        }

        requestInfo.status = '❌ Disapproved'
        await requestInfo.save()
        updateRequestRole(data, interaction, EmbedBuilder)
    }
}

module.exports = {
    roleApproval
}