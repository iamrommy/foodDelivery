import React from "react";
import Onboard from "./pages/Onboard";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from './components/OpenRoute'

function App() {
  return (
    <div className="min-w-[260px] overflow-auto">
      <Routes>
        <Route path="/" element={<Onboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route 
          path="/signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />

        <Route path="/home">
          <Route path=":speed" element={<Home />} />
        </Route>

        <Route 
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }/>
      </Routes>
    </div>
  );
}

export default App;
