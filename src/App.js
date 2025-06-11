import React from "react";
import { Link, Route, Routes } from "react-router";
import MasterSetup from "./page/UnitMaster";
import Orders from "./page/OrderForm";
import OrderList from "./page/OrderList.js";
import "./App.css"; // <- Add this line
import CalendarBoard from "./page/demo/index.js";

function App() {
  return (
    <div className="app-wrapper">
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">Master Setup</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/OrderList">OrderList</Link>
        <Link to="/calendar">Scheduler</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MasterSetup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/OrderList" element={<OrderList />} />
        <Route path="/calendar" element={<CalendarBoard />} />
      </Routes>
    </div>
  );
}

export default App;
