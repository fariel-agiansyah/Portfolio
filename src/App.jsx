import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Works from "./pages/works";
import About from "./pages/about";
import Contact from "./pages/contact";
import ProjectDetail from "./pages/project-detail";

function getRoute() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());

    const handleClick = (event) => {
      const link = event.target.closest("a[data-route]");
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      window.history.pushState({}, "", url.pathname);
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const isHome = route === "/";
  const projectMatch = route.match(/^\/works\/([^/]+)$/);

  return (
    <>
      <Navbar />
      <main>
        {isHome && (
          <>
            <Hero />
            <Works preview />
            <About preview />
            <Contact />
          </>
        )}
        {route === "/works" && <Works />}
        {route === "/about" && <About />}
        {route === "/contact" && <Contact />}
        {projectMatch && <ProjectDetail slug={projectMatch[1]} />}
        {!isHome && !["/works", "/about", "/contact"].includes(route) && !projectMatch && (
          <section className="not-found section shell">
            <p className="eyebrow">404 / PAGE NOT FOUND</p>
            <h1>That page does not exist.</h1>
            <a className="button button-dark" href="/" data-route>Back home <span>↗</span></a>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
