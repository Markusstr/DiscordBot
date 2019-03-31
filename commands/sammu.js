exports.run = async (client,message,args) => {
    if (message.member.highestRole.id === '416306298045595669') {
        client.log('Sammutuskomento vastaanotettu. Sammutetaan.');
        try {
            await message.channel.send('Sammutetaan!'); // Odotetaan että viesti sammuttamisesta on saatu lähetettyä.
        }
        catch(err) {
            console.log(`Error: ${err}`);
        }
        client.destroy();
    }
    else {
        message.channel.send('Sinulla ei ole oikeutta suorittaa tätä komentoa <:DonTami:558001555186647040>');
    }
};

/*exports.run = (client,message,args) => {
    client.log('Sammutuskomento vastaanotettu. Sammutetaan.');
    message.channel.send('Sammutetaan!').then(() => {
        client.destroy();
    }).catch(err => console.log(err));
};*/

exports.help = {
    name: 'sammu'
};
