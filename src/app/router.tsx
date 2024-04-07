import { Route, Routes } from "react-router-dom"
import Calculator from "./components/calculator/calculator"
import Home from "./components/home/home"
import Rates from "./components/rates/rates"

export function Router() {
    return (
      <Routes>
        <Route path='/calculator' element={<Calculator />} />
        <Route path='/exchange-rates' element={<Rates />} />
        <Route path='/' element={<Home />} />
      </Routes>
    )
}

export default Router