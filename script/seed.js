'use strict'

const db = require('../server/db')
const {User, Dashboard, Graph, Data} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  // const dashboards = await Promise.all([
  //   Dashboard.create({
  //     roomKey: 'abc',
  //     userId: 1
  //   }),
  //   Dashboard.create({
  //     roomKey: 'def',
  //     userId: 1
  //   }),
  //   Dashboard.create({
  //     roomKey: 'abc',
  //     userId: 2
  //   })
  // ])

  const data = await Promise.all([
    Data.create({
      dashboardId: 1,
      dataJSON: [
        {x: 1, y: 2},
        {x: 2, y: 2},
        {x: 3, y: 4},
        {x: 4, y: 3},
        {x: 5, y: 4.5},
        {x: 6, y: 4.5},
        {x: 7, y: 7},
        {x: 8, y: 10}
      ]
    })
  ])
  // const graph = await Promise.all([
  //   Graph.create({
  //     dashboardId: 1,
  //     svgString:
  //       '<svg id="svg" width="400" height="400"><g transform="translate(30,30)"><g class="x axis" transform="translate(0, 340)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle"><path class="domain" stroke="currentColor" d="M0.5,6V0.5H340.5V6"></path><g class="tick" opacity="1" transform="translate(0.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">0</text></g><g class="tick" opacity="1" transform="translate(43,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">1</text></g><g class="tick" opacity="1" transform="translate(85.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">2</text></g><g class="tick" opacity="1" transform="translate(128,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">3</text></g><g class="tick" opacity="1" transform="translate(170.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">4</text></g><g class="tick" opacity="1" transform="translate(213,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">5</text></g><g class="tick" opacity="1" transform="translate(255.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">6</text></g><g class="tick" opacity="1" transform="translate(298,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">7</text></g><g class="tick" opacity="1" transform="translate(340.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">8</text></g></g><g class="y axis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end"><path class="domain" stroke="currentColor" d="M-6,340.5H0.5V0.5H-6"></path><g class="tick" opacity="1" transform="translate(0,340.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">0</text></g><g class="tick" opacity="1" transform="translate(0,306.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">1</text></g><g class="tick" opacity="1" transform="translate(0,272.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">2</text></g><g class="tick" opacity="1" transform="translate(0,238.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">3</text></g><g class="tick" opacity="1" transform="translate(0,204.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">4</text></g><g class="tick" opacity="1" transform="translate(0,170.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">5</text></g><g class="tick" opacity="1" transform="translate(0,136.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">6</text></g><g class="tick" opacity="1" transform="translate(0,102.50000000000003)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">7</text></g><g class="tick" opacity="1" transform="translate(0,68.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">8</text></g><g class="tick" opacity="1" transform="translate(0,34.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">9</text></g><g class="tick" opacity="1" transform="translate(0,0.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">10</text></g></g><circle cx="42.5" cy="272" r="4" fill="#fc8d59"></circle><circle cx="85" cy="272" r="4" fill="#fc8d59"></circle><circle cx="127.5" cy="204" r="4" fill="#fc8d59"></circle><circle cx="170" cy="238" r="4" fill="#fc8d59"></circle><circle cx="212.5" cy="187" r="4" fill="#fc8d59"></circle><circle cx="255" cy="187" r="4" fill="#fc8d59"></circle><circle cx="297.5" cy="102.00000000000003" r="4" fill="#fc8d59"></circle><circle cx="340" cy="0" r="4" fill="#fc8d59"></circle></g></svg>'
  //   }),
  //   Graph.create({
  //     dashboardId: 1,
  //     svgString:
  //       '<svg id="svg" width="400" height="400"><g transform="translate(30,30)"><g class="x axis" transform="translate(0, 340)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle"><path class="domain" stroke="currentColor" d="M0.5,6V0.5H340.5V6"></path><g class="tick" opacity="1" transform="translate(0.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">0</text></g><g class="tick" opacity="1" transform="translate(43,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">1</text></g><g class="tick" opacity="1" transform="translate(85.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">2</text></g><g class="tick" opacity="1" transform="translate(128,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">3</text></g><g class="tick" opacity="1" transform="translate(170.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">4</text></g><g class="tick" opacity="1" transform="translate(213,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">5</text></g><g class="tick" opacity="1" transform="translate(255.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">6</text></g><g class="tick" opacity="1" transform="translate(298,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">7</text></g><g class="tick" opacity="1" transform="translate(340.5,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">8</text></g></g><g class="y axis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end"><path class="domain" stroke="currentColor" d="M-6,340.5H0.5V0.5H-6"></path><g class="tick" opacity="1" transform="translate(0,340.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">0</text></g><g class="tick" opacity="1" transform="translate(0,306.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">1</text></g><g class="tick" opacity="1" transform="translate(0,272.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">2</text></g><g class="tick" opacity="1" transform="translate(0,238.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">3</text></g><g class="tick" opacity="1" transform="translate(0,204.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">4</text></g><g class="tick" opacity="1" transform="translate(0,170.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">5</text></g><g class="tick" opacity="1" transform="translate(0,136.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">6</text></g><g class="tick" opacity="1" transform="translate(0,102.50000000000003)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">7</text></g><g class="tick" opacity="1" transform="translate(0,68.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">8</text></g><g class="tick" opacity="1" transform="translate(0,34.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">9</text></g><g class="tick" opacity="1" transform="translate(0,0.5)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">10</text></g></g><circle cx="42.5" cy="272" r="4" fill="blue"></circle><circle cx="85" cy="272" r="4" fill="blue"></circle><circle cx="127.5" cy="204" r="4" fill="blue"></circle><circle cx="170" cy="238" r="4" fill="blue"></circle><circle cx="212.5" cy="187" r="4" fill="blue"></circle><circle cx="255" cy="187" r="4" fill="blue"></circle><circle cx="297.5" cy="102.00000000000003" r="4" fill="blue"></circle><circle cx="340" cy="0" r="4" fill="blue"></circle></g></svg>'
  //   })
  // ])

  console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${dashboards.length} dashboards`)
  console.log(`seeded ${data.length} data`)
  // console.log(`seeded ${graph.length} graphs`)
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
