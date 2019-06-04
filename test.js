let RDB = require('./index.js');

async function test() {
    let rdb = new RDB();
    await rdb.connect('localhost', 4126);

    let result = await rdb.keys();
    console.log(result);
    rdb.disconnect();
}

test();
