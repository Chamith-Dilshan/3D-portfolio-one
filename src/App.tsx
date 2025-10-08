//import PureJsImplementationTest from "./components/PureJsImplementationTest";
//import ReactThreeFiberDreiTest from "./components/ReactThreeFiberDreiTest";
import Hero from "./sections/Hero";
import "./index.css";
import Navbar from "./sections/Navbar";

function App() {
  return (
    <main>
      {/* <PureJsImplementationTest /> */}
      {/* <ReactThreeFiberDreiTest /> */}
      <Navbar />
      <Hero />
    </main>
  );
}

export default App;
