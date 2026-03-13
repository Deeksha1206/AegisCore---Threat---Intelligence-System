import { useState } from "react";

export default function CopilotChat(){

const [open,setOpen] = useState(false);

return(

<div className="fixed bottom-6 right-6 z-50">

{/* CHAT WINDOW */}

{open && (

<div className="w-[340px] h-[420px] bg-[#0f172a] border border-slate-700 rounded-xl shadow-xl flex flex-col">

<div className="p-4 border-b border-slate-700 text-cyan-400 font-semibold">
AI Security Copilot
</div>

<div className="flex-1 p-4 text-sm text-slate-300 overflow-y-auto">

<p>Ask about threats, suspicious activity, or recommended actions.</p>

</div>

<div className="p-3 border-t border-slate-700">

<input
placeholder="Ask the AI..."
className="w-full px-3 py-2 bg-[#020617] text-white border border-slate-700 rounded"
/>

</div>

</div>

)}

{/* FLOATING BUTTON */}

<button
onClick={()=>setOpen(!open)}
className="bg-cyan-500 text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl hover:scale-105 transition"

>

AI </button>

</div>

);

}
