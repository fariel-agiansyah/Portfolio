import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";

const emptyProject={slug:"",title:"",category:"",year:new Date().getFullYear(),description:"",role:"",stack:"",github_url:"",live_url:"",featured:false,published:false,sort_order:0};
const emptyDiary={slug:"",category:"Note",title:"",excerpt:"",body:"",tags:"",published:false};

function Admin(){
  const [session,setSession]=useState(null);
  const [tab,setTab]=useState("projects");
  const [projects,setProjects]=useState([]);
  const [diary,setDiary]=useState([]);
  const [profile,setProfile]=useState(null);
  const [project,setProject]=useState(emptyProject);
  const [post,setPost]=useState(emptyDiary);
  const [busy,setBusy]=useState(true);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    let mounted=true;
    async function boot(){
      const {data}=await supabase.auth.getSession();
      if(!mounted)return;
      if(!data.session){window.location.href="/admin/login";return;}
      setSession(data.session);
      await refresh();
      setBusy(false);
    }
    boot();
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));
    return()=>{mounted=false;subscription.unsubscribe()};
  },[]);

  async function refresh(){
    const [{data:p},{data:d},{data:pr}]=await Promise.all([
      supabase.from("projects").select("*").order("sort_order").order("created_at",{ascending:false}),
      supabase.from("diary_posts").select("*").order("created_at",{ascending:false}),
      supabase.from("site_profile").select("*").single()
    ]);
    setProjects(p||[]);setDiary(d||[]);setProfile(pr||null);
  }

  async function saveProject(e){
    e.preventDefault();setBusy(true);setMessage("");
    const payload={...project,year:Number(project.year)||null,sort_order:Number(project.sort_order)||0,stack:project.stack.split(",").map(x=>x.trim()).filter(Boolean)};
    const result=project.id
      ? await supabase.from("projects").update(payload).eq("id",project.id)
      : await supabase.from("projects").insert(payload);
    setMessage(result.error?.message||"Project saved.");
    if(!result.error){setProject(emptyProject);await refresh();}
    setBusy(false);
  }

  async function saveDiary(e){
    e.preventDefault();setBusy(true);setMessage("");
    const payload={...post,tags:post.tags.split(",").map(x=>x.trim()).filter(Boolean),published_at:post.published?new Date().toISOString():null};
    const result=post.id
      ? await supabase.from("diary_posts").update(payload).eq("id",post.id)
      : await supabase.from("diary_posts").insert(payload);
    setMessage(result.error?.message||"Diary saved.");
    if(!result.error){setPost(emptyDiary);await refresh();}
    setBusy(false);
  }

  async function remove(table,id){
    if(!window.confirm("Delete this item?"))return;
    const {error}=await supabase.from(table).delete().eq("id",id);
    setMessage(error?.message||"Deleted.");
    if(!error)await refresh();
  }

  async function saveProfile(e){
    e.preventDefault();setBusy(true);
    const {error}=await supabase.from("site_profile").update(profile).eq("id",1);
    setMessage(error?.message||"Profile saved.");setBusy(false);
  }

  if(!session||busy)return <section className="page-shell"><p className="eyebrow">ADMIN</p><h1>Loading control room...</h1></section>;

  return <section className="page-shell admin-page">
    <div className="admin-head">
      <div><p className="eyebrow">PRIVATE / ADMIN</p><h1>Portfolio control room.</h1><p>Signed in as {session.user.email}</p></div>
      <button className="button button-light" onClick={async()=>{await supabase.auth.signOut();window.location.href="/admin/login"}}>Sign out</button>
    </div>
    <div className="admin-tabs">
      {["projects","diary","profile"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}
    </div>
    {message&&<p className="admin-message">{message}</p>}

    {tab==="projects"&&<div className="admin-grid">
      <form className="admin-form admin-editor" onSubmit={saveProject}>
        <h2>{project.id?"Edit project":"New project"}</h2>
        <input placeholder="Title" value={project.title} onChange={e=>setProject({...project,title:e.target.value})} required/>
        <input placeholder="Slug" value={project.slug} onChange={e=>setProject({...project,slug:e.target.value})} required/>
        <input placeholder="Category" value={project.category} onChange={e=>setProject({...project,category:e.target.value})} required/>
        <input type="number" placeholder="Year" value={project.year} onChange={e=>setProject({...project,year:e.target.value})}/>
        <input placeholder="Role" value={project.role} onChange={e=>setProject({...project,role:e.target.value})}/>
        <input placeholder="Stack: Photoshop, Figma, React" value={project.stack} onChange={e=>setProject({...project,stack:e.target.value})}/>
        <input placeholder="GitHub URL" value={project.github_url} onChange={e=>setProject({...project,github_url:e.target.value})}/>
        <input placeholder="Live URL" value={project.live_url} onChange={e=>setProject({...project,live_url:e.target.value})}/>
        <textarea placeholder="Description" value={project.description} onChange={e=>setProject({...project,description:e.target.value})}/>
        <label className="check"><input type="checkbox" checked={project.featured} onChange={e=>setProject({...project,featured:e.target.checked})}/> Featured</label>
        <label className="check"><input type="checkbox" checked={project.published} onChange={e=>setProject({...project,published:e.target.checked})}/> Published</label>
        <div className="admin-actions"><button className="button button-dark" disabled={busy}>Save</button><button type="button" className="button button-light" onClick={()=>setProject(emptyProject)}>Clear</button></div>
      </form>
      <div className="admin-list">{projects.map(p=><article className="admin-item" key={p.id}><div><strong>{p.title}</strong><span>{p.category} · {p.published?"Published":"Draft"}</span></div><div><button onClick={()=>setProject({...p,stack:(p.stack||[]).join(", ")})}>Edit</button><button onClick={()=>remove("projects",p.id)}>Delete</button></div></article>)}</div>
    </div>}

    {tab==="diary"&&<div className="admin-grid">
      <form className="admin-form admin-editor" onSubmit={saveDiary}>
        <h2>{post.id?"Edit note":"New note"}</h2>
        <input placeholder="Title" value={post.title} onChange={e=>setPost({...post,title:e.target.value})} required/>
        <input placeholder="Slug" value={post.slug} onChange={e=>setPost({...post,slug:e.target.value})} required/>
        <input placeholder="Category" value={post.category} onChange={e=>setPost({...post,category:e.target.value})}/>
        <input placeholder="Tags: Design, Web" value={post.tags} onChange={e=>setPost({...post,tags:e.target.value})}/>
        <textarea placeholder="Excerpt" value={post.excerpt} onChange={e=>setPost({...post,excerpt:e.target.value})}/>
        <textarea className="tall" placeholder="Body" value={post.body} onChange={e=>setPost({...post,body:e.target.value})}/>
        <label className="check"><input type="checkbox" checked={post.published} onChange={e=>setPost({...post,published:e.target.checked})}/> Published</label>
        <div className="admin-actions"><button className="button button-dark" disabled={busy}>Save</button><button type="button" className="button button-light" onClick={()=>setPost(emptyDiary)}>Clear</button></div>
      </form>
      <div className="admin-list">{diary.map(p=><article className="admin-item" key={p.id}><div><strong>{p.title}</strong><span>{p.category} · {p.published?"Published":"Draft"}</span></div><div><button onClick={()=>setPost({...p,tags:(p.tags||[]).join(", ")})}>Edit</button><button onClick={()=>remove("diary_posts",p.id)}>Delete</button></div></article>)}</div>
    </div>}

    {tab==="profile"&&profile&&<form className="admin-form admin-editor profile-editor" onSubmit={saveProfile}>
      <h2>Profile</h2>
      <input value={profile.name||""} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="Name"/>
      <input value={profile.headline||""} onChange={e=>setProfile({...profile,headline:e.target.value})} placeholder="Headline"/>
      <textarea value={profile.bio||""} onChange={e=>setProfile({...profile,bio:e.target.value})} placeholder="Bio"/>
      <input value={profile.location||""} onChange={e=>setProfile({...profile,location:e.target.value})} placeholder="Location"/>
      <input value={profile.email||""} onChange={e=>setProfile({...profile,email:e.target.value})} placeholder="Email"/>
      <input value={profile.github_url||""} onChange={e=>setProfile({...profile,github_url:e.target.value})} placeholder="GitHub URL"/>
      <input value={profile.linkedin_url||""} onChange={e=>setProfile({...profile,linkedin_url:e.target.value})} placeholder="LinkedIn URL"/>
      <input value={profile.availability||""} onChange={e=>setProfile({...profile,availability:e.target.value})} placeholder="Availability"/>
      <button className="button button-dark" disabled={busy}>Save profile</button>
    </form>}
  </section>
}
export default Admin;
