import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Landing from './screens/Landing'
import Editor from './screens/Editor'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/build" element={<Editor />} />
      </Routes>
    </Router>
  )
}

export default App
