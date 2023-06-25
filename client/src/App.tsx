import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import { NavBar } from './components/NavBar'
import './App.css'
import { Home } from './components/Home'

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
