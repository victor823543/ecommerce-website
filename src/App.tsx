import './styles/global.css'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import { HoverProvider } from './context/HoverContext'
import DotFollower from './components/common/DotFollower/DotFollower'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductPage from './pages/ProductPage/ProductPage'
import CartPage from './pages/CartPage/CartPage'
import NavBar from './components/common/NavBar/NavBar'

const App = () => {
  return (
    <HoverProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products/:category?/:subcategory?' element={<ProductsPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      <DotFollower />
    </HoverProvider>
  )
}

export default App
