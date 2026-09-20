import Icon from "../components/icon";

function Contact() {
  return (
    <section id="contact" className="contact section shell">
      <div className="contact-inner reveal">
        <p className="eyebrow">03 / CONTACT</p>
        <h2>Have a project in mind?</h2>
        <p>For design work, web projects, collaborations, or just a useful conversation, you can reach me here.</p>
        <a className="button button-light" href="mailto:hello@example.com">Get in touch <Icon name="arrow" size={17} /></a>
      </div>
      <footer className="site-footer"><span>© 2026 M Fariel Agiansyah</span><span>Yogyakarta, Indonesia</span></footer>
    </section>
  );
}

export default Contact;
