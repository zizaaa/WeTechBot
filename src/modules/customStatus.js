const { ActivityType } = require('discord.js');

function customStatus(){
    const status = [
        {
            name:'Visual Studio Code 💻',
            type:ActivityType.Playing
        },
        {
            name:'Dota 2 🎮',
            type:ActivityType.Playing
        },
        {
            name:'PyCharm 🐍',
            type:ActivityType.Playing
        },
        {
            name:'Spotify 🎶',
            type:ActivityType.Listening
        },
        {
            name:'Vivamax 🎥',
            type:ActivityType.Watching
        },
    ];

    const random = Math.floor(Math.random()*status.length)
    let activity = status[random]
    return activity
}

module.exports = {
    customStatus
}