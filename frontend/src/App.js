import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {
    return (
        <div className="App">
            <h1>Welcome to flashplus</h1>
            <Header/>
            <Outlet/>
            <Footer/>
            
        </div>
    );
}

export default App;
