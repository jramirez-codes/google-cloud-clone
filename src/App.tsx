import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import { Layout } from "./components/Layout"
import Home from "./pages/Home/Home"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Routes>
      {/* <Layout>
      </Layout> */}
    </Router>
  )
}

export default App

