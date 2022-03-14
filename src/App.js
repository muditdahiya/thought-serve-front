import "./App.css";

//components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//containers
import Main from "./containers/Main/Main";

//packages
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
