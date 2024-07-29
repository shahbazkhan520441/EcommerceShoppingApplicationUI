
import { Outlet } from "react-router-dom"
import FooterComp from "../components/footer/FooterComp.jsx"
import HeaderComp from "../components/header/HeaderComp.jsx"


function App() {
  return (
    <div className="dark:bg-slate-900">
      <HeaderComp />
      <Outlet />
      <FooterComp/>
    </div>
  )
}

export default App