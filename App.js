import React from 'react';
import { GlobalContextProvider } from './providers/GlobalContext'
import AppNavigation from './Navigation/Navigation'

const App = () => (
  <GlobalContextProvider>
    <AppNavigation />
  </GlobalContextProvider>
)

export default App;