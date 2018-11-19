import React from 'react'

import {Navbar} from './components'
import Sidebar from './components/Sidebar/Sidebar.js'
import Routes from './routes'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Sidebar />
      <Routes />
    </div>
  )
}

export default App
