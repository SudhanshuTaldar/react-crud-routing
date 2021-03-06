import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from './components/Users';
import Posts from './components/Posts';
import Home from './components/Home';
import FileUpload from "./components/FileUpload";
import Result from "./components/Result";
import PostReducer from "./components/PostReducer";
import UserReducer from "./components/UserReducer";
import CounterRedux from "./components/CounterRedux";
import CounterUseReducer from "./components/CounterUseReducer";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/file_upload" element={<FileUpload />} />
          <Route path="/result" element={<Result />} />
          <Route path="/postreducer" element={<PostReducer />} />
          <Route path="/userreducer" element={<UserReducer />} />
          <Route path="/counter" element={<CounterRedux />} />
          <Route path="/reducer_counter" element={<CounterUseReducer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
