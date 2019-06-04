let RDB = require('./index.js');

async function test() {
    let rdb = new RDB('localhost', 4126);
    await rdb.connect();

    let result = await rdb.run('keys');
    console.log(result);
}

test();