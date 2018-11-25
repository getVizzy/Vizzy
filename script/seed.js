'use strict'

const db = require('../server/db')
const { User, Graph, Data } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      roomKey: 'z4plhajjdv1ilwqll2'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      roomKey: 'g81isr2p42d0jsmw4a'
    }),
    User.create({
      email: 'nancy@email.com',
      password: '123',
      roomKey: 'nxvc5d709aaql014nh'
    }),
    User.create({
      email: 'adrienne@email.com',
      password: '123',
      roomKey: 'ak94wupewx4ja1ipml'
    }),
    User.create({
      email: 'grace@email.com',
      password: '123',
      roomKey: 'gztts6t9sif67j4whp'
    }),
    User.create({
      email: 'erica@email.com',
      password: '123',
      roomKey: 'ea7gl0qjd3i1omw1fp'
    })
  ])

  const data = await Promise.all([
    Data.create({
      userId: 1,
      name: 'DatasetOne',
      dataJSON: {
        data: [
          { x: '1', y: '2' },
          { x: '2', y: '2' },
          { x: '3', y: '4' },
          { x: '4', y: '3' },
          { x: '5', y: '4.5' },
          { x: '6', y: '4.5' },
          { x: '7', y: '7' },
          { x: '8', y: '10' }
        ],
        name: "Seed Data"
      }
    })
  ])

  const graph = await Promise.all([
    Graph.create({
      userId: 1,
      properties: {
        graphSelected: 'bar',
        color: 'tomato',
        title: 'Test Graph',
        highlight: 'orange',
        tooltip: '5',
        x: 'x',
        y: 'y',
        dataId: 1
      },
      datumId: 1
    }),
    Graph.create({
      userId: 1,
      properties: {
        graphSelected: 'scatter',
        color: 'salmon',
        title: 'Another Test Graph',
        highlight: 'periwinkle',
        tooltip: '5',
        x: 'y',
        y: 'x',
        dataId: 1
      },
      datumId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${data.length} data`)
  console.log(`seeded ${graph.length} graphs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
