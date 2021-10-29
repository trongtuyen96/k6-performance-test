function randomString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    while (length--) res += charset[Math.random() * charset.length | 0];
    return res;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomColor() {
    let color = ['Red', 'Green', 'Blue', 'White', 'Black', 'Yellow'];
    return color[Math.floor(Math.random() * 5)];
}

function randomAnimal() {
    return {
        "species": `Animal ${randomString(5)}`,
        "lifespan": `${randomNumber(10, 20)}`,
        "name": `Name ${randomString(5)}`,
        "color": `${randomColor()}`,
        "weight": `${randomNumber(1, 20)}`,
        // This was manually get from ATWT Zoo endpoints
        "zooID": "5e958ec5ed1bd7000401ab0c"
    };
}

module.exports = {randomString, randomNumber, randomColor, randomAnimal}