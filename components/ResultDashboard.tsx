import React, { useState } from 'react';
import { WebAuditResult } from '../types';
import Gauge from './Gauge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultDashboardProps {
  data: WebAuditResult;
}

const MetricCard = ({ label, value, subtext, icon, color }: any) => (
  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm h-full flex flex-col justify-between hover:border-slate-600 transition-colors group">
    <div>
      <div className="flex items-start justify-between mb-2">
        <span className="text-slate-400 text-xs uppercase font-semibold tracking-wider group-hover:text-slate-300 transition-colors">{label}</span>
        <span className={`${color} group-hover:scale-110 transition-transform`}>{icon}</span>
      </div>
      <div className="text-2xl font-bold text-slate-100">{value}</div>
    </div>
    {subtext && <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-700/50">{subtext}</div>}
  </div>
);

const ResultDashboard: React.FC<ResultDashboardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'social_security' | 'details' | 'code'>('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'social_security', label: 'Social & Bảo mật' },
    { id: 'details', label: 'Chi tiết' },
    { id: 'code', label: 'Code Fix' },
  ];

  const handleExport = () => {
    alert("Tính năng đang được HiHi phát triển! Sẽ sớm ra mắt bản PDF xịn xò.");
  };

  // Rank Colors
  const getRankColor = (tier: string) => {
    switch(tier) {
      case 'S': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'A': return 'from-emerald-400 to-cyan-500';
      case 'B': return 'from-blue-400 to-indigo-500';
      case 'C': return 'from-yellow-200 to-yellow-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-10">
      
      {/* HiHi Rank Banner - Always Visible */}
      <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-r ${getRankColor(data.hihiRank.tier)} opacity-10`}></div>
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${getRankColor(data.hihiRank.tier)} flex items-center justify-center shadow-lg transform rotate-3`}>
                <span className="text-4xl md:text-5xl font-black text-white drop-shadow-md">{data.hihiRank.tier}</span>
             </div>
             <div>
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{data.hihiRank.name} {data.hihiRank.emoji}</h2>
               <p className="text-slate-400 text-sm md:text-base italic">"{data.hihiRank.quote}"</p>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 backdrop-blur text-center">
               <div className="text-xs text-slate-400 uppercase">Load Time</div>
               <div className="text-lg font-bold text-emerald-400">{data.estimatedLoadTime}</div>
             </div>
             <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 backdrop-blur text-center">
               <div className="text-xs text-slate-400 uppercase">Size</div>
               <div className="text-lg font-bold text-blue-400">{data.transferSize}</div>
             </div>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="bg-slate-800/50 p-1 rounded-xl inline-flex border border-slate-700/50 backdrop-blur overflow-x-auto max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-slate-500 transition text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Xuất Báo Cáo
        </button>
      </div>

      <div className="min-h-[400px]">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col items-center shadow-lg hover:shadow-rose-500/10 transition duration-300">
                <Gauge score={data.performanceScore} label="HiHi Speed" delay={0} />
              </div>
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col items-center shadow-lg">
                <Gauge score={data.accessibilityScore} label="Truy cập" delay={100} />
              </div>
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col items-center shadow-lg">
                <Gauge score={data.bestPracticesScore} label="Chuẩn chỉ" delay={200} />
              </div>
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col items-center shadow-lg">
                <Gauge score={data.seoScore} label="Top Google" delay={300} />
              </div>
            </div>

            {/* Core Web Vitals & Data Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {/* Row 1: Vitals */}
               <MetricCard 
                 label="LCP (Load Chính)" 
                 value={data.lcp} 
                 subtext="Thời gian hiển thị nội dung lớn nhất"
                 color="text-orange-400"
                 icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
               />
               <MetricCard 
                 label="CLS (Độ Ổn Định)" 
                 value={data.cls} 
                 subtext="Mức độ dịch chuyển giao diện"
                 color="text-blue-400"
                 icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>}
               />
               <MetricCard 
                 label="Tổng Thời Gian" 
                 value={data.estimatedLoadTime} 
                 subtext="Thời gian tải hoàn tất trang"
                 color="text-green-400"
                 icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
               />

               {/* Row 2: Data & Environment */}
               <MetricCard 
                 label="Dung Lượng Mạng" 
                 value={data.transferSize} 
                 subtext="Dữ liệu nén tải xuống"
                 color="text-cyan-400"
                 icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
               />
               <MetricCard 
                 label="Dung Lượng Thực" 
                 value={data.resourcesSize} 
                 subtext="Sau khi giải nén"
                 color="text-purple-400"
                 icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
               />
               <MetricCard 
                 label="Khí Thải Carbon" 
                 value={data.carbonFootprint} 
                 subtext="Lượng CO2/lượt xem"
                 color="text-emerald-400"
                 icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
               />
            </div>

            {/* HiHi Brain Summary */}
            <div className="bg-gradient-to-r from-rose-900/20 to-orange-900/20 p-6 rounded-xl border border-rose-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></div>
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">HiHi Brain Phân Tích</h3>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed relative z-10 font-medium">
                {data.summary}
              </p>
            </div>
          </div>
        )}

        {/* SOCIAL & SECURITY TAB (New) */}
        {activeTab === 'social_security' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            
            {/* Social Preview */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <h3 className="text-sm font-bold text-slate-300 mb-5 uppercase flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Giả lập hiển thị Facebook
              </h3>
              
              <div className="bg-[#18191a] rounded-lg border border-[#3a3b3c] overflow-hidden max-w-sm mx-auto">
                 <div className="h-48 bg-slate-700 relative group flex items-center justify-center text-slate-500">
                    {/* Placeholder image logic */}
                    <span className="text-xs px-4 text-center">{data.socialPreview.image} (Ảnh minh họa)</span>
                 </div>
                 <div className="p-3 bg-[#242526]">
                    <div className="text-[#b0b3b8] text-[12px] uppercase mb-1">{data.socialPreview.siteName || "WEBSITE.COM"}</div>
                    <div className="text-[#e4e6eb] font-semibold text-[16px] leading-tight mb-1 line-clamp-2">{data.socialPreview.title}</div>
                    <div className="text-[#b0b3b8] text-[14px] line-clamp-1">{data.socialPreview.description}</div>
                 </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 text-center italic">Đây là cách web của bạn có thể trông thấy khi được share.</p>
            </div>

            {/* Security Check */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <h3 className="text-sm font-bold text-slate-300 mb-5 uppercase flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Quét Bảo Mật Nhanh
              </h3>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <span className="text-slate-300 text-sm">HTTPS/SSL</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${data.security.https ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {data.security.https ? 'AN TOÀN' : 'KHÔNG AN TOÀN'}
                    </span>
                 </div>
                 
                 <div>
                    <span className="text-xs text-slate-400 mb-2 block uppercase font-semibold">Các vấn đề phát hiện:</span>
                    <ul className="space-y-2">
                      {data.security.issues && data.security.issues.length > 0 ? (
                        data.security.issues.map((issue, idx) => (
                           <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                              <svg className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                              {issue}
                           </li>
                        ))
                      ) : (
                        <li className="flex items-center gap-2 text-sm text-green-400 italic">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Không phát hiện lỗi nghiêm trọng nào.
                        </li>
                      )}
                    </ul>
                 </div>
              </div>
            </div>

          </div>
        )}

        {/* DETAILS TAB */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            {/* Left: Chart & Tech */}
            <div className="space-y-6">
              
              {/* Simulation Box */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase flex items-center gap-2">
                   <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                   Mô Phỏng Tối Ưu
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Tốc độ hiện tại</span>
                      <span className="text-white">{data.estimatedLoadTime}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-500 h-full w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-green-400 font-bold">Sau khi HiHi tối ưu</span>
                      <span className="text-green-400 font-bold">{data.potentialLoadTime}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full animate-pulse" style={{ width: `${100 - data.savingsPercentage}%` }}></div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700/50 text-center">
                    <p className="text-xs text-slate-400">Bạn có thể nhanh hơn</p>
                    <p className="text-2xl font-bold text-green-400">{data.savingsPercentage}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg">
                <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase">Phân bổ tài nguyên</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.resourceBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="sizeKb"
                      >
                        {data.resourceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                         itemStyle={{ color: '#f8fafc' }}
                         formatter={(value: any) => [`${value} KB`, 'Kích thước']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                   {data.resourceBreakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                         <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                           <span className="text-slate-400">{item.name}</span>
                         </div>
                         <span className="font-mono text-slate-300">{item.sizeKb} KB</span>
                      </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Right: Opportunities */}
            <div className="md:col-span-2 bg-slate-800 p-5 rounded-xl border border-slate-700 h-fit shadow-lg">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase">Các bước cần làm ngay</h3>
              <div className="space-y-3">
                {data.opportunities.map((opp, idx) => {
                  const severityColor = opp.severity === 'high' ? 'border-rose-500 bg-rose-500/5' : opp.severity === 'medium' ? 'border-orange-500 bg-orange-500/5' : 'border-blue-500 bg-blue-500/5';
                  const textColor = opp.severity === 'high' ? 'text-rose-400' : opp.severity === 'medium' ? 'text-orange-400' : 'text-blue-400';
                  
                  return (
                    <div key={idx} className={`p-4 rounded-lg border-l-4 ${severityColor} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-700/30 transition-colors`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-slate-200">{opp.title}</h4>
                          <span className={`text-[10px] font-bold ${textColor} uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700/50`}>{opp.severity}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{opp.description}</p>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                         <span className="text-xs text-emerald-400 font-bold whitespace-nowrap bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">Tiết kiệm: {opp.savings}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CODE TAB */}
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 gap-6 animate-fade-in-up">
            {data.codeSuggestions && data.codeSuggestions.length > 0 ? (
              data.codeSuggestions.map((snippet, idx) => (
                <div key={idx} className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg group">
                   <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                        <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        {snippet.title}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 uppercase font-mono font-bold tracking-wider">{snippet.language}</span>
                   </div>
                   <div className="p-5 bg-[#0d1117] overflow-x-auto relative">
                     <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-orange-500 opacity-50"></div>
                     <p className="text-xs text-slate-400 mb-4 font-sans italic flex items-start gap-2">
                       <span className="text-rose-500 font-bold not-italic">Why?</span> 
                       {snippet.description}
                     </p>
                     <div className="relative">
                        <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed p-2 rounded bg-white/5 border border-white/5">{snippet.code}</pre>
                     </div>
                   </div>
                </div>
              ))
            ) : (
               <div className="text-center py-16 text-slate-500 bg-slate-800/30 rounded-xl border-2 border-slate-800 border-dashed">
                 <p className="text-lg font-medium mb-2">Trang web này quá hoàn hảo?</p>
                 <p className="text-sm">HiHi không tìm thấy đoạn mã nào cần sửa ngay lập tức.</p>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDashboard;