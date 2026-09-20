import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";

const emptyProject={slug:"",title:"",category:"",year:new Date().getFullYear(),description:"",role:"",stack:"",github_url:"",live_url:"",featured:false,published:false,sort_order:0};
const emptyDiary={slug:"",category:"Note",title:"",excerpt:"",body:"",tags:"",published:false,cover_path:""};
const BUCKET="portfolio-media";
const MAX_FILE_SIZE=20*1024*1024;
const ACCEPTED_TYPES=["image/jpeg","image/png","image/webp","image/gif","image/svg+xml","video/mp4","application/pdf"];
function slugify(value){return String(value||"file").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,70)||"file"}
function fileExt(file){return (file.name?.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,8)||"bin"}
function publicUrl(path){return path?.startsWith("http")?path:path?supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl:""}
function UploadBox({label,accept="image/*",multiple=false,onFiles,help}){
  return <label className="admin-upload"><span className="admin-upload-title">{label}</span><input type="file" accept={accept} multiple={multiple} onChange={e=>{onFiles(Array.from(e.target.files||[]));e.target.value=""}}/><span className="admin-upload-button">Choose file{multiple?"s":""}</span>{help&&<small>{help}</small>}</label>
}

function Admin(){
  const [session,setSession]=useState(null);
  const [tab,setTab]=useState("projects");
  const [projects,setProjects]=useState([]);
  const [diary,setDiary]=useState([]);
  const [profile,setProfile]=useState(null);
  const [project,setProject]=useState(emptyProject);
  const [post,setPost]=useState(emptyDiary);
  const [coverFile,setCoverFile]=useState(null);
  const [diaryCoverFile,setDiaryCoverFile]=useState(null);
  const [portraitFile,setPortraitFile]=useState(null);
  const [media,setMedia]=useState([]);
  const [mediaBusy,setMediaBusy]=useState(false);
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
      supabase.from("site_profile").select("*").single(),
      supabase.from("media").select("*").order("created_at",{ascending:false})
    ]);
    setProjects(p||[]);setDiary(d||[]);setProfile(pr||null);setMedia(m||[]);
  }

  async function uploadFile(file,path){
    if(file.size>MAX_FILE_SIZE)throw new Error("File is larger than 20 MB.");
    if(!ACCEPTED_TYPES.includes(file.type))throw new Error("Unsupported file type.");
    const {data,error}=await supabase.storage.from(BUCKET).upload(path,file,{contentType:file.type,cacheControl:"31536000",upsert:false});
    if(error)throw error;
    return data.path;
  }

  async function saveProject(e){
    e.preventDefault();setBusy(true);setMessage("");
    try{
      let cover_path=project.cover_path||null;
      if(coverFile)cover_path=await uploadFile(coverFile,"projects/"+slugify(project.slug||project.title)+"/cover-"+Date.now()+"."+fileExt(coverFile));
      const payload={...project,cover_path,year:Number(project.year)||null,sort_order:Number(project.sort_order)||0,stack:project.stack.split(",").map(x=>x.trim()).filter(Boolean)};
      delete payload.coverFile;
    const result=project.id
      ? await supabase.from("projects").update(payload).eq("id",project.id)
      : await supabase.from("projects").insert(payload);
      if(result.error)throw result.error;
      setMessage("Project saved.");
      setProject(emptyProject);setCoverFile(null);await refresh();
    }catch(error){setMessage(error.message||"Project save failed.");}
    finally{setBusy(false);}
  }

  async function saveDiary(e){
    e.preventDefault();setBusy(true);setMessage("");
    try{
      let cover_path=post.cover_path||null;
      if(diaryCoverFile)cover_path=await uploadFile(diaryCoverFile,"diary/"+slugify(post.slug||post.title)+"-"+Date.now()+"."+fileExt(diaryCoverFile));
      const payload={...post,cover_path,tags:post.tags.split(",").map(x=>x.trim()).filter(Boolean),published_at:post.published?new Date().toISOString():null};
    const result=post.id
      ? await supabase.from("diary_posts").update(payload).eq("id",post.id)
      : await supabase.from("diary_posts").insert(payload);
      if(result.error)throw result.error;
      setMessage("Diary saved.");setPost(emptyDiary);setDiaryCoverFile(null);await refresh();
    }catch(error){setMessage(error.message||"Diary save failed.");}
    finally{setBusy(false);}
  }

  async function remove(table,id){
    if(!window.confirm("Delete this item?"))return;
    const {error}=await supabase.from(table).delete().eq("id",id);
    setMessage(error?.message||"Deleted.");
    if(!error)await refresh();
  }

  async function saveProfile(e){
    e.preventDefault();setBusy(true);
    try{
      let portrait_path=profile?.portrait_path||null;
      if(portraitFile)portrait_path=await uploadFile(portraitFile,"profile/portrait-"+Date.now()+"."+fileExt(portraitFile));
      const payload={...profile,portrait_path};
      const {error}=await supabase.from("site_profile").update(payload).eq("id",1);
      if(error)throw error;
      setProfile(payload);setPortraitFile(null);setMessage("Profile saved.");
    }catch(error){setMessage(error.message||"Profile save failed.");}
    finally{setBusy(false);}
  }

  async function uploadMediaLibrary(files){
    setMediaBusy(true);setMessage("");
    try{
      for(const file of files){
        const path="media/"+Date.now()+"-"+slugify(file.name.replace(/\.[^.]+$/,""))+"."+fileExt(file);
        const stored=await uploadFile(file,path);
        const kind=file.type.startsWith("image/")?"image":file.type.startsWith("video/")?"video":"document";
        const {error}=await supabase.from("media").insert({bucket_id:BUCKET,storage_path:stored,kind,alt_text:file.name});
        if(error){await supabase.storage.from(BUCKET).remove([stored]);throw error;}
      }
      setMessage(files.length+" file(s) uploaded.");await refresh();
    }catch(error){setMessage(error.message||"Upload failed.");}
    finally{setMediaBusy(false);}
  }

  async function removeMedia(item){
    if(!window.confirm("Delete this media file?"))return;
    setMediaBusy(true);
    await supabase.from("media").delete().eq("id",item.id);
    await supabase.storage.from(BUCKET).remove([item.storage_path]);
    await refresh();setMediaBusy(false);
  }

  if(!session||busy)return <section className="page-shell"><p className="eyebrow">ADMIN</p><h1>Loading control room...</h1></section>;

  return <section className="page-shell admin-page">
    <div className="admin-head">
      <div><p className="eyebrow">PRIVATE / ADMIN</p><h1>Portfolio control room.</h1><p>Signed in as {session.user.email}</p></div>
      <button className="button button-light" onClick={async()=>{await supabase.auth.signOut();window.location.href="/admin/login"}}>Sign out</button>
    </div>
    <div className="admin-tabs"><p className="admin-upload-note">Media uploads are available from the admin workspace.</p>
      {["projects","diary","profile","media"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}
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
        <UploadBox label="Project cover" accept="image/*" onFiles={files=>setCoverFile(files[0]||null)} help="JPG, PNG, WebP, GIF, SVG. Max 20 MB."/>
        {project.cover_path&&<img className="admin-preview" src={publicUrl(project.cover_path)} alt="Current cover"/>}
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
        <UploadBox label="Diary cover" accept="image/*" onFiles={files=>setDiaryCoverFile(files[0]||null)} help="Optional cover image. Max 20 MB."/>
        {post.cover_path&&<img className="admin-preview" src={publicUrl(post.cover_path)} alt="Current diary cover"/>}
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
      <UploadBox label="Profile portrait" accept="image/*" onFiles={files=>setPortraitFile(files[0]||null)} help="JPG, PNG, WebP, GIF, SVG. Max 20 MB."/>
      {profile.portrait_path&&<img className="admin-preview admin-preview-portrait" src={publicUrl(profile.portrait_path)} alt="Current portrait"/>}
      <button className="button button-dark" disabled={busy}>Save profile</button>
    </form>}

    {tab==="media"&&<div className="admin-grid">
      <div className="admin-form admin-editor">
        <h2>Media Library</h2>
        <p>Upload reusable images, videos, or PDFs directly from the website.</p>
        <UploadBox label="Upload files" accept="image/*,video/mp4,application/pdf" multiple onFiles={uploadMediaLibrary} help={mediaBusy?"Uploading...":"Max 20 MB per file."}/>
      </div>
      <div className="admin-list">{media.map(item=><article className="admin-item" key={item.id}><div><strong>{item.storage_path.split("/").pop()}</strong><span>{item.kind}</span></div><button onClick={()=>removeMedia(item)} disabled={mediaBusy}>Delete</button></article>)}</div>
    </div>}
  </section>
}
export default Admin;
