const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

async function main () {
    // open the database
    const db = await open({
      filename: './tmp/database.db',
      driver: sqlite3.Database
    })

    await db.exec(`CREATE TABLE records (
        id varchar(255),
        type varchar(255),
        name varchar(255)
    )`)

    await db.exec(`CREATE TABLE record_tag_links (
        id varchar(255),
        tag varchar(255)
    )`)

    await db.exec(`CREATE TABLE tags (
        name varchar(255)
    )`)

    const promises = []
    for (let i = 1; i < 100; ++i) {
        promises.push(db.exec(`INSERT INTO records(id, type, name) VALUES('${i}', 'test', 'test ${i}')`))
        promises.push(db.exec(`INSERT INTO record_tag_links(id, tag) VALUES('${i}', 'test')`))
    }
    promises.push(db.exec(`INSERT INTO tags(name) VALUES('test')`))
    await Promise.all(promises)
}

main()