import { useEffect, useState } from "react";
import Icon from "./icon";

const links = [
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function getInitialTheme() {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <header className="site-header">
      <nav className="navbar shell" aria-label="Primary navigation">
        <a className="brand" href="/" data-route aria-label="Fariel Agiansyah home">FA<span>.</span></a>

        <div className="nav-desktop-wrap">
          <div className="nav-desktop">
            {links.map((link) => (
              <a key={link.href} href={link.href} data-route>{link.label}</a>
            ))}
          </div>

          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={() => setTheme((value) => value === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            <Icon name={theme === "light" ? "moon" : "sun"} size={17} />
          </button>
        </div>

        <button
          className="icon-button nav-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      <div className={"mobile-nav shell " + (open ? "is-open" : "")}>
        {links.map((link) => (
          <a key={link.href} href={link.href} data-route onClick={() => setOpen(false)}>
            {link.label}<Icon name="arrow" size={16} />
          </a>
        ))}

        <button
          className="icon-button theme-toggle"
          type="button"
          onClick={() => setTheme((value) => value === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          title={theme === "light" ? "Dark mode" : "Light mode"}
        >
          <Icon name={theme === "light" ? "moon" : "sun"} size={17} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
