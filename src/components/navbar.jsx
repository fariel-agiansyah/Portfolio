import { useState } from "react";
import Icon from "./icon";

const links = [
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar shell" aria-label="Primary navigation">
        <a className="brand" href="/" data-route aria-label="Fariel Agiansyah home">FA<span>.</span></a>
        <div className="nav-desktop">
          {links.map((link) => <a key={link.href} href={link.href} data-route>{link.label}</a>)}
        </div>
        <button className="icon-button nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>
      <div className={"mobile-nav shell " + (open ? "is-open" : "")}>
        {links.map((link) => (
          <a key={link.href} href={link.href} data-route onClick={() => setOpen(false)}>
            {link.label}<Icon name="arrow" size={16} />
          </a>
        ))}
      </div>
    </header>
  );
}

export default Navbar;
