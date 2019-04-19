const userCooldown = new Set();

let connection;


async function koputa(client, message) {

    let VoiceChannel = message.guild.channels
        .filter(channel => channel.type === 'voice') // Suodatetaan vain äänikanavat
        .sort((a,b) => b.members.size-a.members.size) // Järjestetään laskevaan järjestykseen.
        .first(); // Otetaan ensimmäinen, tässä tapauksessa isoin.



    if(client.serverVariables.get(message.guild.id).isPlaying === true) {
        message.reply('Nyt on vähän kiire, kokeile myöhemmin uudelleen.');
        return;
    }

    if (VoiceChannel.full) {
        if (userCooldown.has(message.author.id)) {
            // Käyttäjällä on cooldown
            message.channel.send('Voit koputtaa kanavalle vain kerran 10 minuutissa. ' + message.author);

        } else {
            // Käyttäjällä ei ole cooldownia. Koputetaan!

            // Asetetaan cooldown
            userCooldown.add(message.author.id);
            setTimeout(() => {
                userCooldown.delete(message.author.id);
            }, 600000);

            connection = await VoiceChannel.join();
            client.serverVariables.get(message.guild.id).isPlaying = true;
            let dispatcher = connection.playFile('./sounds/koputus/kopkop.mp3');
            //let dispatcher = connection.playArbitraryInput('https://stream.bauermedia.fi/iskelma/iskelma_128.mp3');


            dispatcher.once('end', () => {
                connection.disconnect();
                client.serverVariables.get(message.guild.id).isPlaying = false;
            });

            dispatcher.on('error', e => {
                // Catch any errors that may arise
                console.log(e);
            });

        }
    } else {
        // Kanava ei ole täynnä.

        if (VoiceChannel.members.size === 0) {
            message.reply('*Koputuksesi kaikuvat tyhjillä kanavilla...* Kaikki kanavat ovat tyhjiä.');
        } else {
            message.reply('Kanava ei ole täynnä, voit liittyä sinne itse.');
        }

    }
}

module.exports = { koputa };



