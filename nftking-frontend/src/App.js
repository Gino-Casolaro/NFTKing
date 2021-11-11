import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPortfolio from "./components/add-portfolio.component";
import Portfolio from "./components/portfolio.component";
import PortfoliosList from "./components/portfolios-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/portfolios"} className="navbar-brand">
            NFTKing
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/portfolios"} className="nav-link">
                Portfolios
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<PortfoliosList />} />
            <Route path="/portfolios" element={<PortfoliosList />} />
            <Route path="/add" element={<AddPortfolio />} />
            <Route path="/portfolios/:id" element={<Portfolio />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;