import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/lib/supabase";

type TabType = 'profile' | 'account' | 'notifications' | 'appearance' | 'sessions' | 'privacy' | 'danger';

export default function Settings() {
  const { user, signOut } = useAuth();
  const { profile } = useUserProfile(user?.id);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [unsaved, setUnsaved] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");
  const [tfaEnabled, setTfaEnabled] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const markUnsaved = () => setUnsaved(true);

  const saveSettings = async () => {
    if (!user) return;
    try {
      await supabase.from('users').update({ full_name: fullName }).eq('id', user.id);
      setUnsaved(false);
      toast('Settings saved successfully!', 'ok');
    } catch (err) {
      toast('Failed to save settings', 'err');
    }
  };

  const toast = (msg: string, type: string) => {
    console.log(`${type}: ${msg}`);
  };

  return (
    <>
      <style>{`
        .settings-container{width:100%;display:flex;flex-direction:column;height:100%}
        .settings-topbar{display:flex;align-items:center;justify-content:space-between;padding:18px 36px;border-bottom:1px solid rgba(255,255,255,0.07);background:rgba(20,27,38,1);flex-shrink:0}
        .settings-topbar h1{font-family:'Syne',sans-serif;font-size:15px;font-weight:700}
        .unsaved-badge{display:${unsaved ? 'inline-flex' : 'none'};align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;background:rgba(245,158,11,0.12);color:#f59e0b;border:1px solid rgba(245,158,11,.28)}
        .save-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 20px;border-radius:10px;border:none;cursor:pointer;font-size:13.5px;font-weight:600;background:#0ea5c8;color:#fff;box-shadow:0 0 16px rgba(14,165,200,0.28);transition:all .2s}
        .save-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
        .settings-content{display:flex;flex:1;overflow:hidden}
        .settings-nav{width:200px;flex-shrink:0;padding:24px 16px;border-right:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;gap:2px;overflow-y:auto}
        .sn-item{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;color:#94a3b8;cursor:pointer;transition:all .2s;font-size:13px;font-weight:500}
        .sn-item:hover{background:rgba(26,36,54,1);color:#e2e8f0}
        .sn-item.active{background:rgba(14,165,200,0.13);color:#0ea5c8;font-weight:600;box-shadow:inset 0 0 0 1px rgba(14,165,200,.22)}
        .sn-sep{height:1px;background:rgba(255,255,255,0.07);margin:10px 4px}
        .panels{flex:1;overflow-y:auto;padding:28px 36px 52px}
        .panel{display:none}
        .panel.active{display:block;animation:fadeUp .3s ease both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .panel-header{margin-bottom:24px}
        .panel-header h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:800}
        .panel-header h2 span{color:#0ea5c8}
        .panel-header p{font-size:13px;color:#94a3b8;margin-top:4px}
        .section-card{background:rgba(20,27,38,1);border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;margin-bottom:16px}
        .sc-header{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid rgba(255,255,255,0.07)}
        .sc-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700}
        .sc-desc{font-size:12px;color:#94a3b8;margin-top:2px}
        .sc-body{padding:22px}
        .field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
        .field label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#94a3b8}
        .field input,.field select,.field textarea{background:rgba(26,36,54,1);border:1px solid rgba(255,255,255,0.07);border-radius:9px;color:#e2e8f0;font-size:13.5px;padding:11px 14px;outline:none;width:100%;transition:border-color .2s}
        .field input:focus,.field select:focus,.field textarea:focus{border-color:#0ea5c8;box-shadow:0 0 0 3px rgba(14,165,200,0.13)}
        .field textarea{resize:vertical;min-height:80px;line-height:1.6}
        .toggle-row{display:flex;align-items:center;justify-content:space-between;padding:13px 0;border-bottom:1px solid rgba(255,255,255,0.07)}
        .toggle-row:last-child{border-bottom:none}
        .toggle-info .tl{font-size:13.5px;font-weight:500}
        .toggle-info .td{font-size:12px;color:#64748b;margin-top:3px}
        .toggle-sw{position:relative;cursor:pointer}
        .toggle-sw input{display:none}
        .toggle-track{width:40px;height:22px;border-radius:11px;background:rgba(26,36,54,1);border:1px solid rgba(255,255,255,0.07);position:relative;transition:all .25s;cursor:pointer}
        .toggle-track::after{content:'';position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#64748b;transition:all .25s}
        .toggle-sw input:checked+.toggle-track{background:#0ea5c8;border-color:#0ea5c8}
        .toggle-sw input:checked+.toggle-track::after{left:21px;background:#fff}
        .btn-sm{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;border:none;cursor:pointer;font-size:12.5px;font-weight:500;transition:all .2s}
        .btn-teal-sm{background:#0ea5c8;color:#fff}
        .btn-teal-sm:hover{filter:brightness(1.1)}
        .btn-ghost-sm{background:rgba(31,45,64,1);border:1px solid rgba(255,255,255,0.07);color:#94a3b8}
        .btn-ghost-sm:hover{border-color:#0ea5c8;color:#0ea5c8}
        .danger-card{background:rgba(20,27,38,1);border:1px solid rgba(239,68,68,.25);border-radius:14px;overflow:hidden}
        .danger-header{display:flex;align-items:center;gap:10px;padding:16px 22px;background:rgba(239,68,68,0.12);border-bottom:1px solid rgba(239,68,68,.2)}
        .danger-header span{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#ef4444}
        .danger-body{padding:20px 22px}
        .danger-body p{font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:16px}
        .btn-danger{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:9px;border:1px solid rgba(239,68,68,.35);background:rgba(239,68,68,0.12);color:#ef4444;cursor:pointer;font-size:13px;font-weight:600;transition:all .2s}
        .btn-danger:hover{background:rgba(239,68,68,.22);border-color:#ef4444}
      `}</style>

      <div className="settings-container">
        <div className="settings-topbar">
          <h1>CampusPulse</h1>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div className="unsaved-badge">Unsaved changes</div>
            <button className="save-btn" onClick={saveSettings}>Save Changes</button>
          </div>
        </div>

        <div className="settings-content">
          <nav className="settings-nav">
            <div className={`sn-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</div>
            <div className={`sn-item ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>Account & Security</div>
            <div className={`sn-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</div>
            <div className={`sn-item ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>Appearance</div>
            <div className={`sn-item ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>Active Sessions</div>
            <div className="sn-sep"></div>
            <div className={`sn-item ${activeTab === 'privacy' ? 'active' : ''}`} onClick={() => setActiveTab('privacy')}>Privacy & Data</div>
            <div className={`sn-item ${activeTab === 'danger' ? 'active' : ''}`} onClick={() => setActiveTab('danger')}>Danger Zone</div>
          </nav>

          <div className="panels">
            <div className={`panel ${activeTab === 'profile' ? 'active' : ''}`}>
              <div className="panel-header">
                <h2>Settings & <span>Preferences</span></h2>
                <p>Manage your account settings and personal preferences</p>
              </div>
              <div className="section-card">
                <div className="sc-header">
                  <div><div className="sc-title">Profile</div><div className="sc-desc">Your public profile information</div></div>
                </div>
                <div className="sc-body">
                  <div className="field">
                    <label>Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => {setFullName(e.target.value);markUnsaved()}} />
                  </div>
                  <div className="field">
                    <label>Email Address</label>
                    <input type="email" value={email} disabled />
                  </div>
                  <div className="field">
                    <label>Phone Number</label>
                    <input type="tel" value={phone} onChange={(e) => {setPhone(e.target.value);markUnsaved()}} placeholder="+91 98765 43210" />
                  </div>
                  <div className="field">
                    <label>Department</label>
                    <select value={department} onChange={(e) => {setDepartment(e.target.value);markUnsaved()}}>
                      <option>Computer Science</option>
                      <option>Electronics</option>
                      <option>Information Technology</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Bio / About</label>
                    <textarea value={bio} onChange={(e) => {setBio(e.target.value);markUnsaved()}} placeholder="Write a short bio…"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab === 'account' ? 'active' : ''}`}>
              <div className="panel-header">
                <h2>Account & <span>Security</span></h2>
                <p>Manage your password, 2FA, and active login sessions</p>
              </div>
              <div className="section-card">
                <div className="sc-header">
                  <div><div className="sc-title">Change Password</div><div className="sc-desc">Choose a strong password for your account</div></div>
                </div>
                <div className="sc-body">
                  <div className="field">
                    <label>Current Password</label>
                    <input type="password" placeholder="Enter current password" />
                  </div>
                  <div className="field">
                    <label>New Password</label>
                    <input type="password" placeholder="Min 8 characters" />
                  </div>
                  <div className="field">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Repeat new password" />
                  </div>
                  <button className="btn-sm btn-teal-sm">Update Password</button>
                </div>
              </div>
              <div className="section-card">
                <div className="sc-header">
                  <div><div className="sc-title">Two-Factor Authentication</div><div className="sc-desc">Add an extra layer of security</div></div>
                </div>
                <div className="sc-body">
                  <button className="btn-sm btn-teal-sm" onClick={() => setTfaEnabled(!tfaEnabled)}>
                    {tfaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab === 'notifications' ? 'active' : ''}`}>
              <div className="panel-header">
                <h2>Notification <span>Preferences</span></h2>
                <p>Control when and how CampusPulse notifies you</p>
              </div>
              <div className="section-card">
                <div className="sc-header">
                  <div><div className="sc-title">Email Notifications</div><div className="sc-desc">Sent to {email}</div></div>
                </div>
                <div className="sc-body">
                  <div className="toggle-row">
                    <div className="toggle-info"><div className="tl">Session Summary</div><div className="td">Daily email with attendance summary</div></div>
                    <label className="toggle-sw"><input type="checkbox" defaultChecked onChange={markUnsaved} /><div className="toggle-track"></div></label>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info"><div className="tl">At-Risk Student Alerts</div><div className="td">Alert when a student falls below 75% attendance</div></div>
                    <label className="toggle-sw"><input type="checkbox" defaultChecked onChange={markUnsaved} /><div className="toggle-track"></div></label>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info"><div className="tl">Proxy Detection Alerts</div><div className="td">Instant alert when proxy attendance is detected</div></div>
                    <label className="toggle-sw"><input type="checkbox" defaultChecked onChange={markUnsaved} /><div className="toggle-track"></div></label>
                  </div>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab === 'appearance' ? 'active' : ''}`}>
              <div className="panel-header">
                <h2>Appearance & <span>Display</span></h2>
                <p>Personalise how CampusPulse looks for you</p>
              </div>
              <div className="section-card">
                <div className="sc-header">
                  <div><div className="sc-title">Theme</div><div className="sc-desc">Choose your preferred colour scheme</div></div>
                </div>
                <div className="sc-body">
                  <div className="field">
                    <label>Colour Mode</label>
                    <select onChange={markUnsaved}>
                      <option>Dark</option>
                      <option>Light</option>
                      <option>System Default</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Font Size</label>
                    <select defaultValue="Medium (14px)" onChange={markUnsaved}>
                      <option>Small (12px)</option>
                      <option>Medium (14px)</option>
                      <option>Large (16px)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab === 'sessions' ? 'active' : ''}`}>
              <div className="panel-header">
                <h2>Active <span>Sessions</span></h2>
                <p>Devices currently logged into your CampusPulse account</p>
              </div>
              <div className="section-card">
                <div className="sc-header">
                  <div><div className="sc-title">Logged-in Devices</div><div className="sc-desc">Manage where you're signed in</div></div>
                </div>
                <div className="sc-body">
                  <p style={{fontSize:'13px',color:'#94a3b8'}}>Chrome · Windows 11 - Active now</p>
                  <p style={{fontSize:'13px',color:'#94a3b8',marginTop:'8px'}}>Safari · iPhone 15 - 2 hours ago</p>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab === 'privacy' ? 'active' : ''}`}>
              <div className="panel-header">
                <h2>Privacy & <span>Data</span></h2>
                <p>Control your data and how CampusPulse uses your information</p>
              </div>
              <div className="section-card">
                <div className="sc-header">
                  <div><div className="sc-title">Privacy Controls</div><div className="sc-desc">Who can see your data</div></div>
                </div>
                <div className="sc-body">
                  <div className="toggle-row">
                    <div className="toggle-info"><div className="tl">Activity Data</div><div className="td">Allow CampusPulse to collect usage analytics</div></div>
                    <label className="toggle-sw"><input type="checkbox" defaultChecked onChange={markUnsaved} /><div className="toggle-track"></div></label>
                  </div>
                  <button className="btn-sm btn-ghost-sm" style={{marginTop:'12px'}}>Export My Data</button>
                </div>
              </div>
            </div>

            <div className={`panel ${activeTab === 'danger' ? 'active' : ''}`}>
              <div className="panel-header">
                <h2>Danger <span style={{color:'#ef4444'}}>Zone</span></h2>
                <p>Irreversible actions — please read carefully before proceeding</p>
              </div>
              <div className="danger-card">
                <div className="danger-header"><span>Danger Zone</span></div>
                <div className="danger-body">
                  <p>These actions are permanent and cannot be undone.</p>
                  <button className="btn-danger" onClick={() => confirm('Delete your account?') && signOut()}>Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
