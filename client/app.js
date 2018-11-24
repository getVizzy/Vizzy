import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7cf5ff',
      main: '#3bc2ea',
      dark: '#0091b8',
      contrastText: '#000'
    },
    secondary: {
      light: '#59a9cf',
      main: '#1b7a9e',
      dark: '#004e6f',
      contrastText: '#ff'
    }
  }
})

const App = () => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <Routes />
      </MuiThemeProvider>
    </div>
  )
}

export default App
