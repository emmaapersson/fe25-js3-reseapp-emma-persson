import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import CountryDetailsPage from './Pages/CountryDetailsPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/country/:code' element={<CountryDetailsPage/>} />
    </Routes>
  )
}

export default App