import { sendOTP, verifyOTP } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import threat from "../assets/features/threat.png";
import attack from "../assets/features/attack.png";
import risk from "../assets/features/risk.png";
import simulation from "../assets/features/simulation.png";
import report from "../assets/features/report.png";
import copilot from "../assets/features/copilot.png";

import demoVideo from "../assets/videos/demo.mp4";

export default function Login(){

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [step, setStep] = useState(1);
const [verified, setVerified] = useState(false);

const handleLogin = async (e) => {
e.preventDefault();

if(step === 1){

try{
await sendOTP(email);
setStep(2);
}catch(error){
console.error("OTP send failed", error);
}

}else{

try{

const res = await verifyOTP(email, otp);

if(res.status === "verified"){

setVerified(true);

setTimeout(()=>{
navigate("/dashboard");
},2000);

}else{

alert("Invalid verification code");

}

}catch(error){
console.error("OTP verification failed", error);
}

}

};

return(

<div className="w-full text-white">

{/* NAVBAR */}

<div className="flex justify-between items-center px-12 py-6 border-b border-slate-800">

<h1 className="text-cyan-400 text-xl font-semibold">
AegisCore
</h1>

<div className="flex gap-4">

<button
onClick={()=>navigate("/") }
className="text-sm text-slate-300"
>
Sign In
</button>

<button className="bg-cyan-500 px-4 py-2 rounded text-black text-sm">
Request Demo
</button>

</div>

</div>

{/* HERO SECTION */}

<div className="flex flex-wrap px-16 py-24">

{/* LEFT SIDE */}

<div className="w-full lg:w-1/2 pr-0 lg:pr-16 mb-12 lg:mb-0">

<p className="text-cyan-400 mb-3">
Cyber Intelligence Engine for Real-Time Threat Decision Making
</p>

<h1 className="text-5xl font-bold text-cyan-400 mb-4">
AegisCore
</h1>

<p className="text-slate-400 mb-6">
Intelligent Cyber Defense Platform
</p>

<h2 className="text-3xl font-semibold mb-6">
Welcome to AegisCore — Intelligent Security Beyond Monitoring
</h2>

<p className="text-slate-400 mb-6 leading-relaxed">
AegisCore unifies live threat signals, anomaly detection, attack-path reasoning, and AI-assisted decision support into one intelligent defense layer.
</p>

<p className="text-slate-400 mb-6 leading-relaxed">
Designed for modern enterprises, it continuously interprets suspicious activity, prioritizes critical risks, and enables faster security decisions through explainable insights, simulation, and guided response.
</p>

<p className="text-slate-400 mb-6">
From detection to action — every threat becomes visible, understandable, and controllable.
</p>

<p className="text-cyan-400 mb-10">
Detect • Explain • Simulate • Respond
</p>

<div className="flex gap-4">

<button
onClick={()=>navigate("/dashboard")}
className="bg-cyan-500 px-6 py-2 rounded text-black text-sm"
>
Explore Platform
</button>

<a
href={demoVideo}
target="_blank"
rel="noopener noreferrer"
className="border border-slate-700 px-6 py-2 rounded text-sm"
>
Watch Product Tour
</a>

</div>

</div>

{/* LOGIN CARD */}

<div className="w-full lg:w-1/2 flex justify-center">

<div className="bg-[#0f172a] border border-slate-800 p-8 rounded-xl w-[380px]">

<h3 className="text-cyan-400 text-lg mb-2">
Enterprise Identity Verification
</h3>

<p className="text-slate-400 text-sm mb-6">
Protected access using multi-layer authentication for authorized cybersecurity personnel.
</p>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Company Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full mb-4 px-3 py-2 rounded bg-[#020617] border border-slate-700"
/>

<input
type="password"
placeholder="Password"
className="w-full mb-4 px-3 py-2 rounded bg-[#020617] border border-slate-700"
/>

<select className="w-full mb-4 px-3 py-2 rounded bg-[#020617] border border-slate-700">

<option>Security Analyst</option>
<option>SOC Engineer</option>
<option>Incident Responder</option>
<option>Security Administrator</option>

</select>

{step === 2 && (

<>

<input
type="text"
placeholder="Enter 6-digit verification code"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
className="w-full mb-3 px-3 py-2 rounded bg-[#020617] border border-slate-700"
/>

<p className="text-xs text-slate-400 mb-4">
A secure verification code has been sent to your registered enterprise email.
</p>

</>

)}

<button
type="submit"
className="w-full bg-cyan-500 py-2 rounded text-black"
>

{step === 1 ? "Authenticate & Continue" : "Verify & Continue Securely"}

</button>

</form>

{/* AUTHENTICATION FLOW */}

<div className="mt-5 text-xs text-slate-400">

<p className="text-cyan-400 mb-2">Authentication Flow:</p>

<p>✔ Organization Email Validation</p>
<p>✔ Role-Based Access Control</p>
<p>✔ Two-Step Verification Enabled</p>
<p>✔ Secure Session Initialization</p>

</div>

{/* SUCCESS MESSAGE */}

{verified && (

<p className="text-green-400 text-sm mt-4">
Verification successful. Initializing secure session...
</p>

)}

<p className="text-xs text-slate-500 mt-6">
Access is granted only after identity verification and role authorization.
</p>

<p className="text-xs text-slate-500 mt-1">
Monitored under secure enterprise identity protocol.
</p>

</div>

</div>

</div>

{/* PLATFORM CAPABILITIES */}

<div className="px-16 py-24 border-t border-slate-800">

<h2 className="text-3xl text-cyan-400 mb-16 text-center">
Platform Capabilities
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<img src={threat} className="rounded mb-4 h-40 w-full object-cover"/>
<h3 className="text-cyan-400 mb-2">Real-Time Threat Correlation</h3>
<p className="text-slate-400 text-sm">
Correlates live security events from backend log ingestion and MongoDB threat memory.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<img src={attack} className="rounded mb-4 h-40 w-full object-cover"/>
<h3 className="text-cyan-400 mb-2">Attack Path Intelligence</h3>
<p className="text-slate-400 text-sm">
Maps suspicious movement across users, IPs, and devices.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<img src={risk} className="rounded mb-4 h-40 w-full object-cover"/>
<h3 className="text-cyan-400 mb-2">Adaptive Risk Scoring</h3>
<p className="text-slate-400 text-sm">
Dynamic threat scoring powered by backend risk analysis.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<img src={simulation} className="rounded mb-4 h-40 w-full object-cover"/>
<h3 className="text-cyan-400 mb-2">Defense Simulation Engine</h3>
<p className="text-slate-400 text-sm">
Simulate defense actions like blocking IPs or isolating devices.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<img src={report} className="rounded mb-4 h-40 w-full object-cover"/>
<h3 className="text-cyan-400 mb-2">Incident Report Intelligence</h3>
<p className="text-slate-400 text-sm">
Generate AI-driven incident reports for security teams.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<img src={copilot} className="rounded mb-4 h-40 w-full object-cover"/>
<h3 className="text-cyan-400 mb-2">AI Security Copilot</h3>
<p className="text-slate-400 text-sm">
Explain threats and recommend actions with AI assistance.
</p>
</div>

</div>

</div>

</div>

);
}