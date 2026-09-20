import { useState } from "react";
import Icon from "../components/icon";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

function AdminLogin() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function submit(e){
    e.preventDefault();
    if(!supabase){setMessage("Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY.");return;}
    setBusy(true);setMessage("");
    const {error}=await supabase.auth.signInWithPassword({email,password});
    if(error)setMessage(error.message);
    else window.location.href="/admin";
    setBusy(false);
  }

  return <section className="page-shell admin-page">
    <div className="admin-auth-card">
      <p className="eyebrow">ADMIN / LOGIN</p>
      <h1>Portfolio control room.</h1>
      <p>Private area for managing projects, diary posts, profile content, and media.</p>
      <form onSubmit={submit} className="admin-form">
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label>
        <button className="button button-dark" disabled={busy}>{busy?"Signing in...":"Sign in"} <Icon name="arrow" size={16}/></button>
      </form>
      {message&&<p className="admin-message">{message}</p>}
      {!isSupabaseConfigured&&<p className="admin-message">Environment variables belum diisi.</p>}
    </div>
  </section>
}
export default AdminLogin;
