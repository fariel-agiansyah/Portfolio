function About({ preview = false }) {
  return (
    <section id="about" className="section shell about">
      <div className="section-heading reveal"><p className="eyebrow">02 / ABOUT</p><h2>Design first, technology where it helps.</h2></div>
      <div className="about-grid">
        <div className="about-statement reveal"><p>I work across visual design and front-end development, with a focus on communication, layout, typography, and practical digital experiences.</p></div>
        <div className="about-details reveal reveal-delay">
          <div><span className="detail-label">Focus</span><p>Visual Design<br />Web Design<br />Creative Development</p></div>
          <div><span className="detail-label">Tools</span><p>Photoshop<br />React / Vite<br />Supabase</p></div>
          {!preview && <div><span className="detail-label">Currently</span><p>Building a personal portfolio and documenting selected work.</p></div>}
        </div>
      </div>
    </section>
  );
}

export default About;
