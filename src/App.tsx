import './styles/global.css'
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import { HoverProvider } from './context/HoverContext'
import DotFollower from './components/common/DotFollower/DotFollower'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductPage from './pages/ProductPage/ProductPage'
import CartPage from './pages/CartPage/CartPage'

const App = () => {
  return (
    <HoverProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/counter" element={<Counter />} /> 
        <Route path="/quotes" element={<Quotes />} /> 
        <Route path='/products/:category?/:subcategory?' element={<ProductsPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      <DotFollower />
    </HoverProvider>
  )
}

export default App
