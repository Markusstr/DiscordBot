exports.run = async (client,message,args) => {
    console.log('Sammutuskomento vastaanotettu. Sammutetaan.');
    await message.channel.send('Sammutetaan!'); // Odotetaan että viesti sammuttamisesta on saatu lähetettyä.
    client.destroy();
};

exports.help = {
    name: 'sammuta'
};