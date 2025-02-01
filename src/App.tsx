import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Layout } from "./components/layout"
import Home from "./pages/Home/Home"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

