exports.run = async (client,message,args) => {
    client.log('Sammutuskomento vastaanotettu. Sammutetaan.');
    try {
        await message.channel.send('Sammutetaan!'); // Odotetaan että viesti sammuttamisesta on saatu lähetettyä.
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
    client.destroy();
};

/*exports.run = (client,message,args) => {
    client.log('Sammutuskomento vastaanotettu. Sammutetaan.');
    message.channel.send('Sammutetaan!').then(() => {
        client.destroy();
    }).catch(err => console.log(err));
};*/

exports.help = {
    name: 'sammuta'
};
