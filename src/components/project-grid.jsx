import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import Icon from "./icon";
import projectsSeed from "../data/projects";
import ProjectCard from "./project-card";

const PAGE_SIZE=4;

function ProjectGrid({featuredOnly=false}){
  const [projects,setProjects]=useState(projectsSeed);
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All");
  const [page,setPage]=useState(1);

  useEffect(()=>{
    if(!isSupabaseConfigured)return;
    let active=true;
    (async()=>{
      const {data,error}=await supabase.from("projects").select("*").eq("published",true).order("sort_order").order("created_at",{ascending:false});
      if(!active||error||!data)return;
      setProjects(data.map(p=>({...p,id:p.id,image:p.cover_path||"",stack:p.stack||[],githubUrl:p.github_url||"",liveUrl:p.live_url||""})));
    })();
    return()=>{active=false};
  },[]);

  const source=featuredOnly?projects.filter(p=>p.featured):projects;
  const categories=["All",...new Set(source.map(p=>p.category))];
  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return source.filter(project=>{
      const matchesCategory=category==="All"||project.category===category;
      const haystack=[project.title,project.category,project.description,project.role,...(project.stack||[])].join(" ").toLowerCase();
      return matchesCategory&&(!q||haystack.includes(q));
    });
  },[source,query,category]);
  const pageCount=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const safePage=Math.min(page,pageCount);
  const visible=filtered.slice((safePage-1)*PAGE_SIZE,safePage*PAGE_SIZE);
  const changeQuery=v=>{setQuery(v);setPage(1)};
  const changeCategory=v=>{setCategory(v);setPage(1)};

  return <>
    <div className="search-panel">
      <label className="search-box"><Icon name="search" size={17}/><input value={query} onChange={e=>changeQuery(e.target.value)} placeholder="Search projects, tools, or roles..." aria-label="Search projects"/></label>
      <select className="filter-select" value={category} onChange={e=>changeCategory(e.target.value)} aria-label="Filter projects">{categories.map(item=><option key={item}>{item}</option>)}</select>
    </div>
    <p className="results-note">{filtered.length} project{filtered.length===1?"":"s"} found</p>
    {visible.length?<div className="project-grid">{visible.map(project=><ProjectCard key={project.id} project={project}/>)}</div>:<div className="empty-state">No projects match that search.</div>}
    {pageCount>1&&<div className="pagination" aria-label="Project pagination"><button className="page-button" disabled={safePage===1} onClick={()=>setPage(safePage-1)}>←</button>{Array.from({length:pageCount},(_,i)=>i+1).map(number=><button key={number} className={number===safePage?"page-button active":"page-button"} onClick={()=>setPage(number)}>{number}</button>)}<button className="page-button" disabled={safePage===pageCount} onClick={()=>setPage(safePage+1)}>→</button></div>}
  </>;
}
export default ProjectGrid;
