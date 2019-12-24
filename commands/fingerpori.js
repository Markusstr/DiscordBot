const got = require('got');

exports.run = (client,message,args) => {

    let haluttusarjis;

    if (args.length === 0) { // Jos argumentteja ei ole annettu.
        haluttusarjis = 0;
    } else {

        haluttusarjis = parseInt(args[0]);
        if (isNaN(haluttusarjis) || haluttusarjis < 0) {
            message.channel.send('Virhe komennossa.\nKomennon käyttö: !fingerpori <paljonko taaksepäin: numero [0-9]>\nEsim. !fingerpori 2');
            return;
        }

        if(args[0] >= 0 && args[0] <= 9) {
            haluttusarjis = args[0];
        } else {
            message.channel.send('Virhe komennossa.\nKomennon käyttö: !fingerpori <paljonko taaksepäin: numero [0-9]>\nEsim. !fingerpori 2');
            return;
        }
    }


    got('http://angryaxi.mbnet.fi/fingerporiapi/api.json').then(response => {
        let fingerpori = JSON.parse(response.body);
        message.channel.send({
            'embed': {
                'title': 'Klikkaa suuremmaksi! 🔎',
                'color': 15233546,
                'footer': {
                    'text': '© Pertti Jarla'
                },
                'image': {
                    'url': fingerpori.comics[haluttusarjis].url
                },
                'author': {
                    'name': 'Fingerpori ' + fingerpori.comics[haluttusarjis].date
                }
            }
        });
    }).catch(error => {
        console.log(error);
    });

};

exports.help = {
    name: 'fingerpori'
};