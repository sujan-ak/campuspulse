import { useState } from 'react';

const Analytics = () => {
  const [range, setRange] = useState('Semester');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);



  const SUBJECTS = [
    {name:'Data Structures',  pct:91, attended:22, total:24, color:'#38bdf8',  status:'safe'},
    {name:'Algorithms',        pct:85, attended:17, total:20, color:'#a78bfa',  status:'safe'},
    {name:'Database Systems',  pct:88, attended:21, total:24, color:'#34d399',  status:'safe'},
    {name:'OS Lab',            pct:79, attended:15, total:19, color:'#60a5fa',  status:'warn'},
    {name:'Math 101',          pct:84, attended:16, total:19, color:'#fb923c',  status:'safe'},
    {name:'Physics Lab',       pct:68, attended:13, total:19, color:'#f87171',  status:'risk'},
  ];
  
  const WEEK = [
    {d:'Mon', p:5, l:0, a:0},
    {d:'Tue', p:6, l:1, a:0},
    {d:'Wed', p:6, l:0, a:0},
    {d:'Thu', p:5, l:1, a:1},
    {d:'Fri', p:4, l:1, a:0},
    {d:'Sat', p:3, l:0, a:0},
    {d:'Sun', p:5, l:0, a:0},
  ];
  
  const CALENDAR_DAYS = [
    {day:1,status:'P'},{day:2,status:'P'},{day:3,status:'P'},{day:4,status:'L'},{day:5,status:'A'},
    {day:6,status:'P'},{day:7,status:'P'},{day:8,status:'P'},{day:9,status:'P'},{day:10,status:'P'},
    {day:11,status:'P',today:true},{day:12,status:'L'},{day:13,status:'P'},{day:14,status:'P'},
    {day:15,status:'A'},{day:16,status:'P'},{day:17,status:'P'},{day:18,status:'P'},{day:19,status:'P'},
    {day:20,status:'P'},{day:21,status:'P'},{day:22,status:'P'},{day:23,status:'L'},{day:24,status:'P'},
    {day:25,status:'P'},{day:26,status:'P'},{day:27,status:'P'},{day:28,status:'P'},{day:29,status:'P'},
    {day:30,status:'P'},{day:31,status:'P'}
  ];
  
  const ACTIVITY_EVENTS = [
    {type:'present', subject:'Data Structures', time:'Today · 11:00 AM'},
    {type:'late', subject:'Algorithms', time:'Today · 12:55 PM'},
    {type:'present', subject:'Database Systems', time:'Yesterday · 2:00 PM'},
    {type:'present', subject:'OS Lab', time:'Mar 6 · 9:00 AM'},
    {type:'absent', subject:'Physics Lab', time:'Mar 5 · 11:00 AM'},
  ];
  
  const AI_INSIGHTS = [
    {icon:'🏆', title:'Best Subject', value:'Data Structures', sub:'91% attendance', color:'green'},
    {icon:'🚨', title:'At Risk', value:'Physics Lab', sub:'Needs 4 more sessions', color:'danger'},
    {icon:'🔥', title:'Best Streak', value:'12 Days', sub:'Consecutive attended', color:'warn'},
    {icon:'📈', title:'Class Rank', value:'#4 / 42', sub:'Top 10%', color:'purple'},
  ];
  
  const GOALS = [
    {label:'Overall ≥ 90%', current:87, target:90, note:'3% away — keep going!', noteColor:'warn'},
    {label:'Physics Lab ≥ 75%', current:68, target:75, note:'⚠️ 4 sessions needed', noteColor:'danger'},
    {label:'Zero Absences in March', current:0, target:0, absences:2, note:'Goal not achievable — 2 absences logged', noteColor:'danger'},
  ];
  
  const handleDownload = (type: string) => {
    alert(`Downloading ${type}...`);
    setShowDownloadMenu(false);
  };

  return (
    <>
      <style>{`
        :root{
          --bg:#0b0f1a;--surface:#111827;--surface2:#1a2235;--surface3:#1f2d42;
          --border:rgba(255,255,255,0.07);--text:#e8edf5;--muted:#6b7a99;
          --accent:#38bdf8;--accent2:#34d399;--warn:#f59e0b;--danger:#f87171;
          --purple:#a78bfa;--safe:#34d399;--present:#34d399;--late:#f59e0b;--absent:#f87171;
        }
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;}
        .page-header{margin-bottom:20px;}
        .page-header h1{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;}
        .page-header h1 span{color:var(--accent);}
        .page-header p{color:var(--muted);font-size:13px;margin-top:4px;}
        .topbar-controls{display:flex;gap:10px;align-items:center;margin-bottom:20px;justify-content:flex-end;}
        .badge-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--border);background:var(--surface2);color:var(--muted);font-size:12.5px;cursor:pointer;transition:.2s;font-family:'DM Sans',sans-serif;}
        .badge-btn:hover{color:var(--text);border-color:var(--accent);}
        .badge-btn.active{background:rgba(56,189,248,.15);color:var(--accent);border-color:var(--accent);font-weight:600;}
        .user-chip{display:flex;align-items:center;gap:8px;padding:6px 12px;background:var(--surface2);border-radius:10px;border:1px solid var(--border);}
        .avatar{width:28px;height:28px;background:linear-gradient(135deg,#38bdf8,#818cf8);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;}
        .download-btn{padding:8px 16px;background:linear-gradient(135deg,#38bdf8,#818cf8);border:none;border-radius:8px;color:#fff;font-weight:600;font-size:12.5px;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:6px;transition:.2s;position:relative;}
        .download-btn:hover{opacity:.85;transform:translateY(-1px);}
        .dl-menu{position:absolute;right:0;top:calc(100% + 6px);background:var(--surface2);border:1px solid var(--border);border-radius:10px;overflow:hidden;z-index:20;min-width:140px;}
        .dl-item{padding:10px 14px;cursor:pointer;font-size:13px;}
        .dl-item:hover{background:var(--surface3);}
        .alert{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);border-left:4px solid var(--danger);border-radius:10px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:flex-start;gap:12px;}
        .alert-title{font-weight:700;color:var(--danger);font-size:13.5px;margin-bottom:4px;}
        .alert-body{color:#fca5a5;font-size:13px;line-height:1.5;}
        .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px;}
        .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 20px;position:relative;overflow:hidden;transition:.2s;}
        .stat-card:hover{border-color:rgba(56,189,248,.3);transform:translateY(-2px);}
        .stat-card .glow{position:absolute;top:-30px;right:-30px;width:80px;height:80px;border-radius:50%;opacity:.12;filter:blur(20px);}
        .stat-label{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;}
        .stat-value{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;line-height:1;}
        .stat-sub{font-size:12px;color:var(--muted);margin-top:6px;}
        .stat-card.blue .stat-value{color:var(--accent);}.stat-card.blue .glow{background:var(--accent);}
        .stat-card.green .stat-value{color:var(--safe);}.stat-card.green .glow{background:var(--safe);}
        .stat-card.orange .stat-value{color:var(--warn);}.stat-card.orange .glow{background:var(--warn);}
        .stat-card.purple .stat-value{color:var(--purple);}.stat-card.purple .glow{background:var(--purple);}
        .charts-row{display:grid;grid-template-columns:1.4fr 1fr;gap:16px;margin-bottom:20px;}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;}
        .card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
        .card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:14px;}
        .legend{display:flex;gap:14px;}
        .legend-item{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);}
        .dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
        .select{background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:5px 10px;border-radius:7px;font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;}
        .bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;}
        .triple-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px;}
        .status-pill{padding:3px 10px;border-radius:99px;font-size:11px;font-weight:600;white-space:nowrap;}
        .status-safe{background:rgba(52,211,153,.15);color:var(--safe);}
        .status-warn{background:rgba(245,158,11,.15);color:var(--warn);}
        .status-risk{background:rgba(248,113,113,.15);color:var(--danger);}
        .insight-card{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:12px;transition:.2s;}
        .insight-card:hover{border-color:rgba(56,189,248,.3);}
        .insight-card.danger-card{background:rgba(248,113,113,.08);border-color:rgba(248,113,113,.2);}
        .insight-card.green-card{background:rgba(52,211,153,.08);border-color:rgba(52,211,153,.2);}
        .insight-card.warn-card{background:rgba(245,158,11,.08);border-color:rgba(245,158,11,.2);}
        .insight-card.purple-card{background:rgba(167,139,250,.08);border-color:rgba(167,139,250,.2);}
        .personal-insight{background:linear-gradient(135deg,rgba(56,189,248,.1),rgba(167,139,250,.1));border:1px solid rgba(56,189,248,.25);border-radius:14px;padding:18px 22px;display:flex;align-items:center;gap:14px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .fade-up{animation:fadeUp .4s ease both;}
        .delay-1{animation-delay:.05s;}.delay-2{animation-delay:.1s;}.delay-3{animation-delay:.15s;}.delay-4{animation-delay:.2s;}.delay-5{animation-delay:.25s;}
      `}</style>

      <div>
        {/* Page Header */}
        <div className="page-header fade-up">
          <h1>My <span>Analytics</span></h1>
          <p>Academic Year 2025–26 · Computer Science · 3rd Year</p>
        </div>

        {/* Topbar Controls */}
        <div className="topbar-controls fade-up delay-1">
          <button className={`badge-btn ${range === '7D' ? 'active' : ''}`} onClick={() => setRange('7D')}>7D</button>
          <button className={`badge-btn ${range === '30D' ? 'active' : ''}`} onClick={() => setRange('30D')}>30D</button>
          <button className={`badge-btn ${range === 'Semester' ? 'active' : ''}`} onClick={() => setRange('Semester')}>Semester</button>
          <div className="user-chip">
            <div className="avatar">PS</div>
            <div>
              <div style={{fontSize:'12.5px',fontWeight:600}}>Priya Sharma</div>
              <div style={{fontSize:'10.5px',color:'var(--muted)'}}>22CS1045</div>
            </div>
          </div>
          <div style={{position:'relative'}}>
            <button className="download-btn" onClick={() => setShowDownloadMenu(!showDownloadMenu)}>
              ⬇ Download Report ▾
            </button>
            {showDownloadMenu && (
              <div className="dl-menu">
                <div className="dl-item" onClick={() => handleDownload('PDF')}>📄 PDF</div>
                <div className="dl-item" onClick={() => handleDownload('CSV')}>📊 CSV</div>
                <div className="dl-item" onClick={() => handleDownload('Excel')}>📋 Excel</div>
              </div>
            )}
          </div>
        </div>

        {/* Alert */}
        <div className="alert fade-up delay-1">
          <div style={{fontSize:'18px'}}>⚠️</div>
          <div>
            <div className="alert-title">Attendance Warning — Physics Lab</div>
            <div className="alert-body">Your attendance in Physics Lab is at <strong>68%</strong> — below the required 75% threshold. You need to attend the next <strong>4 consecutive sessions</strong> to become eligible for the exam.</div>
          </div>
        </div>


        {/* Stat Cards */}
        <div className="stat-grid fade-up delay-2">
          <div className="stat-card blue">
            <div className="glow"></div>
            <div className="stat-label">Overall Attendance</div>
            <div className="stat-value">87%</div>
            <div className="stat-sub"><span style={{color:'var(--safe)'}}>↑ +2.4%</span> this month</div>
          </div>
          <div className="stat-card green">
            <div className="glow"></div>
            <div className="stat-label">Sessions Attended</div>
            <div className="stat-value">82</div>
            <div className="stat-sub">out of 94 total</div>
          </div>
          <div className="stat-card orange">
            <div className="glow"></div>
            <div className="stat-label">Current Streak</div>
            <div className="stat-value">12</div>
            <div className="stat-sub">consecutive days 🔥</div>
          </div>
          <div className="stat-card purple">
            <div className="glow"></div>
            <div className="stat-label">Class Rank</div>
            <div className="stat-value">#4</div>
            <div className="stat-sub" style={{color:'var(--safe)'}}>out of 42 students</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-row fade-up delay-3">
          {/* Weekly Bar Chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Weekly Attendance</div>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div className="legend">
                  <div className="legend-item"><div className="dot" style={{background:'var(--present)'}}></div>Present</div>
                  <div className="legend-item"><div className="dot" style={{background:'var(--late)'}}></div>Late</div>
                  <div className="legend-item"><div className="dot" style={{background:'var(--absent)'}}></div>Absent</div>
                </div>
                <select className="select"><option>This Week</option><option>Last Week</option></select>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'flex-end',gap:'8px',height:'130px'}}>
              {WEEK.map((day, idx) => {
                const isToday = day.d === 'Wed';
                return (
                  <div key={idx} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',height:'100%',justifyContent:'flex-end',gap:'2px'}}>
                    {day.a > 0 && <div style={{width:'65%',height:`${day.a*15}%`,background:'var(--absent)',borderRadius:'4px 4px 0 0'}} title={`${day.d}: Absent`}></div>}
                    {day.l > 0 && <div style={{width:'65%',height:`${day.l*15}%`,background:'var(--late)',borderRadius:'4px 4px 0 0'}} title={`${day.d}: Late`}></div>}
                    {day.p > 0 && <div style={{width:'65%',height:`${day.p*10}%`,background:'var(--present)',borderRadius:'4px 4px 0 0',outline:isToday?'2px solid var(--accent)':'none',outlineOffset:'2px'}} title={`${day.d}: Present`}></div>}
                    <div style={{fontSize:'10.5px',color:isToday?'var(--accent)':'var(--muted)',marginTop:'5px',fontWeight:isToday?700:400}}>{day.d}</div>
                  </div>
                );
              })}
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',paddingLeft:'8px',borderLeft:'1px solid var(--border)'}}>
                <div style={{fontFamily:'Syne',fontSize:'26px',fontWeight:800,color:'var(--accent)'}}>87%</div>
                <div style={{fontSize:'10px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.06em'}}>Overall</div>
              </div>
            </div>
          </div>

          {/* Subject Donut */}
          <div className="card">
            <div className="card-header"><div className="card-title">By Subject</div></div>
            <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
              <div style={{position:'relative',width:'90px',height:'90px',flexShrink:0}}>
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="34" fill="none" stroke="var(--surface3)" strokeWidth="10"/>
                  <circle cx="45" cy="45" r="34" fill="none" stroke="#38bdf8" strokeWidth="10" strokeDasharray="213 0" strokeLinecap="round" transform="rotate(-90 45 45)" opacity=".9"/>
                </svg>
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
                  <div style={{fontFamily:'Syne',fontSize:'16px',fontWeight:800,color:'var(--text)'}}>82</div>
                  <div style={{fontSize:'9px',color:'var(--muted)',lineHeight:1.2}}>sessions</div>
                </div>
              </div>
              <div style={{flex:1,display:'flex',flexDirection:'column',gap:'8px'}}>
                {SUBJECTS.map((subj, idx) => (
                  <div key={idx} style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:subj.color}}></div>
                    <div style={{flex:1,fontSize:'12.5px',color:'var(--muted)'}}>{subj.name}</div>
                    <div style={{flex:2,height:'5px',background:'var(--surface3)',borderRadius:'99px',overflow:'hidden'}}>
                      <div style={{height:'100%',borderRadius:'99px',width:`${subj.pct}%`,background:subj.color}}></div>
                    </div>
                    <div style={{fontSize:'12.5px',fontWeight:600,width:'32px',textAlign:'right',color:subj.color}}>{subj.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="card fade-up delay-3" style={{marginBottom:'20px'}}>
          <div className="card-header">
            <div className="card-title">Monthly Attendance Trend</div>
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <div className="legend">
                <div className="legend-item"><div className="dot" style={{background:'var(--accent)'}}></div>My Attendance</div>
                <div className="legend-item"><div style={{width:'16px',height:'2px',background:'var(--muted)',borderRadius:'1px'}}></div>Class Avg</div>
                <div className="legend-item"><div style={{width:'16px',height:'2px',background:'var(--warn)',borderRadius:'1px',borderTop:'1px dashed var(--warn)'}}></div>Target 75%</div>
              </div>
              <select className="select" style={{minWidth:'100px'}}><option>March 2026</option><option>February 2026</option></select>
            </div>
          </div>
          <svg width="100%" height="110" viewBox="0 0 900 110" preserveAspectRatio="none">
            <line x1="0" y1="60" x2="900" y2="60" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="6 4" opacity=".5"/>
            <polyline points="0,72 150,68 300,74 450,70 600,69 750,71 900,68" fill="none" stroke="var(--muted)" strokeWidth="2" opacity=".5"/>
            <path d="M0,65 C60,58 120,50 180,52 S300,40 360,38 S480,30 540,35 S660,28 720,32 S840,25 900,28 L900,110 L0,110 Z" fill="url(#trendGrad)" opacity=".3"/>
            <path d="M0,65 C60,58 120,50 180,52 S300,40 360,38 S480,30 540,35 S660,28 720,32 S840,25 900,28" fill="none" stroke="var(--accent)" strokeWidth="2.5"/>
            <defs>
              <linearGradient id="trendGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity=".6"/>
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'var(--muted)',paddingTop:'4px'}}>
            <span>Mar 1</span><span>Mar 8</span><span>Mar 15</span><span>Mar 22</span><span>Mar 29</span>
          </div>
        </div>

        {/* Calendar + Subject Breakdown */}
        <div className="bottom-grid fade-up delay-4">
          {/* Calendar */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">March 2026 — Attendance Calendar</div>
              <div className="legend">
                <div className="legend-item"><div className="dot" style={{background:'var(--present)'}}></div>Present</div>
                <div className="legend-item"><div className="dot" style={{background:'var(--late)'}}></div>Late</div>
                <div className="legend-item"><div className="dot" style={{background:'var(--absent)'}}></div>Absent</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'5px'}}>
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} style={{textAlign:'center',fontSize:'10px',color:'var(--muted)',paddingBottom:'4px',letterSpacing:'.06em',textTransform:'uppercase'}}>{d}</div>)}
              {CALENDAR_DAYS.map((item) => {
                let bg = 'transparent';
                if (item.status === 'P') bg = 'rgba(52,211,153,.25)';
                else if (item.status === 'L') bg = 'rgba(245,158,11,.25)';
                else if (item.status === 'A') bg = 'rgba(248,113,113,.25)';
                const borderColor = item.status === 'P' ? 'rgba(52,211,153,.4)' : item.status === 'L' ? 'rgba(245,158,11,.4)' : item.status === 'A' ? 'rgba(248,113,113,.4)' : 'transparent';
                return (
                  <div key={item.day} style={{aspectRatio:'1',borderRadius:'6px',cursor:'pointer',transition:'.15s',position:'relative',background:bg,border:`2px solid ${item.today ? 'var(--accent)' : borderColor}`,boxShadow:item.today ? '0 0 0 2px rgba(56,189,248,.3)' : 'none'}} title={`Mar ${item.day}`}></div>
                );
              })}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginTop:'14px'}}>
              <div style={{fontSize:'12px',fontWeight:600,color:'var(--warn)'}}>12-Day Streak 🔥</div>
              <div style={{display:'flex',gap:'3px',flexWrap:'wrap'}}>
                {Array.from({length:15}, (_, i) => (
                  <div key={i} style={{width:'9px',height:'9px',borderRadius:'50%',background:i<12?'var(--safe)':'var(--surface3)'}}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Subject Breakdown</div>
              <div style={{fontSize:'11.5px',color:'var(--muted)'}}>6 subjects</div>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th style={{fontSize:'10.5px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.08em',padding:'0 0 10px',textAlign:'left'}}>Subject</th>
                  <th style={{fontSize:'10.5px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.08em',padding:'0 0 10px',textAlign:'right'}}>Attended</th>
                  <th style={{fontSize:'10.5px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.08em',padding:'0 0 10px 12px',textAlign:'left'}}>Attendance %</th>
                  <th style={{fontSize:'10.5px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.08em',padding:'0 0 10px',textAlign:'right'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((subj, idx) => (
                  <tr key={idx}>
                    <td style={{padding:'9px 0',borderTop:'1px solid var(--border)',verticalAlign:'middle'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'7px',fontSize:'13px'}}>
                        <div style={{width:'8px',height:'8px',borderRadius:'50%',background:subj.color}}></div>
                        {subj.name}
                      </div>
                    </td>
                    <td style={{padding:'9px 0',borderTop:'1px solid var(--border)',textAlign:'right',fontSize:'12.5px',color:'var(--muted)'}}>{subj.attended}/{subj.total}</td>
                    <td style={{padding:'9px 0 9px 12px',borderTop:'1px solid var(--border)'}}>
                      <div style={{height:'5px',background:'var(--surface3)',borderRadius:'99px',overflow:'hidden',width:'80px'}}>
                        <div style={{height:'100%',borderRadius:'99px',width:`${subj.pct}%`,background:subj.color}}></div>
                      </div>
                    </td>
                    <td style={{padding:'9px 0',borderTop:'1px solid var(--border)',textAlign:'right'}}>
                      <span className={`status-pill status-${subj.status}`}>{subj.pct}% · {subj.status === 'safe' ? 'Safe' : subj.status === 'warn' ? 'Warning' : 'At Risk'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Goals + Activity + AI Insights */}
        <div className="triple-grid fade-up delay-5">
          {/* Goals */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Attendance Goals</div>
              <div style={{fontSize:'11px',background:'rgba(56,189,248,.15)',color:'var(--accent)',padding:'3px 9px',borderRadius:'99px',fontWeight:600}}>3 active</div>
            </div>
            {GOALS.map((goal, idx) => {
              const pct = goal.absences !== undefined ? 0 : Math.min(100, Math.round((goal.current / goal.target) * 100));
              const barColor = goal.noteColor === 'danger' ? 'var(--danger)' : goal.noteColor === 'warn' ? 'var(--warn)' : 'var(--safe)';
              return (
                <div key={idx} style={{marginBottom:'14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'12.5px',marginBottom:'6px'}}>
                    <span>{goal.label}</span>
                    <span style={{color:'var(--muted)'}}>{goal.absences !== undefined ? `${goal.absences} absences so far` : `${goal.current}% / ${goal.target}%`}</span>
                  </div>
                  <div style={{height:'6px',background:'var(--surface3)',borderRadius:'99px',overflow:'hidden'}}>
                    <div style={{height:'100%',borderRadius:'99px',width:`${goal.absences !== undefined ? 100 : pct}%`,background:barColor,transition:'width .6s ease'}}></div>
                  </div>
                  <div style={{fontSize:'11px',color:`var(--${goal.noteColor})`,marginTop:'4px',textAlign:'right'}}>{goal.note}</div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Activity</div>
              <div style={{fontSize:'11.5px',color:'var(--accent)',cursor:'pointer'}}>Last 7 events</div>
            </div>
            {ACTIVITY_EVENTS.map((event, idx) => {
              const dotColor = event.type === 'present' ? 'var(--present)' : event.type === 'late' ? 'var(--late)' : 'var(--absent)';
              const statusColor = event.type === 'present' ? 'var(--present)' : event.type === 'late' ? 'var(--late)' : 'var(--danger)';
              const statusLabel = event.type === 'present' ? 'Present' : event.type === 'late' ? 'Late' : 'Absent';
              return (
                <div key={idx} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'9px 0',borderBottom:idx < ACTIVITY_EVENTS.length - 1 ? '1px solid var(--border)' : 'none'}}>
                  <div style={{width:'8px',height:'8px',borderRadius:'50%',background:dotColor,marginTop:'4px',flexShrink:0}}></div>
                  <div>
                    <div style={{fontSize:'13px',fontWeight:500}}>{event.subject} <span style={{color:statusColor,fontSize:'11.5px'}}>{statusLabel}</span></div>
                    <div style={{fontSize:'11px',color:'var(--muted)',marginTop:'1px'}}>{event.time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Insights */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">AI Insights</div>
              <div style={{fontSize:'11px',background:'linear-gradient(135deg,#38bdf8,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontWeight:700,letterSpacing:'.06em'}}>✦ SMART</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              {AI_INSIGHTS.map((insight, idx) => (
                <div key={idx} className={`insight-card ${insight.color}-card`}>
                  <div style={{fontSize:'18px',marginBottom:'6px'}}>{insight.icon}</div>
                  <div style={{fontSize:'11px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'3px'}}>{insight.title}</div>
                  <div style={{fontFamily:'Syne',fontSize:'14px',fontWeight:700,color:insight.color === 'green' ? 'var(--safe)' : insight.color === 'danger' ? 'var(--danger)' : insight.color === 'warn' ? 'var(--warn)' : 'var(--purple)'}}>{insight.value}</div>
                  <div style={{fontSize:'11px',color:'var(--muted)',marginTop:'2px'}}>{insight.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Insight */}
        <div className="personal-insight fade-up delay-5">
          <div style={{fontSize:'24px'}}>💡</div>
          <div>
            <div style={{fontSize:'11px',textTransform:'uppercase',letterSpacing:'.1em',color:'var(--accent)',fontWeight:700,marginBottom:'5px'}}>✦ Personal Insight</div>
            <div style={{fontSize:'13.5px',color:'var(--text)',lineHeight:1.6}}>You're performing above class average in 5 of 6 subjects. Keep attending Physics Lab consistently — just 4 more sessions will clear the 75% threshold and secure your exam eligibility.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
