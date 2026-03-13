export default function Sidebar(){

return(

<div className="w-64 bg-[#020617] border-r border-cyan-500/20 p-6 shadow-xl">

<h1 className="text-2xl font-bold text-cyan-400 mb-10">
SentinelAI
</h1>

<div className="space-y-5 text-slate-300">

<p className="hover:text-cyan-400 cursor-pointer transition">
Dashboard
</p>

<p className="hover:text-cyan-400 cursor-pointer transition">
Threat Monitor
</p>

<p className="hover:text-cyan-400 cursor-pointer transition">
Reports
</p>

</div>

</div>

)

}