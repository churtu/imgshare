const helpers = {};

helpers.randomName = () => {
    const possible = '0123456789abcdefghijklmnopqrstuvwxyz';
    let randomName = '';
    for(let i = 0; i < 6 ; i++){
        randomName += possible.charAt(Math.floor(Math.random()*possible.length))
    }
    return randomName;
}

module.exports = helpers;