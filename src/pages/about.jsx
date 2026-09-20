import { useEffect,useState } from "react";
import { supabase,isSupabaseConfigured } from "../lib/supabase";

function About(){
  const [profile,setProfile]=useState(null);
  useEffect(()=>{
    if(!isSupabaseConfigured)return;
    let active=true;
    (async()=>{const {data}=await supabase.from("site_profile").select("*").eq("id",1).maybeSingle();if(active&&data)setProfile(data)})();
    return()=>{active=false};
  },[]);
  return <section className="page-shell">
    <div className="page-intro"><div><p className="eyebrow">06 / ABOUT</p><h1>{profile?.headline?.split(",")[0]||"Designer,"}<br/><span>{profile?.headline?.split(",").slice(1).join(",").trim()||"communicator, builder."}</span></h1></div><p className="page-intro-copy">{profile?.bio||"I’m M. Fariel Agiansyah, a Communication Science student at Universitas Tidar with a DKV background from SMK Negeri 1 Magelang. My work sits between visual design, digital communication, and building things for the web."}</p></div>
    <div className="about-profile"><div className="about-portrait">{profile?.portrait_path?<img src={profile.portrait_path} alt={profile.name||"Portrait"}/>:<div className="about-portrait-placeholder"><strong>YOUR PORTRAIT</strong><span>Upload it from the admin panel later</span></div>}<span className="photo-caption">{profile?.name||"M. Fariel Agiansyah"} / {profile?.location||"Yogyakarta"}</span></div>
      <div className="about-profile-copy"><p className="about-kicker">A little context</p><h2>The person behind the pixels and code.</h2><p>I like work that has a visible result. A feed that suddenly makes sense. A website that feels obvious to use. A video that lands at the right moment. A system that turns a messy workflow into something manageable.</p><div className="about-mini-grid"><div><span className="detail-label">Field</span><strong>Visual communication</strong></div><div><span className="detail-label">Base</span><strong>{profile?.location||"Yogyakarta / Magelang"}</strong></div><div><span className="detail-label">Current</span><strong>Communication Science</strong></div></div></div>
    </div>
    <div className="about-story"><div className="about-story-main"><p>My experience moves across visual design, social media, content production, web development, photography, videography, editing, motion, and communication.</p><p>I’ve worked through campus organizations, creative production, and an internship environment where design had to meet real communication goals.</p></div><div className="about-facts"><div><span className="detail-label">Education</span><p>S1 Ilmu Komunikasi<br/>Universitas Tidar<br/><br/>DKV<br/>SMK Negeri 1 Magelang</p></div><div><span className="detail-label">Experience</span><p>Telkomsel HCOT internship<br/>HMIK Untidar — Head of Business Division<br/>REDICATOR — Vice Chair<br/>Nirkala Production — DoP</p></div><div><span className="detail-label">Tools</span><p>Photoshop · Illustrator · Figma<br/>HTML · CSS · JavaScript<br/>React · Vite · Supabase<br/>Content planning · Copywriting · Editing</p></div></div></div>
  </section>
}
export default About;
