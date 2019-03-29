const log = message => {
    let now = new Date();
    console.log(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] ${message}`);
};

module.exports = { log };
