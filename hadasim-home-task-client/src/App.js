
import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import User from './components/user/User';
import UsersList from './components/usersList/UsersList';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<UsersList />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
