import { useState, useEffect } from 'react';

const Analytics = () => {
  const [range, setRange] = useState('30d');

  useEffect(() => {
    const timer = setTimeout(() => {
      renderWeekChart();
      renderSubjectDonut();
      renderLineChart();
      renderHeatmap();
      renderRankings();
      renderSubjects();
      renderInsights();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const renderWeekChart = () => {
    const data = [{d:'Mon',p:38,l:2,a:2},{d:'Tue',p:34,l:4,a:4},{d:'Wed',p:40,l:1,a:1},{d:'Thu',p:36,l:3,a:3},{d:'Fri',p:33,l:5,a:4},{d:'Sat',p:28,l:2,a:3},{d:'Sun',p:16,l:1,a:2}];
    const ch = document.getElementById('weekChart');
    if (!ch) return;
    const H = 140;
    const yl = document.getElementById('yLabels');
    if (yl) yl.innerHTML = [0,10,20,30,45].map(v => `<div class="yl">${v}</div>`).join('');
    ch.innerHTML = data.map((d,i) => {
      const ph = Math.round((d.p/45)*H), lh = Math.round((d.l/45)*H), ah = Math.round((d.a/45)*H);
      return `<div class="bg"><div class="bpair chart-tooltip-trigger" style="position:relative;cursor:pointer"><div class="bar p" style="height:${ph}px"></div><div class="bar l" style="height:${lh}px"></div><div class="bar a" style="height:${ah}px"></div><div class="chart-tooltip" style="position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.9);color:#fff;padding:8px 12px;border-radius:6px;font-size:11px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;margin-bottom:8px;z-index:10">Present: ${d.p}<br>Late: ${d.l}<br>Absent: ${d.a}</div></div><div class="bx ${i===2?'hl':''}">${d.d}</div></div>`;
    }).join('');
  };

  const renderSubjectDonut = () => {
    const subjects = [{name:'Data Structures',pct:91,color:'#0ea5c8'},{name:'Algorithms',pct:85,color:'#22c55e'},{name:'Database',pct:88,color:'#a855f7'},{name:'OS Lab',pct:79,color:'#f59e0b'},{name:'Math 101',pct:84,color:'#3b82f6'},{name:'Physics',pct:76,color:'#ef4444'}];
    const svg = document.getElementById('subjectDonutSVG');
    const legend = document.getElementById('subjectLegend');
    if (!svg || !legend) return;
    const R=45, cx=55, cy=55, circ=2*Math.PI*R;
    const total = subjects.reduce((s,x)=>s+x.pct,0);
    let offset=0;
    svg.innerHTML=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--bg3)" stroke-width="12"/>`;
    subjects.forEach(s=>{
      const dash=(s.pct/total)*circ;
      svg.innerHTML+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${s.color}" stroke-width="12" stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${-offset}" stroke-linecap="round" style="transform:rotate(-90deg);transform-origin:${cx}px ${cy}px"/>`;
      offset+=dash;
    });
    legend.innerHTML = subjects.map(s => `<div class="dl-row"><div class="dl-key"><div class="ld" style="background:${s.color}"></div>${s.name.split(' ')[0]}</div><div class="dl-bar-bg"><div class="dl-bar-fill" style="width:${s.pct}%;background:${s.color}"></div></div><div class="dl-val" style="color:${s.color}">${s.pct}%</div></div>`).join('');
  };

  const renderLineChart = () => {
    const svg = document.getElementById('lineChart');
    if (!svg) return;
    const data = [82,85,80,88,90,84,86,89,83,87,91,85,88,82,86,90,87,84,89,91,86,88,83,87,90,85,88,91];
    const W = svg.parentElement?.clientWidth || 700, H = 140, pad = 16;
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const pts = data.map((v,i) => [pad+(i/(data.length-1))*(W-pad*2), H-pad-(((v-70)/(100-70))*(H-pad*2))]);
    const ty = H-pad-(((75-70)/(100-70))*(H-pad*2));
    svg.innerHTML = `<defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0ea5c8" stop-opacity="0.25"/><stop offset="100%" stop-color="#0ea5c8" stop-opacity="0"/></linearGradient></defs><line x1="${pad}" y1="${ty}" x2="${W-pad}" y2="${ty}" stroke="rgba(14,165,200,0.2)" stroke-width="1.5" stroke-dasharray="5,4"/><path d="M${pts[0][0]},${H-pad} ${pts.map(p=>p[0]+','+p[1]).join(' ')} ${pts[data.length-1][0]},${H-pad}Z" fill="url(#areaGrad)"/><path d="M${pts.map(p=>p[0]+','+p[1]).join(' L ')}" fill="none" stroke="#0ea5c8" stroke-width="2" stroke-linejoin="round"/>${pts.filter((_,i)=>i%3===0).map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#0ea5c8"/>`).join('')}`;
    const xl = document.getElementById('lineXLabels');
    if (xl) xl.innerHTML = data.filter((_,i)=>i%4===0||i===data.length-1).map((v,i,arr)=>{const idx=i===arr.length-1?data.length-1:i*4;return `<span style="font-size:10px;color:var(--muted)">Mar ${idx+1}</span>`;}).join('');
  };

  const renderHeatmap = () => {
    const el = document.getElementById('heatmap');
    if (!el) return;
    const days = ['Mo','Tu','We','Th','Fr','Sa'];
    const cols = `<div class="hm-col-labels">${Array.from({length:5},(_,i)=>`<div class="hm-col-lbl">W${i+1}</div>`).join('')}</div>`;
    el.innerHTML = cols + days.map(d => {
      const cells = Array.from({length:5}, () => {
        const v = Math.random();
        const alpha = v<0.1?0.08:v<0.3?0.22:v<0.5?0.42:v<0.7?0.62:v<0.85?0.82:1;
        return `<div class="hm-cell" style="background:rgba(14,165,200,${alpha})"></div>`;
      }).join('');
      return `<div class="hm-row"><div class="hm-label">${d}</div><div class="hm-cells">${cells}</div></div>`;
    }).join('');
  };

  const renderRankings = () => {
    const students = [{name:'Priya Sharma',roll:'22CS1045',att:98,color:'linear-gradient(135deg,#f59e0b,#ef4444)'},{name:'Alex Johnson',roll:'22CS1012',att:95,color:'linear-gradient(135deg,#3b82f6,#8b5cf6)'},{name:'Maya Chen',roll:'22CS1078',att:93,color:'linear-gradient(135deg,#ec4899,#f97316)'},{name:'Sam Wilson',roll:'22CS1033',att:91,color:'linear-gradient(135deg,#10b981,#0ea5c8)'},{name:'Riya Kapoor',roll:'22CS1056',att:88,color:'linear-gradient(135deg,#6366f1,#0ea5c8)'},{name:'Dev Patel',roll:'22CS1021',att:85,color:'linear-gradient(135deg,#14b8a6,#3b82f6)'},{name:'Ananya Singh',roll:'22CS1067',att:82,color:'linear-gradient(135deg,#f97316,#eab308)'}];
    const table = document.getElementById('rankTable');
    if (!table) return;
    const ranks=['gold','silver','bronze','','','',''];
    table.innerHTML = `<thead><tr><th>#</th><th>Student</th><th>Attendance</th><th>Status</th></tr></thead><tbody>${students.map((s,i) => {const c=s.att>=90?'sb-ex':s.att>=85?'sb-gd':s.att>=75?'sb-av':'sb-lo';const cl=s.att>=90?'Excellent':s.att>=85?'Good':s.att>=75?'Average':'Low';const bc=s.att>=90?'var(--green)':s.att>=85?'var(--teal)':s.att>=75?'var(--amber)':'var(--red)';return `<tr><td><span class="rank-num ${ranks[i]||''}">${i+1}</span></td><td><div class="sc-cell"><div class="av" style="background:${s.color}">${s.name.split(' ').map(w=>w[0]).join('')}</div><div><div style="font-size:13px;font-weight:500">${s.name}</div><div style="font-size:11px;color:var(--muted)">${s.roll}</div></div></div></td><td><div class="pbar"><div class="pbar-bg"><div class="pbar-fill" style="width:${s.att}%;background:${bc}"></div></div><span class="pval" style="color:${bc}">${s.att}%</span></div></td><td><span class="sbadge ${c}">${cl}</span></td></tr>`;}).join('')}</tbody>`;
  };

  const renderSubjects = () => {
    const subjects = [{name:'Data Structures',pct:91,color:'#0ea5c8',trend:'+3%'},{name:'Algorithms',pct:85,color:'#22c55e',trend:'+1%'},{name:'Database Systems',pct:88,color:'#a855f7',trend:'+5%'},{name:'OS Lab',pct:79,color:'#f59e0b',trend:'-2%'},{name:'Math 101',pct:84,color:'#3b82f6',trend:'+2%'},{name:'Physics Lab',pct:76,color:'#ef4444',trend:'-1%'}];
    const list = document.getElementById('subjList');
    if (!list) return;
    list.innerHTML = subjects.map(s => `<div class="subj-row"><div class="subj-dot" style="background:${s.color}"></div><div class="subj-name">${s.name}</div><div class="subj-pbar"><div class="pbar"><div class="pbar-bg"><div class="pbar-fill" style="width:${s.pct}%;background:${s.color}"></div></div></div></div><div class="subj-pct" style="color:${s.color}">${s.pct}%</div><div class="subj-trend" style="color:${s.trend.startsWith('+')?'var(--green)':'var(--red)'};font-size:12px;font-weight:600">${s.trend}</div></div>`).join('');
  };

  const renderInsights = () => {
    const insights = [{icon:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>',color:'var(--teal-dim)',stroke:'var(--teal)',title:'Best Day',desc:'Wednesday has the highest avg attendance at 91%.'},{icon:'<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',color:'var(--red-dim)',stroke:'var(--red)',title:'At-Risk Alert',desc:'11 students are below the 75% threshold.'},{icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',color:'var(--amber-dim)',stroke:'var(--amber)',title:'Least Attended',desc:'Friday sessions average 5 late arrivals.'},{icon:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',color:'var(--green-dim)',stroke:'var(--green)',title:'Proxy Prevented',desc:'8 proxy attempts blocked this month.'}];
    const grid = document.getElementById('insightsGrid');
    if (!grid) return;
    grid.innerHTML = insights.map(i => `<div class="insight-card" style="background:${i.color};border-color:${i.color.replace('0.12)','0.25)')}"><div class="ins-icon" style="background:${i.color.replace('0.12)','0.2)')}"><svg viewBox="0 0 24 24" fill="none" stroke="${i.stroke}" stroke-width="2">${i.icon}</svg></div><div class="ins-title">${i.title}</div><div class="ins-desc">${i.desc}</div></div>`).join('');
  };

  return (
    <>
      <style>{`
        :root{--bg:#0d1117;--bg2:#141b26;--bg3:#1a2436;--border:rgba(255,255,255,0.07);--teal:#0ea5c8;--teal-dim:rgba(14,165,200,0.13);--green:#22c55e;--amber:#f59e0b;--red:#ef4444;--purple:#a855f7;--text:#e2e8f0;--muted:#64748b;--muted2:#94a3b8}
        .analytics-main{width:100%;padding:28px 36px 52px;overflow-y:auto}
        .topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
        .topbar h1{font-family:'Syne',sans-serif;font-size:22px;font-weight:700}
        .topbar h1 span{color:var(--teal)}
        .topbar p{font-size:13px;color:var(--muted2);margin-top:2px}
        .range-chips{display:flex;gap:4px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:3px}
        .rc{padding:6px 14px;border-radius:8px;font-size:12.5px;font-weight:500;color:var(--muted2);cursor:pointer;transition:all .2s;border:none;background:transparent}
        .rc.sel{background:var(--teal);color:#fff}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
        .sc{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:18px;position:relative}
        .sc.acc{background:linear-gradient(135deg,#0ea5c8,#1d4ed8);border-color:transparent}
        .sc .sv{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;line-height:1;margin-bottom:4px}
        .sc .sk{font-size:11px;color:var(--muted2);font-weight:500;text-transform:uppercase}
        .sc.acc .sk,.sc.acc .sv{color:#fff}
        .card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:16px}
        .ch{display:flex;align-items:center;justify-content:space-between;padding:18px 22px 0;margin-bottom:16px}
        .ct{font-family:'Syne',sans-serif;font-size:14px;font-weight:700}
        .cp{padding:20px 22px}
        .bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}
        .bg{flex:1;display:flex;flex-direction:column;align-items:center}
        .bpair{display:flex;align-items:flex-end;gap:3px;height:140px}
        .bar{border-radius:4px 4px 0 0;min-width:12px}
        .bar.p{background:linear-gradient(180deg,#1fd3f5,#0ea5c8)}
        .bar.l{background:linear-gradient(180deg,#fcd34d,#f59e0b);opacity:.9}
        .bar.a{background:linear-gradient(180deg,#f87171,#ef4444);opacity:.8}
        .bx{font-size:10.5px;color:var(--muted);margin-top:6px}
        .bx.hl{color:var(--teal);font-weight:600}
        .y-labels{display:flex;flex-direction:column-reverse;justify-content:space-between;padding-bottom:26px;width:28px;flex-shrink:0}
        .yl{font-size:10px;color:var(--muted);text-align:right;padding-right:6px;line-height:1}
        .chart-with-y{display:flex;gap:0}
        .hm-col-labels{display:flex;gap:3px;padding-left:32px;margin-bottom:4px}
        .hm-col-lbl{width:26px;font-size:10px;color:var(--muted);text-align:center}
        .av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
        .sc-cell{display:flex;align-items:center;gap:9px}
        .rank-num{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;width:20px}
        .rank-num.gold{color:#f59e0b}
        .rank-num.silver{color:#94a3b8}
        .rank-num.bronze{color:#b45309}
        .pbar{display:flex;align-items:center;gap:8px}
        .pbar-bg{flex:1;height:4px;background:var(--bg3);border-radius:2px;min-width:60px}
        .pbar-fill{height:100%;border-radius:2px}
        .pval{font-size:12px;font-weight:600;min-width:30px;text-align:right}
        .sbadge{display:inline-flex;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600}
        .sb-ex{background:var(--green-dim);color:var(--green);border:1px solid rgba(34,197,94,.25)}
        .sb-gd{background:var(--teal-dim);color:var(--teal);border:1px solid rgba(14,165,200,.25)}
        .sb-av{background:var(--amber-dim);color:var(--amber);border:1px solid rgba(245,158,11,.25)}
        .sb-lo{background:var(--red-dim);color:var(--red);border:1px solid rgba(239,68,68,.25)}
        .subj-pbar{flex:2}
        .subj-trend{font-size:11px;min-width:36px;text-align:right}
        .ins-icon{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;margin-bottom:10px}
        .ins-icon svg{width:14px;height:14px}
        .legend{display:flex;gap:14px}
        .li{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted2)}
        .btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:10px;border:none;cursor:pointer;font-size:13.5px;font-weight:500;transition:all .2s}
        .btn svg{width:15px;height:15px}
        .btn-ghost{background:var(--bg2);border:1px solid var(--border);color:var(--muted2)}
        .btn-ghost:hover{border-color:var(--teal);color:var(--teal)}
        .btn-primary{background:var(--teal);color:#fff;font-weight:600}
        .btn-primary:hover{filter:brightness(1.1)}
        .tip-card{background:linear-gradient(135deg,var(--purple-dim),var(--teal-dim));border:1px solid rgba(168,85,247,.2);border-radius:14px;padding:15px 18px;margin-top:16px}
        .tip-lbl{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--purple);margin-bottom:6px}
        .tip-txt{font-size:12.5px;color:var(--muted2);line-height:1.7}
        .donut-row{display:flex;align-items:center;gap:24px}
        .donut-wrap{position:relative;width:110px;height:110px}
        .dl-row{display:flex;align-items:center;justify-content:space-between;font-size:12.5px;margin-bottom:8px}
        .dl-key{display:flex;align-items:center;gap:7px;color:var(--muted2)}
        .ld{width:8px;height:8px;border-radius:50%}
        .dl-bar-bg{height:3px;flex:1;background:var(--bg3);border-radius:2px;margin:0 8px}
        .dl-bar-fill{height:100%;border-radius:2px}
        .dl-val{font-weight:600;min-width:28px;text-align:right}
        .heatmap{display:flex;flex-direction:column;gap:4px}
        .hm-row{display:flex;align-items:center;gap:4px}
        .hm-label{font-size:11px;color:var(--muted);width:28px;text-align:right}
        .hm-cells{display:flex;gap:3px}
        .hm-cell{width:26px;height:26px;border-radius:5px}
        .rank-table{width:100%;border-collapse:collapse}
        .rank-table th{font-size:10.5px;font-weight:700;text-transform:uppercase;color:var(--muted);padding:8px 14px;text-align:left;border-bottom:1px solid var(--border)}
        .rank-table td{padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border)}
        .subj-list{display:flex;flex-direction:column;gap:10px}
        .subj-row{display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg3);border-radius:9px}
        .subj-dot{width:10px;height:10px;border-radius:50%}
        .subj-name{font-size:13px;font-weight:500;flex:1}
        .subj-pct{font-size:13px;font-weight:600}
        .insights-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .insight-card{border-radius:10px;padding:14px 16px;border:1px solid var(--border)}
        .ins-title{font-size:13px;font-weight:600;margin-bottom:4px}
        .ins-desc{font-size:12px;color:var(--muted2)}
        .g13{display:grid;grid-template-columns:1.4fr 1fr;gap:16px;margin-bottom:16px}
        .g22{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
        .g31{display:grid;grid-template-columns:1fr 1.4fr;gap:16px;margin-bottom:16px}
        .chart-tooltip-trigger:hover .chart-tooltip{opacity:1}
      `}</style>

      <div className="analytics-main">
        <div className="topbar">
          <div>
            <h1>Attendance <span>Analytics</span></h1>
            <p>Computer Science · 3rd Year · Section A — Academic Year 2025–26</p>
          </div>
          <div className="range-chips">
            <button className="rc" onClick={() => setRange('7d')}>7D</button>
            <button className={`rc ${range === '30d' ? 'sel' : ''}`} onClick={() => setRange('30d')}>30D</button>
            <button className="rc" onClick={() => setRange('90d')}>3M</button>
            <button className="rc" onClick={() => setRange('sem')}>Semester</button>
          </div>
        </div>

        <div className="stats">
          <div className="sc acc">
            <div className="sv">87%</div>
            <div className="sk">Avg Attendance</div>
          </div>
          <div className="sc">
            <div className="sv" style={{color:'var(--green)'}}>186</div>
            <div className="sk">Total Students</div>
          </div>
          <div className="sc">
            <div className="sv" style={{color:'var(--amber)'}}>11</div>
            <div className="sk">At-Risk Students</div>
          </div>
          <div className="sc">
            <div className="sv" style={{color:'var(--teal)'}}>48</div>
            <div className="sk">Sessions This Month</div>
          </div>
        </div>

        <div className="g13">
          <div className="card">
            <div className="ch"><div className="ct">Weekly Attendance Trend</div></div>
            <div className="cp" style={{paddingTop:'4px'}}>
              <div className="chart-with-y">
                <div className="y-labels" id="yLabels"></div>
                <div style={{flex:1}}><div className="bar-chart" id="weekChart"></div></div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="ch"><div className="ct">By Subject</div></div>
            <div className="cp" style={{paddingTop:'4px'}}>
              <div className="donut-row">
                <div className="donut-wrap">
                  <svg width="110" height="110" id="subjectDonutSVG"></svg>
                  <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <div style={{fontFamily:'Syne',fontSize:'20px',fontWeight:800,color:'var(--teal)',lineHeight:1}}>87%</div>
                    <div style={{fontSize:'9px',color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.05em',marginTop:'2px'}}>overall</div>
                  </div>
                </div>
                <div style={{flex:1}} id="subjectLegend"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="ch">
            <div className="ct">Monthly Attendance Overview</div>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div className="legend">
                <div className="li"><div className="ld" style={{background:'var(--teal)'}}></div>Attendance %</div>
                <div className="li"><div className="ld" style={{background:'rgba(14,165,200,.2)',width:'18px',height:'3px',borderRadius:'2px'}}></div>Target 75%</div>
              </div>
            </div>
          </div>
          <div className="cp" style={{paddingTop:'4px'}}>
            <svg id="lineChart" width="100%" height="140"></svg>
            <div id="lineXLabels" style={{display:'flex',justifyContent:'space-between',padding:'0 4px',marginTop:'4px'}}></div>
          </div>
        </div>

        <div className="g22">
          <div className="card">
            <div className="ch"><div className="ct">Attendance Heatmap</div></div>
            <div className="cp" style={{paddingTop:'4px'}} id="heatmap"></div>
          </div>
          <div className="card">
            <div className="ch"><div className="ct">Student Rankings</div></div>
            <div style={{overflow:'hidden'}}><table className="rank-table" id="rankTable"></table></div>
          </div>
        </div>

        <div className="g31">
          <div className="card">
            <div className="ch"><div className="ct">Subject-wise Performance</div></div>
            <div className="cp" style={{paddingTop:'0'}} id="subjList"></div>
          </div>
          <div className="card">
            <div className="ch"><div className="ct">AI Insights</div></div>
            <div className="cp" style={{paddingTop:'0'}}><div className="insights-grid" id="insightsGrid"></div></div>
          </div>
        </div>

        <div className="tip-card">
          <div className="tip-lbl">✦ Analytics Summary</div>
          <div className="tip-txt">Overall attendance is <strong style={{color:'var(--teal)'}}>87%</strong> this month — above the 75% threshold. Wednesday consistently shows the highest attendance. 11 students are at risk; consider sending automated reminders before next week's sessions.</div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
