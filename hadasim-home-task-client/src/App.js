
import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import User from './components/user/User';
import UsersList from './components/usersList/UsersList';
import './App.scss';

function App() {
  console.log("test");
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<UsersList />}> */}
          <Route index element={<UsersList />} />
        <Route path="/user" element={<User />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
