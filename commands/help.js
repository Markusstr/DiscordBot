exports.run = (client,message,args) => {
    let viesti = 'Don Tamin komennot:\n\n\
    !3xPM joukkue - Näyttää 3xPM rakettiliigajoukkueen tilastot\n\
    !störblish määrä toisto - Hakee listasta satunnaisesti sanoja. Toistolla voidaan määrittää miten usein sama sana voi esiintyä.\n\;
    if (message.member.highestRole.id === '416306298045595669') {
        viesti = viesti.concat('\n\nYlläpidon komennot:\n!sammu');
    }
    message.channel.send(viesti);
};

exports.help = {
    name: 'help'
};