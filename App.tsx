import React, { useState } from 'react';
import { analyzeWebsite } from './services/geminiService';
import { WebAuditResult, LoadingState } from './types';
import ResultDashboard from './components/ResultDashboard';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [location, setLocation] = useState<string>('Vietnam');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<WebAuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loadingStep, setLoadingStep] = useState<string>('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let formattedUrl = url;
    if (!url.startsWith('http')) {
      formattedUrl = `https://${url}`;
    }

    setLoadingState(LoadingState.ANALYZING);
    setErrorMsg('');
    setResult(null);
    
    const steps = [
      `Kết nối server HiHi tại ${location}...`,
      `Giả lập thiết bị ${device === 'mobile' ? 'di động' : 'máy tính'}...`,
      "Quét Core Web Vitals...",
      "Đo lường khí thải Carbon...",
      "HiHi Brain đang tối ưu code...",
      "Tổng hợp báo cáo..."
    ];
    
    let stepIndex = 0;
    setLoadingStep(steps[0]);
    const intervalId = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStep(steps[stepIndex]);
    }, 1200);

    try {
      const data = await analyzeWebsite(formattedUrl, device, location);
      setResult(data);
      setLoadingState(LoadingState.COMPLETE);
    } catch (err: any) {
      setLoadingState(LoadingState.ERROR);
      setErrorMsg(err.message || "HiHi gặp chút sự cố khi phân tích.");
    } finally {
      clearInterval(intervalId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100 font-sans selection:bg-rose-500/30">
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 py-6 flex flex-col flex-grow">
        
        {/* Header Compact */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setLoadingState(LoadingState.IDLE); setUrl(''); setResult(null);}}>
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-rose-500/20 transform hover:scale-105 transition">
              H
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">HiHi <span className="text-rose-400 font-light">Analytics</span></h1>
          </div>
          <div className="flex gap-4 text-xs font-medium text-slate-400">
             <span className="hover:text-white cursor-pointer transition">Giới thiệu</span>
             <span className="hover:text-white cursor-pointer transition">HiHi AI</span>
          </div>
        </header>

        {/* Search Area */}
        <div className={`transition-all duration-700 ease-in-out ${loadingState === LoadingState.COMPLETE ? 'mb-6' : 'mb-12 mt-10'}`}>
           
           {loadingState === LoadingState.IDLE && (
              <div className="text-center mb-10 animate-fade-in-up">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                  <span className="text-white">Web Nhanh,</span> <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Đời Vui Phết!</span>
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base mt-4 leading-relaxed">
                  Công cụ AI độc quyền giúp website của bạn "giảm cân", chạy mượt và thân thiện với môi trường chỉ sau 1 cú click.
                </p>
              </div>
           )}

           <div className="max-w-2xl mx-auto">
             {/* Controls Row */}
             <div className="flex flex-wrap justify-center gap-3 mb-4">
               {/* Device Toggle */}
               <div className="bg-slate-800/80 backdrop-blur p-1 rounded-full border border-slate-700 inline-flex">
                 <button
                   onClick={() => setDevice('mobile')}
                   disabled={loadingState === LoadingState.ANALYZING}
                   className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${device === 'mobile' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                 >
                   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                   Mobile
                 </button>
                 <button
                   onClick={() => setDevice('desktop')}
                   disabled={loadingState === LoadingState.ANALYZING}
                   className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${device === 'desktop' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                 >
                   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   Desktop
                 </button>
               </div>

               {/* Location Select */}
               <div className="bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700 inline-flex items-center">
                  <svg className="w-3.5 h-3.5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={loadingState === LoadingState.ANALYZING}
                    className="bg-transparent text-xs font-medium text-white outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="Vietnam">Vietnam Server</option>
                    <option value="Singapore">Singapore Server</option>
                    <option value="Japan">Japan Server</option>
                    <option value="USA">USA Server</option>
                    <option value="Europe">Europe Server</option>
                  </select>
               </div>
             </div>

             {/* Input Form */}
             <form onSubmit={handleAnalyze} className="relative group z-10">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
                   <div className="pl-4 text-slate-400">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </div>
                   <input
                     type="text"
                     placeholder="Nhập địa chỉ web (ví dụ: hihi.com)"
                     className="flex-1 bg-transparent text-white placeholder-slate-500 px-4 py-4 outline-none text-base w-full font-medium"
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     disabled={loadingState === LoadingState.ANALYZING}
                   />
                   <button
                     type="submit"
                     disabled={loadingState === LoadingState.ANALYZING || !url.trim()}
                     className={`px-8 py-4 font-bold text-white text-sm transition-all tracking-wide ${
                       loadingState === LoadingState.ANALYZING || !url.trim()
                         ? 'bg-slate-700 cursor-not-allowed text-slate-500'
                         : 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-lg shadow-orange-500/20'
                     }`}
                   >
                     {loadingState === LoadingState.ANALYZING ? 'ĐANG SOI...' : 'KIỂM TRA'}
                   </button>
                </div>
             </form>
             
              {/* Error & Loading */}
              {loadingState === LoadingState.ERROR && (
                 <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center animate-shake">
                    {errorMsg}
                 </div>
              )}
              
              {loadingState === LoadingState.ANALYZING && (
                <div className="mt-8 flex flex-col items-center">
                   <div className="w-full max-w-xs bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-orange-500 animate-loading-bar"></div>
                   </div>
                   <p className="text-xs text-rose-300 mt-3 animate-pulse uppercase tracking-widest font-bold">{loadingStep}</p>
                </div>
              )}
           </div>
        </div>

        {/* Dashboard Result */}
        {loadingState === LoadingState.COMPLETE && result && (
          <ResultDashboard data={result} />
        )}

      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-8 text-center border-t border-slate-800 mt-auto">
        <p className="text-slate-600 text-xs font-medium">© 2024 HiHi Analytics. Powered by HiHi AI.</p>
      </footer>

      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; transform: translateX(0%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loadingBar 1.5s infinite linear;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;