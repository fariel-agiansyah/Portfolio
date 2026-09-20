import { useMemo, useState } from "react";
import Icon from "../components/icon";
import diary from "../data/diary";

const PAGE_SIZE = 3;

function Diary() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const categories = ["All", ...new Set(diary.map((entry) => entry.category))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return diary.filter((entry) => {
      const matchesCategory = category === "All" || entry.category === category;
      const haystack = [entry.title, entry.category, entry.excerpt, entry.body, ...(entry.tags || [])].join(" ").toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [query, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const changeQuery = (value) => { setQuery(value); setPage(1); };
  const changeCategory = (value) => { setCategory(value); setPage(1); };

  return <section className="page-shell">
    <div className="page-intro">
      <div><p className="eyebrow">03 / DIARY</p><h1>Notes from the<br/><span>things I’m building.</span></h1></div>
      <p className="page-intro-copy">A personal corner for build logs, design notes, lessons, experiments, and thoughts that deserve more than a disappearing chat message.</p>
    </div>

    <div className="search-panel">
      <label className="search-box">
        <Icon name="search" size={17}/>
        <input value={query} onChange={(e) => changeQuery(e.target.value)} placeholder="Search diary, tags, or topics..." aria-label="Search diary"/>
      </label>
      <select className="filter-select" value={category} onChange={(e) => changeCategory(e.target.value)} aria-label="Filter diary">
        {categories.map((item) => <option key={item}>{item}</option>)}
      </select>
    </div>
    <p className="results-note">{filtered.length} note{filtered.length === 1 ? "" : "s"} found</p>

    {visible.length ? <div className="diary-grid">{visible.map((entry, i) => <article className="diary-card" key={entry.id} onClick={() => setSelected(entry)} tabIndex="0" role="button" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(entry); }}>
      <div className="diary-card-top"><span>{String((safePage - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}</span><span>{entry.category}</span></div>
      <div><h2>{entry.title}</h2><p>{entry.excerpt}</p></div>
      <div className="diary-card-bottom"><div className="tag-list">{entry.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><Icon name="arrow" size={18}/></div>
    </article>)}</div> : <div className="empty-state">No diary notes match that search.</div>}

    {pageCount > 1 && <div className="pagination" aria-label="Diary pagination">
      <button className="page-button" disabled={safePage === 1} onClick={() => setPage(safePage - 1)} aria-label="Previous page">←</button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => <button key={number} className={number === safePage ? "page-button active" : "page-button"} onClick={() => setPage(number)}>{number}</button>)}
      <button className="page-button" disabled={safePage === pageCount} onClick={() => setPage(safePage + 1)} aria-label="Next page">→</button>
    </div>}

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
      <article className="diary-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><Icon name="close"/></button>
        <p className="eyebrow">{selected.category}</p>
        <h2>{selected.title}</h2>
        <p className="modal-body">{selected.body}</p>
        <div className="tag-list">{selected.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
      </article>
    </div>}
  </section>;
}

export default Diary;
