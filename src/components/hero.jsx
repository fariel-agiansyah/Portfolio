import Icon from "./icon";

function Hero(){
  return <section className="home-shell">
    <div className="hero-banner">
      <div className="hero-copy reveal">
        <p className="eyebrow">PORTFOLIO / PERSONAL SPACE / 2026</p>
        <h1><span className="hero-name-first">Fariel</span><span className="hero-name-last">Ag<strong>i</strong>ansyah.</span></h1>
        <p className="hero-lead">Visual designer, communication student, creative developer, and habitual builder of things that probably could have stayed as a spreadsheet.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="/works" data-route>Explore my work <Icon name="arrow" size={17}/></a>
          <a className="text-link" href="/diary" data-route>Read the diary <Icon name="arrow" size={16}/></a>
        </div>
      </div>
      <div className="hero-photo reveal">
        <div className="hero-photo-placeholder"><div><strong>YOUR PHOTO</strong><span>Drop your portrait in<br/>public/images/profile.jpg</span></div></div>
        <span className="photo-caption">M. Fariel Agiansyah / Yogyakarta</span>
      </div>
      <div className="hero-quick-grid">
        <div><span className="detail-label">Focus</span><strong>Design × Communication × Web</strong></div>
        <div><span className="detail-label">Currently</span><strong>Studying + designing + building</strong></div>
        <div><span className="detail-label">Based</span><strong>Yogyakarta / Magelang</strong></div>
        <div><span className="detail-label">Tools</span><strong>Photoshop · Figma · React · Vite</strong></div>
      </div>
    </div>

    <div className="home-feature-row">
      <div className="home-feature-intro"><p className="eyebrow">SELECTED / NOW</p><h2>Things currently<br/><span>taking up my screen.</span></h2><a className="text-link" href="/works" data-route>View the archive <Icon name="arrow" size={15}/></a></div>
      <a className="home-feature-card" href="/works/internary" data-route><span>01 / BUILD</span><h3>Internary</h3><p>Personal internship management system for schedules, tasks, attendance, reminders, and reporting.</p><Icon name="arrow" size={18}/></a>
      <a className="home-feature-card" href="/works/indihome-yogya" data-route><span>02 / DESIGN</span><h3>IndiHome Yogya</h3><p>Social media, promotional, and B2B visual communication developed during the HCOT internship.</p><Icon name="arrow" size={18}/></a>
    </div>

    <div className="home-strip">
      <div><span className="detail-label">Currently</span><strong>Studying Communication Science · Building things · Designing things</strong></div>
      <div><span className="detail-label">Based</span><strong>Yogyakarta / Magelang</strong></div>
      <div><span className="detail-label">Status</span><strong className="live-dot"><i/> Open to creative work</strong></div>
    </div>
    <div className="home-cards">
      <a href="/works" data-route className="home-card blue-card"><span>01</span><h2>Work archive</h2><p>Design, content, web, and products.</p><Icon name="arrow"/></a>
      <a href="/diary" data-route className="home-card"><span>02</span><h2>Diary</h2><p>Build logs, notes, lessons, and experiments.</p><Icon name="arrow"/></a>
      <a href="/about" data-route className="home-card"><span>03</span><h2>About me</h2><p>The person behind the pixels and code.</p><Icon name="arrow"/></a>
    </div>
  </section>
}
export default Hero;