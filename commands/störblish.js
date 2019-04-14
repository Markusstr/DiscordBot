let sanat = [
    'störblärölä',
    'ströble',
    'stöbredä',
    'äströble',
    'strörde',
    'stöbrä',
    'störbrädörä',
    'ö',
    'ä',
    'stö',
    'ströblerna',
    'störbär',
    'storbstrob',
    'strölble',
    'öströbölö',
    'störblä',
    'ströbler'
];

exports.run = async (client,message,args) => {

    let numwords;
    let norepeat = 3;

    numwords = parseInt(args[0]);
    norepeat = parseInt(args[1]) || 3;
    if (isNaN(numwords) || numwords < 0 || isNaN(norepeat) || norepeat < 0) {
        await message.channel.send('Virhe komennossa.\nKomennon käyttö: !störblish <sanojen määrä: numero> [norepeat: numero (oletuksena 3)]\nEsim. !störblish 20 3');
        return;
    }

    if (numwords < 1 || numwords > 100) {
        await message.channel.send('Sanojen määrä on oltava väliltä 1 - 100');
        return;
    }

    if (norepeat >= sanat.length) {
        await message.channel.send(`norepeat ei voi olla sama tai suurempi, kuin sanojen määrä listassa (${sanat.length} sanaa).`);
        return;
    }

    // Tarkistukset käyty läpi. Lähetetään viesti
    try {
        message.channel.send(generateText(sanat, numwords, norepeat));
    } catch (error) {
        message.channel.send('Tapahtui sisäinen virhe. Kokeile joitakin toisia arvoja.');
    }
    

};

exports.help = {
    name: 'störblish'
};


/**
 * Generate random integer between given values.
 * @param {Number} min 
 * @param {Number} max 
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


/**
 * Generate string of random words from an array of available words.
 * @param {Array<String>} words List of available words
 * @param {Number} numwords Number of words wanted
 * @param {Number} norepeat Size of the word history. Will not use words contained in it.
 * @returns {String} String of words separated by spaces.
 */
function generateText(words, numwords = 10, norepeat = 0) {

    if (words == undefined) {
        throw new Error('You need to provide an array of strings in order for the function to work.');
    } else if (!Array.isArray(words)) {
        throw new Error('First parameter must be an array of strings.');
    } else if (words.length === 0) {
        throw new Error('Array of words cannot be empty.');
    }

    if (numwords == undefined) {
        throw new Error('numwords was undefined. Check your function parameters.');
    } else if (typeof numwords !== 'number') {
        throw new Error('numwords needs to be a number');
    } else if (numwords < 1) {
        throw new Error('Number of words cannot be less than 1.');
    }

    if (norepeat == undefined) {
        throw new Error('norepeat was undefined. Check your function parameters.');
    } else if (typeof norepeat !== 'number') {
        throw new Error('norepeat needs to be a number');
    } else if (norepeat < 0) {
        throw new Error('norepeat cannot be less than 0.');
    } else if (norepeat > words.length) {
        throw new Error('norepeat cannot exceed the number of words in the wordlist.');
    }

    let i = 0;
    let text = '';
    let lastwords = [];

    while (i < numwords) {
        let randomnum = getRndInteger(0, words.length);
        if (lastwords.includes(randomnum)) continue;

        text = text.concat(`${words[randomnum]} `);
        lastwords.push(randomnum);
        if (lastwords.length > norepeat) lastwords.splice(0, lastwords.length - norepeat);
        i++;
    }

    return text;

}
