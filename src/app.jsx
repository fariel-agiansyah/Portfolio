import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Works from "./pages/works";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Works />
      </main>
    </>
  );
}

export default App;
