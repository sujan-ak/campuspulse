import { useState, useEffect } from 'react';

interface Student {
  id: number;
  name: string;
  roll: string;
  initials: string;
  color: string;
  status: 'Present' | 'Late' | 'Absent' | 'Excused';
  scanTime: string | null;
  attendance: number;
  selected: boolean;
  flagged: boolean;
}

interface TimelineItem {
  name: string;
  roll: string;
  time: string;
  late: boolean;
  color: string;
  initials: string;
}

interface Alert {
  name: string;
  title: string;
  desc: string;
  time: string;
  type: string;
}

const TOTAL = 42;
const AVATARS = [
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#3b82f6,#8b5cf6)',
  'linear-gradient(135deg,#10b981,#0ea5c8)',
  'linear-gradient(135deg,#ec4899,#f97316)',
  'linear-gradient(135deg,#6366f1,#0ea5c8)',
  'linear-gradient(135deg,#14b8a6,#3b82f6)',
  'linear-gradient(135deg,#f97316,#eab308)',
  'linear-gradient(135deg,#a855f7,#ec4899)',
  'linear-gradient(135deg,#22c55e,#0ea5c8)',
  'linear-gradient(135deg,#ef4444,#a855f7)',
];
const NAMES = [
  'Priya Sharma','Alex Johnson','Sam Wilson','Maya Chen','Riya Kapoor',
  'Dev Patel','Ananya Singh','Rahul Mehta','Sneha Rao','Arjun Kumar',
  'Kavya Nair','Vikram Singh','Pooja Iyer','Rohan Verma','Aisha Khan',
  'Kiran Reddy','Tanvi Gupta','Nikhil Das','Sanya Malhotra','Aditya Joshi',
  'Preeti Sharma','Manish Tiwari','Divya Menon','Sahil Bhat','Nisha Patil',
  'Amit Chauhan','Shruti Sinha','Varun Nair','Deepa Pillai','Raj Patel',
  'Meera Krishnan','Suresh Kumar','Anjali Deo','Harish Rao','Lakshmi Iyer',
  'Pranav Shah','Smita Joshi','Chirag Mishra','Neha Tomar','Ganesh Pillai',
  'Ritu Varma','Yash Dubey'
];

const AttendanceMonitor = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [qrCode, setQrCode] = useState('');
  const [qrCountdown, setQrCountdown] = useState(30);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [alertsList, setAlertsList] = useState<Alert[]>([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const initStudents = NAMES.map((n, i) => ({
      id: i + 1,
      name: n,
      roll: `22CS${1001 + i}`,
      initials: n.split(' ').map(w => w[0]).join('').slice(0, 2),
      color: AVATARS[i % AVATARS.length],
      status: 'Absent' as const,
      scanTime: null,
      attendance: Math.floor(60 + Math.random() * 38),
      selected: false,
      flagged: false,
    }));
    setStudents(initStudents);
    setQrCode(genCode());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown(prev => {
        if (prev <= 1) {
          setQrCode(genCode());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (students.length === 0) return;
    
    const order = [0,2,4,1,6,8,3,7,5,10,12,15,9,11,14,16,19,13,18,17];
    let idx = 0;
    const scanTimer = setInterval(() => {
      if (idx >= order.length) {
        clearInterval(scanTimer);
        return;
      }
      setStudents(prev => {
        const updated = [...prev];
        const s = updated[order[idx]];
        if (!s) return prev;
        
        const isLate = Math.random() < 0.18;
        s.status = isLate ? 'Late' : 'Present';
        s.scanTime = new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
        if (isLate) s.flagged = Math.random() < 0.3;
        
        setTimeline(prev => [{
          name: s.name,
          roll: s.roll,
          time: s.scanTime!,
          late: isLate,
          color: s.color,
          initials: s.initials
        }, ...prev]);
        
        if (s.flagged) {
          setAlertsList(prev => [{
            name: s.name,
            title: 'Proxy flag',
            desc: `Duplicate device detected for ${s.name}`,
            time: s.scanTime!,
            type: 'flag'
          }, ...prev]);
        }
        
        return updated;
      });
      idx++;
    }, 2200);
    return () => clearInterval(scanTimer);
  }, [students.length]);

  const genCode = () => {
    const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({length: 6}, () => c[Math.floor(Math.random() * c.length)]).join('');
  };

  const stats = {
    present: students.filter(s => s.status === 'Present' || s.status === 'Late').length,
    absent: students.filter(s => s.status === 'Absent').length,
    late: students.filter(s => s.status === 'Late').length,
    flagged: students.filter(s => s.flagged).length,
    rate: Math.round(((students.filter(s => s.status === 'Present' || s.status === 'Late').length) / TOTAL) * 100)
  };

  const getFiltered = () => {
    return students.filter(s => {
      const q = searchQuery.toLowerCase();
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q);
      const matchF = currentFilter === 'all' || s.status.toLowerCase() === currentFilter;
      return matchQ && matchF;
    });
  };

  const filtered = getFiltered();
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const slice = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <style>{`
        :root{--bg:#0d1117;--bg2:#141b26;--bg3:#1a2436;--bg4:#1f2d40;--border:rgba(255,255,255,0.07);--border-h:rgba(255,255,255,0.12);--teal:#0ea5c8;--teal-dim:rgba(14,165,200,0.13);--teal-glow:rgba(14,165,200,0.28);--blue:#2563eb;--green:#22c55e;--green-dim:rgba(34,197,94,0.12);--amber:#f59e0b;--amber-dim:rgba(245,158,11,0.12);--red:#ef4444;--red-dim:rgba(239,68,68,0.12);--purple:#a855f7;--purple-dim:rgba(168,85,247,0.12);--text:#e2e8f0;--muted:#64748b;--muted2:#94a3b8}
        .attendance-monitor{width:100%;padding:28px 36px 52px;font-family:'DM Sans',sans-serif;color:var(--text)}
        .am-topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px}
        .am-tb-left h1{font-family:'Syne',sans-serif;font-size:22px;font-weight:700}
        .am-tb-left h1 span{color:var(--teal)}
        .am-tb-left p{font-size:13px;color:var(--muted2);margin-top:2px}
        .am-tb-right{display:flex;gap:10px;align-items:center}
        .am-live-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 13px;border-radius:20px;font-size:12px;font-weight:600;background:var(--green-dim);color:var(--green);border:1px solid rgba(34,197,94,.28)}
        .am-live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);animation:blink 1.4s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .am-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:10px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:500;transition:all .2s}
        .am-btn svg{width:15px;height:15px}
        .am-btn-ghost{background:var(--bg2);border:1px solid var(--border);color:var(--muted2)}
        .am-btn-ghost:hover{border-color:var(--teal);color:var(--teal)}
        .am-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:20px;animation:fadeUp .35s ease both}
        .am-sc{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px 18px;transition:border-color .2s,transform .2s}
        .am-sc:hover{border-color:var(--border-h);transform:translateY(-1px)}
        .am-sc.am-acc{background:linear-gradient(135deg,#0ea5c8 0%,#1d4ed8 100%);border-color:transparent}
        .am-sv{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;line-height:1;margin-bottom:4px}
        .am-sk{font-size:11px;color:var(--muted2);font-weight:500;text-transform:uppercase;letter-spacing:.05em}
        .am-sc.am-acc .am-sk,.am-sc.am-acc .am-sv,.am-sc.am-acc .am-s-trend{color:#fff}
        .am-s-trend{font-size:11px;margin-top:5px;font-weight:500}
        .am-session-bar{background:linear-gradient(135deg,rgba(14,165,200,.12),rgba(37,99,235,.08));border:1px solid rgba(14,165,200,.22);border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:24px;margin-bottom:18px;flex-wrap:wrap;animation:fadeUp .38s .04s ease both}
        .am-qr-mini{width:52px;height:52px;background:var(--bg3);border:1px solid rgba(14,165,200,.3);border-radius:9px;display:grid;place-items:center;position:relative;overflow:hidden}
        .am-qr-prog{position:absolute;bottom:0;left:0;height:2px;background:var(--teal);transition:width .9s linear}
        .am-sb-item{display:flex;flex-direction:column;gap:2px}
        .am-si-lbl{font-size:10px;color:var(--muted2);text-transform:uppercase;letter-spacing:.07em;font-weight:600}
        .am-si-val{font-size:13.5px;font-weight:600;color:var(--text)}
        .am-sb-divider{width:1px;height:36px;background:var(--border)}
        .am-cd-pill{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:var(--bg3);border:1px solid var(--border);font-size:12px;font-weight:600;color:var(--teal);margin-left:auto}
        .am-cd-pill svg{width:13px;height:13px}
        .am-layout{display:grid;grid-template-columns:1fr 308px;gap:16px;align-items:start;animation:fadeUp .4s .08s ease both}
        .am-card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden}
        .am-card-header{display:flex;align-items:center;justify-content:space-between;padding:18px 22px 0;margin-bottom:16px}
        .am-ct{font-family:'Syne',sans-serif;font-size:14px;font-weight:700}
        .am-filter-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .am-search-wrap{position:relative;flex:1;min-width:180px}
        .am-search-wrap svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:var(--muted);pointer-events:none}
        .am-search-wrap input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:9px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;padding:9px 12px 9px 36px;outline:none;transition:border-color .2s,box-shadow .2s}
        .am-search-wrap input:focus{border-color:var(--teal);box-shadow:0 0 0 3px var(--teal-dim)}
        .am-search-wrap input::placeholder{color:var(--muted)}
        .am-filter-chip{padding:7px 14px;border-radius:8px;border:1px solid var(--border);background:var(--bg3);font-size:12.5px;color:var(--muted2);cursor:pointer;transition:all .2s;font-weight:500;white-space:nowrap}
        .am-filter-chip:hover{border-color:rgba(14,165,200,.35);color:var(--text)}
        .am-filter-chip.am-sel{background:var(--teal-dim);border-color:var(--teal);color:var(--teal);font-weight:600}
        .am-table-wrap{overflow-x:auto}
        .am-table-wrap table{width:100%;border-collapse:collapse}
        .am-table-wrap thead th{font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--muted);padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);white-space:nowrap}
        .am-table-wrap thead th:first-child{padding-left:20px}
        .am-table-wrap tbody tr{transition:background .15s;cursor:pointer}
        .am-table-wrap tbody tr:hover{background:rgba(255,255,255,.025)}
        .am-table-wrap tbody td{padding:11px 16px;font-size:13.5px;border-bottom:1px solid var(--border);vertical-align:middle}
        .am-table-wrap tbody td:first-child{padding-left:20px}
        .am-table-wrap tbody tr:last-child td{border-bottom:none}
        .am-student-cell{display:flex;align-items:center;gap:10px}
        .am-av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:#fff}
        .am-s-name{font-size:13.5px;font-weight:500}
        .am-s-roll{font-size:11px;color:var(--muted);margin-top:1px}
        .am-status-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600}
        .am-sb-present{background:var(--green-dim);color:var(--green);border:1px solid rgba(34,197,94,.25)}
        .am-sb-absent{background:var(--red-dim);color:var(--red);border:1px solid rgba(239,68,68,.22)}
        .am-sb-late{background:var(--amber-dim);color:var(--amber);border:1px solid rgba(245,158,11,.25)}
        .am-time-cell{font-size:12.5px;color:var(--muted2)}
        .am-time-ok{font-size:12.5px;color:var(--green)}
        .am-time-late{font-size:12.5px;color:var(--amber)}
        .am-att-pct-wrap{display:flex;align-items:center;gap:8px}
        .am-pct-bar{flex:1;height:4px;background:var(--bg4);border-radius:2px;min-width:60px}
        .am-pct-fill{height:100%;border-radius:2px;transition:width .4s ease}
        .am-pct-val{font-size:12px;font-weight:600;min-width:32px;text-align:right}
        .am-pagination{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-top:1px solid var(--border)}
        .am-pg-info{font-size:12.5px;color:var(--muted2)}
        .am-pg-btns{display:flex;gap:6px}
        .am-pg-btn{width:32px;height:32px;border-radius:8px;border:1px solid var(--border);background:var(--bg3);color:var(--muted2);cursor:pointer;display:grid;place-items:center;transition:all .2s;font-size:13px;font-weight:600}
        .am-pg-btn:hover{border-color:var(--teal);color:var(--teal)}
        .am-pg-btn.am-active{background:var(--teal);border-color:var(--teal);color:#fff}
        .am-pg-btn svg{width:13px;height:13px}
        .am-rp{display:flex;flex-direction:column;gap:14px}
        .am-donut-card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden}
        .am-donut-head{padding:16px 18px;background:linear-gradient(135deg,rgba(14,165,200,.14),rgba(37,99,235,.09));border-bottom:1px solid var(--border)}
        .am-donut-head h3{font-family:'Syne',sans-serif;font-size:14px;font-weight:700}
        .am-donut-body{padding:18px}
        .am-donut-wrap{position:relative;width:120px;height:120px;margin:0 auto 16px}
        .am-donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .am-donut-pct{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--teal);line-height:1}
        .am-donut-lbl{font-size:10px;color:var(--muted2);text-transform:uppercase;letter-spacing:.06em;margin-top:3px}
        .am-stat-row-mini{display:flex;align-items:center;justify-content:space-between;font-size:12.5px;padding:7px 0;border-bottom:1px solid var(--border)}
        .am-stat-row-mini:last-child{border-bottom:none}
        .am-srm-key{display:flex;align-items:center;gap:7px;color:var(--muted2)}
        .am-srm-dot{width:8px;height:8px;border-radius:50%}
        .am-srm-val{font-weight:600}
        .am-timeline-card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden}
        .am-tl-head{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
        .am-tl-head h3{font-family:'Syne',sans-serif;font-size:13px;font-weight:700}
        .am-tl-body{padding:14px 18px;display:flex;flex-direction:column;gap:0;max-height:240px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--bg3) transparent}
        .am-tl-item{display:flex;align-items:flex-start;gap:10px;padding-bottom:14px;position:relative}
        .am-tl-item:last-child{padding-bottom:0}
        .am-tl-item::before{content:'';position:absolute;left:8px;top:20px;width:1px;height:calc(100% - 8px);background:var(--border)}
        .am-tl-item:last-child::before{display:none}
        .am-tl-dot{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;z-index:1}
        .am-tl-dot svg{width:9px;height:9px}
        .am-tl-info{flex:1}
        .am-tl-name{font-size:12.5px;font-weight:500}
        .am-tl-meta{font-size:11px;color:var(--muted);margin-top:2px}
        .am-alert-card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden}
        .am-al-head{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
        .am-al-head h3{font-family:'Syne',sans-serif;font-size:13px;font-weight:700}
        .am-al-item{display:flex;align-items:center;gap:10px;padding:11px 18px;border-bottom:1px solid var(--border);font-size:12.5px}
        .am-al-item:last-child{border-bottom:none}
        .am-al-icon{width:28px;height:28px;border-radius:7px;display:grid;place-items:center}
        .am-al-icon svg{width:13px;height:13px}
        .am-al-text{flex:1;line-height:1.4}
        .am-al-text strong{display:block;font-size:13px;font-weight:500}
        .am-al-time{font-size:11px;color:var(--muted)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    <div className="attendance-monitor">
      <div className="am-topbar">
        <div className="am-tb-left">
          <h1>Attendance <span>Monitor</span></h1>
          <p>Real-time tracking · Data Structures — Saturday, March 8, 2026</p>
        </div>
        <div className="am-tb-right">
          <div className="am-live-badge">
            <span className="am-live-dot"></span> Session Live
          </div>
          <button className="am-btn am-btn-ghost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      <div className="am-stats">
        <div className="am-sc am-acc">
          <div className="am-sv">{stats.present}</div>
          <div className="am-sk">Present</div>
          <div className="am-s-trend">of {TOTAL} students</div>
        </div>
        <div className="am-sc">
          <div className="am-sv" style={{color: 'var(--red)'}}>{stats.absent}</div>
          <div className="am-sk">Absent</div>
        </div>
        <div className="am-sc">
          <div className="am-sv" style={{color: 'var(--amber)'}}>{stats.late}</div>
          <div className="am-sk">Late</div>
        </div>
        <div className="am-sc">
          <div className="am-sv" style={{color: 'var(--teal)'}}>{stats.rate}%</div>
          <div className="am-sk">Attendance Rate</div>
        </div>
        <div className="am-sc">
          <div className="am-sv" style={{color: 'var(--purple)'}}>{stats.flagged}</div>
          <div className="am-sk">Flagged</div>
        </div>
      </div>

      <div className="am-session-bar">
        <div className="am-qr-mini">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5c8" strokeWidth="1.5">
            <rect x="3" y="3" width="5" height="5"/>
            <rect x="16" y="3" width="5" height="5"/>
            <rect x="3" y="16" width="5" height="5"/>
            <path d="M21 21h-3v-3m0 3v-3h-3m6-3h-3m-3 0h-3v3m0 3h3"/>
          </svg>
          <div className="am-qr-prog" style={{width: `${(qrCountdown/30)*100}%`}}></div>
        </div>
        <div className="am-sb-item">
          <div className="am-si-lbl">Session Code</div>
          <div className="am-si-val" style={{color: 'var(--teal)', fontFamily: "'Syne',sans-serif", letterSpacing: '.1em'}}>{qrCode}</div>
        </div>
        <div className="am-sb-divider"></div>
        <div className="am-sb-item">
          <div className="am-si-lbl">Subject</div>
          <div className="am-si-val">Data Structures</div>
        </div>
        <div className="am-sb-divider"></div>
        <div className="am-sb-item">
          <div className="am-si-lbl">Time</div>
          <div className="am-si-val">10:00 AM – 11:00 AM</div>
        </div>
        <div className="am-cd-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          QR refreshes in <strong>{qrCountdown}s</strong>
        </div>
      </div>

      <div className="am-layout">
        <div className="am-card">
          <div className="am-card-header">
            <div className="am-ct">Student Roster</div>
          </div>

          <div style={{padding: '0 22px 14px'}}>
            <div className="am-filter-bar">
              <div className="am-search-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search by name or roll number…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={`am-filter-chip ${currentFilter === 'all' ? 'am-sel' : ''}`} onClick={() => setCurrentFilter('all')}>
                All ({TOTAL})
              </div>
              <div className={`am-filter-chip ${currentFilter === 'present' ? 'am-sel' : ''}`} onClick={() => setCurrentFilter('present')}>
                Present ({students.filter(s => s.status === 'Present').length})
              </div>
              <div className={`am-filter-chip ${currentFilter === 'late' ? 'am-sel' : ''}`} onClick={() => setCurrentFilter('late')}>
                Late ({stats.late})
              </div>
              <div className={`am-filter-chip ${currentFilter === 'absent' ? 'am-sel' : ''}`} onClick={() => setCurrentFilter('absent')}>
                Absent ({stats.absent})
              </div>
            </div>
          </div>

          <div className="am-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Scanned At</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {slice.map(s => {
                  const badge = s.status === 'Present' ? 'am-sb-present' : s.status === 'Late' ? 'am-sb-late' : 'am-sb-absent';
                  const pctColor = s.attendance >= 75 ? 'var(--green)' : s.attendance >= 50 ? 'var(--amber)' : 'var(--red)';
                  return (
                    <tr key={s.id}>
                      <td style={{color: 'var(--muted)', fontSize: '12px'}}>{s.id}</td>
                      <td>
                        <div className="am-student-cell">
                          <div className="am-av" style={{background: s.color}}>{s.initials}</div>
                          <div>
                            <div className="am-s-name">{s.name}</div>
                            <div className="am-s-roll">{s.roll}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`am-status-badge ${badge}`}>
                          {s.flagged ? '⚑ ' : ''}{s.status}
                        </span>
                      </td>
                      <td>
                        <span className={s.status === 'Present' ? 'am-time-ok' : s.status === 'Late' ? 'am-time-late' : 'am-time-cell'}>
                          {s.scanTime || '—'}
                        </span>
                      </td>
                      <td>
                        <div className="am-att-pct-wrap">
                          <div className="am-pct-bar">
                            <div className="am-pct-fill" style={{width: `${s.attendance}%`, background: pctColor}}></div>
                          </div>
                          <span className="am-pct-val" style={{color: pctColor}}>{s.attendance}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="am-pagination">
            <div className="am-pg-info">Showing {(currentPage-1)*perPage+1}–{Math.min(currentPage*perPage, filtered.length)} of {filtered.length} students</div>
            <div className="am-pg-btns">
              <button className="am-pg-btn" onClick={() => setCurrentPage(Math.max(1, currentPage-1))}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => (
                <button 
                  key={i+1} 
                  className={`am-pg-btn ${currentPage === i+1 ? 'am-active' : ''}`}
                  onClick={() => setCurrentPage(i+1)}
                >
                  {i+1}
                </button>
              ))}
              <button className="am-pg-btn" onClick={() => setCurrentPage(Math.min(totalPages, currentPage+1))}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="am-rp">
          <div className="am-donut-card">
            <div className="am-donut-head">
              <h3>Session Overview</h3>
            </div>
            <div className="am-donut-body">
              <div className="am-donut-wrap">
                <svg width="120" height="120" style={{transform: 'rotate(-90deg)'}}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg3)" strokeWidth="10"/>
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="var(--teal)" 
                    strokeWidth="10" 
                    strokeLinecap="round"
                    strokeDasharray={`${(2*Math.PI*50)*(stats.present/TOTAL)} ${2*Math.PI*50}`}
                  />
                </svg>
                <div className="am-donut-center">
                  <div className="am-donut-pct">{stats.rate}%</div>
                  <div className="am-donut-lbl">present</div>
                </div>
              </div>
              <div className="am-stat-row-mini">
                <div className="am-srm-key">
                  <div className="am-srm-dot" style={{background: 'var(--green)'}}></div>
                  Present
                </div>
                <div className="am-srm-val" style={{color: 'var(--green)'}}>{students.filter(s => s.status === 'Present').length}</div>
              </div>
              <div className="am-stat-row-mini">
                <div className="am-srm-key">
                  <div className="am-srm-dot" style={{background: 'var(--amber)'}}></div>
                  Late
                </div>
                <div className="am-srm-val" style={{color: 'var(--amber)'}}>{stats.late}</div>
              </div>
              <div className="am-stat-row-mini">
                <div className="am-srm-key">
                  <div className="am-srm-dot" style={{background: 'var(--red)'}}></div>
                  Absent
                </div>
                <div className="am-srm-val" style={{color: 'var(--red)'}}>{stats.absent}</div>
              </div>
            </div>
          </div>

          <div className="am-timeline-card">
            <div className="am-tl-head">
              <h3>Recent Scans</h3>
              <span style={{fontSize: '11px', color: 'var(--teal)'}}>{timeline.length} scans</span>
            </div>
            <div className="am-tl-body">
              {timeline.length === 0 ? (
                <div style={{padding: '20px 0', textAlign: 'center', color: 'var(--muted)', fontSize: '12.5px'}}>
                  No scans yet. Session is live.
                </div>
              ) : (
                timeline.slice(0, 12).map((t, i) => (
                  <div key={i} className="am-tl-item">
                    <div className="am-tl-dot" style={{background: t.late ? 'var(--amber-dim)' : 'var(--green-dim)'}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={t.late ? 'var(--amber)' : 'var(--green)'} strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div className="am-tl-info">
                      <div className="am-tl-name">{t.name}</div>
                      <div className="am-tl-meta">{t.roll} · {t.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="am-alert-card">
            <div className="am-al-head">
              <h3>Alerts</h3>
              <span className="am-status-badge am-sb-absent" style={{fontSize: '10px', padding: '2px 8px'}}>{alertsList.length}</span>
            </div>
            <div>
              {alertsList.length === 0 ? (
                <div className="am-al-item" style={{color: 'var(--muted)', fontSize: '12.5px', padding: '16px 18px'}}>
                  No alerts yet. Proxy detection is active.
                </div>
              ) : (
                alertsList.slice(0, 5).map((a, i) => (
                  <div key={i} className="am-al-item">
                    <div className="am-al-icon" style={{background: 'var(--red-dim)'}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div className="am-al-text">
                      <strong>{a.title}</strong>
                      {a.desc}
                    </div>
                    <div className="am-al-time">{a.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AttendanceMonitor;
