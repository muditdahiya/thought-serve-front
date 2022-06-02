import { React, Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./Main.css";

//Components
import Create from "../../components/Create/Create";
import PostID from "../../components/PostID/PostID";

//Conatiners
import Home from "../Home/Home";

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="posts/:id" element={<PostID />} />
        </Routes>
      </div>
    );
  }
}

export default Main;
