import './App.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
