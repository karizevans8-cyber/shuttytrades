 'use client';
import {useMemo,useState} from 'react';
import {BarChart3, Bell, BookOpen, ChevronDown, CircleHelp, Clock3, Copy, CreditCard, FileText, Home, Menu, Search, Settings, ShieldCheck, TrendingDown, TrendingUp, User, Wallet, X, Zap} from 'lucide-react';

type Market={pair:string,bid:number,ask:number,change:number};
type Position={id:number,pair:string,side:'BUY'|'SELL',lots:number,entry:number,current:number,pl:number};

const markets:Market[]=[
 {pair:'EUR/USD',bid:1.17384,ask:1.17396,change:0.42},
 {pair:'GBP/USD',bid:1.35112,ask:1.35128,change:-0.18},
 {pair:'USD/JPY',bid:147.842,ask:147.861,change:0.31},
 {pair:'AUD/USD',bid:0.66218,ask:0.66229,change:-0.07},
 {pair:'USD/CAD',bid:1.38412,ask:1.38428,change:0.21},
 {pair:'USD/CHF',bid:0.79732,ask:0.79746,change:-0.12}
];

export default function Page(){
 const [tab,setTab]=useState('Home');
 const [selected,setSelected]=useState(markets[0]);
 const [side,setSide]=useState<'BUY'|'SELL'>('BUY');
 const [lots,setLots]=useState(0.10);
 const [sl,setSl]=useState('');
 const [tp,setTp]=useState('');
 const [search,setSearch]=useState('');
 const [positions,setPositions]=useState<Position[]>([]);
 const [balance,setBalance]=useState(10000);
 const [toast,setToast]=useState('');
 const [menu,setMenu]=useState(false);

 const visible=useMemo(()=>markets.filter(m=>m.pair.toLowerCase().includes(search.toLowerCase())),[search]);
 const equity=balance+positions.reduce((s,p)=>s+p.pl,0);
 const showToast=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),2400)};

 function openTrade(){
   const price=side==='BUY'?selected.ask:selected.bid;
   const p:Position={id:Date.now(),pair:selected.pair,side,lots,entry:price,current:price,pl:0};
   setPositions(x=>[p,...x]); showToast(`${side} ${lots.toFixed(2)} lot ${selected.pair} opened`);
 }
 function closeTrade(id:number){
   const p=positions.find(x=>x.id===id); if(!p)return;
   setBalance(b=>b+p.pl); setPositions(x=>x.filter(y=>y.id!==id)); showToast(`${p.pair} position closed`);
 }
 const nav=[
  ['Home',Home],['Markets',BarChart3],['Portfolio',Wallet],['History',Clock3],['Profile',User]
 ] as const;

 return <main>
  <div className="demo"><ShieldCheck size={15}/> DEMO MODE • REAL MONEY IS INACTIVE</div>
  <header className="top">
   <div className="brand"><div className="logo">S</div><div><b>ShuttyTrades</b><small>Trade smarter, not harder</small></div></div>
   <div className="topActions"><button className="icon"><Bell size={19}/></button><button className="avatar" onClick={()=>setTab('Profile')}>PE</button><button className="icon mobileMenu" onClick={()=>setMenu(!menu)}><Menu/></button></div>
  </header>
  <div className="shell">
   <aside className={menu?'open':''}>
    <div className="sideTitle">WORKSPACE</div>
    {nav.map(([name,Icon])=><button key={name} className={tab===name?'active':''} onClick={()=>{setTab(name);setMenu(false)}}><Icon size={19}/>{name}</button>)}
    <div className="sideTitle">MORE</div>
    {[
      ['Learning',BookOpen],['KYC Demo',FileText],['Support',CircleHelp],['Settings',Settings]
    ].map(([name,Icon])=><button key={name as string} onClick={()=>showToast(`${name} section selected`)}><Icon size={19}/>{name as string}</button>)}
    <div className="sideCard"><Zap size={18}/><b>Demo account</b><span>Starting balance $10,000</span></div>
   </aside>

   <section className="content">
    {tab==='Home' && <HomeView balance={balance} equity={equity} positions={positions} setTab={setTab}/>}
    {tab==='Markets' && <MarketsView visible={visible} search={search} setSearch={setSearch} selected={selected} setSelected={setSelected} />}
    {tab==='Portfolio' && <PortfolioView positions={positions} equity={equity} closeTrade={closeTrade}/>}
    {tab==='History' && <HistoryView positions={positions}/>}
    {tab==='Profile' && <ProfileView showToast={showToast}/>}

    {(tab==='Home'||tab==='Markets') && <section className="tradeGrid">
      <div className="panel chartPanel">
       <div className="panelHead"><div><span className="eyebrow">LIVE DEMO QUOTE</span><h2>{selected.pair}</h2></div><div className="quote"><b>{selected.bid.toFixed(selected.pair==='USD/JPY'?3:5)}</b><small> / {selected.ask.toFixed(selected.pair==='USD/JPY'?3:5)}</small></div></div>
       <div className="chart">
        <div className="gridlines"></div>
        <svg viewBox="0 0 700 280" preserveAspectRatio="none"><polyline points="0,205 35,190 70,210 105,165 140,178 175,130 210,145 245,112 280,138 315,96 350,115 385,82 420,105 455,76 490,95 525,60 560,84 595,50 630,70 665,35 700,52" fill="none" stroke="currentColor" strokeWidth="3"/></svg>
        <div className="priceTag">{selected.ask.toFixed(selected.pair==='USD/JPY'?3:5)}</div>
       </div>
       <div className="ranges"><span>1H</span><span>4H</span><span className="selected">1D</span><span>1W</span><span>1M</span></div>
      </div>
      <div className="panel ticket">
       <div className="panelHead"><div><span className="eyebrow">ORDER TICKET</span><h2>Place demo trade</h2></div><span className="pill">Virtual funds</span></div>
       <div className="seg"><button className={side==='BUY'?'buy':''} onClick={()=>setSide('BUY')}>BUY <span>{selected.ask}</span></button><button className={side==='SELL'?'sell':''} onClick={()=>setSide('SELL')}>SELL <span>{selected.bid}</span></button></div>
       <label>Market</label><select value={selected.pair} onChange={e=>setSelected(markets.find(m=>m.pair===e.target.value)!)}>{markets.map(m=><option key={m.pair}>{m.pair}</option>)}</select>
       <label>Lot size</label><div className="lot"><button onClick={()=>setLots(Math.max(.01,+(lots-.01).toFixed(2)))}>-</button><strong>{lots.toFixed(2)}</strong><button onClick={()=>setLots(+(lots+.01).toFixed(2))}>+</button></div>
       <div className="two"><div><label>Stop loss</label><input value={sl} onChange={e=>setSl(e.target.value)} placeholder="Optional"/></div><div><label>Take profit</label><input value={tp} onChange={e=>setTp(e.target.value)} placeholder="Optional"/></div></div>
       <button className={side==='BUY'?'primary buyBtn':'primary sellBtn'} onClick={openTrade}>{side} {selected.pair} <span>→</span></button>
       <p className="note">Demo only. No real funds are deposited, held or executed.</p>
      </div>
    </section>}

    <section className="panel positions">
      <div className="panelHead"><div><span className="eyebrow">ACCOUNT</span><h2>Open positions</h2></div><button className="link" onClick={()=>setTab('Portfolio')}>View portfolio →</button></div>
      {positions.length===0?<div className="empty"><Wallet size={25}/><b>No open positions</b><span>Your demo trades will appear here.</span></div>:
       <div className="table">{positions.map(p=><div className="row" key={p.id}><b>{p.pair}</b><span className={p.side==='BUY'?'green':'red'}>{p.side}</span><span>{p.lots.toFixed(2)}</span><span>{p.entry}</span><span className="green">$0.00</span><button onClick={()=>closeTrade(p.id)}>Close</button></div>)}</div>}
    </section>
   </section>
  </div>
  <nav className="bottom">{nav.map(([name,Icon])=><button key={name} className={tab===name?'active':''} onClick={()=>setTab(name)}><Icon size={20}/><span>{name}</span></button>)}</nav>
  {toast&&<div className="toast">{toast}</div>}
 </main>
}

function HomeView({balance,equity,positions,setTab}:{balance:number,equity:number,positions:Position[],setTab:(x:string)=>void}){
 return <><div className="welcome"><div><span className="eyebrow">WELCOME BACK</span><h1>Good to see you, trader.</h1><p>Practice your strategy with virtual funds before anything real.</p></div><button className="outline" onClick={()=>setTab('Markets')}>Explore markets <TrendingUp size={17}/></button></div>
 <div className="cards"><div className="stat primaryStat"><span>Demo balance</span><strong>${balance.toLocaleString(undefined,{minimumFractionDigits:2})}</strong><small>Virtual funds</small></div><div className="stat"><span>Equity</span><strong>${equity.toLocaleString(undefined,{minimumFractionDigits:2})}</strong><small className="green">+0.00% today</small></div><div className="stat"><span>Open positions</span><strong>{positions.length}</strong><small>Demo trades</small></div><div className="stat"><span>Margin level</span><strong>—</strong><small>No margin used</small></div></div>
 <div className="quick"><button onClick={()=>setTab('Markets')}><BarChart3/>Markets<span>Find opportunities</span></button><button onClick={()=>setTab('Portfolio')}><Wallet/>Portfolio<span>Manage positions</span></button><button onClick={()=>setTab('Profile')}><ShieldCheck/>Verification<span>KYC demo</span></button></div></>
}
function MarketsView({visible,search,setSearch,selected,setSelected}:{visible:Market[],search:string,setSearch:(x:string)=>void,selected:Market,setSelected:(x:Market)=>void}){return <><div className="pageTitle"><span className="eyebrow">MARKETS</span><h1>Forex watchlist</h1><p>Demo quotes for the most popular currency pairs.</p></div><div className="search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search pairs…"/></div><div className="marketGrid">{visible.map(m=><button key={m.pair} className={selected.pair===m.pair?'market selectedMarket':'market'} onClick={()=>setSelected(m)}><div><b>{m.pair}</b><span>Forex</span></div><strong>{m.bid}</strong><small className={m.change>=0?'green':'red'}>{m.change>=0?'+':''}{m.change}%</small></button>)}</div></>}
function PortfolioView({positions,equity,closeTrade}:{positions:Position[],equity:number,closeTrade:(id:number)=>void}){return <><div className="pageTitle"><span className="eyebrow">PORTFOLIO</span><h1>Your demo portfolio</h1><p>Track your virtual positions and account value.</p></div><div className="cards"><div className="stat"><span>Equity</span><strong>${equity.toFixed(2)}</strong></div><div className="stat"><span>Positions</span><strong>{positions.length}</strong></div><div className="stat"><span>Unrealized P/L</span><strong>$0.00</strong></div></div><div className="panel"><div className="panelHead"><h2>Positions</h2></div>{positions.length?positions.map(p=><div className="portfolioRow" key={p.id}><div><b>{p.pair}</b><span>{p.side} • {p.lots.toFixed(2)} lots</span></div><b>$0.00</b><button onClick={()=>closeTrade(p.id)}>Close</button></div>):<div className="empty"><Wallet/><b>Portfolio is empty</b><span>Open a demo trade to see it here.</span></div>}</div></>}
function HistoryView({positions}:{positions:Position[]}){return <><div className="pageTitle"><span className="eyebrow">HISTORY</span><h1>Trade history</h1><p>Completed and current demo activity.</p></div><div className="panel"><div className="historyHead"><b>Activity</b><span>Demo account</span></div>{positions.length?positions.map(p=><div className="historyRow" key={p.id}><Clock3/><div><b>{p.side} {p.pair}</b><span>{p.lots.toFixed(2)} lots • Open position</span></div><strong>$0.00</strong></div>):<div className="empty"><Clock3/><b>No history yet</b><span>Your activity will appear here.</span></div>}</div></>}
function ProfileView({showToast}:{showToast:(x:string)=>void}){return <><div className="pageTitle"><span className="eyebrow">PROFILE</span><h1>Account settings</h1><p>Manage your demo profile and platform preferences.</p></div><div className="profileCard"><div className="bigAvatar">PE</div><div><h2>Prince Evans</h2><p>Demo trader • ShuttyTrades</p><span className="verified"><ShieldCheck size={15}/> Demo account</span></div></div><div className="settingsList">{[['Personal details',User],['Security',ShieldCheck],['Payment methods',CreditCard],['Notifications',Bell],['Help & support',CircleHelp]].map(([n,I])=><button key={n as string} onClick={()=>showToast(`${n} is available in the demo`)}><I size={19}/><span>{n as string}</span><ChevronDown size={17}/></button>)}</div></>}
