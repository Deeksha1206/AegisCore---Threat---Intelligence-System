import { useState } from "react";

export default function ChatbotPanel(){

const [open,setOpen]=useState(false)

return(

<>

<button
onClick={()=>setOpen(!open)}
className="fixed bottom-6 right-6 bg-cyan-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-cyan-600"

>

AI </button>

{open && (

<div className="fixed bottom-20 right-6 w-80 bg-[#020617] border border-cyan-500/20 rounded-xl shadow-xl p-4">

<h3 className="text-cyan-400 font-semibold mb-3">
AI Security Assistant
</h3>

<div className="bg-[#0f172a] p-3 rounded-lg text-slate-400 text-sm mb-3">
Ask SentinelAI about threats, logs, or mitigation steps.
</div>

<input
placeholder="Ask SentinelAI..."
className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2 text-sm"
/>

</div>

)}

</>

)

}
