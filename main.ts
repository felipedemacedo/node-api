import {Server} from './server/server'
import {usersRouter} from './users/users.router'
import {infoRouter} from './info/info.router'

const server = new Server()

server.bootstrap([usersRouter, infoRouter]).then(server=>{
  console.log('Server is listening on: ' + server.application.address())
}).catch(error=>{
  console.log('server failed to start')
  console.log(error)
  process.exit(1)
})