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
const [, setVerified] = useState(false);
const [, setSelectedFeature] = useState(null);

const handleLogin = async (e) => {
e.preventDefault();
navigate("/dashboard");

if (step === 1) {
try {
await sendOTP(email);
setStep(2);
return;
} catch (error) {
console.error("OTP send failed", error);
return;
}
}

if (step === 2) {
try {
const res = await verifyOTP(email, otp);

if (res.status === "verified") {
setVerified(true);
alert("Authentication successful")
navigate("/dashboard");
} else {
alert("Invalid verification code");
}

} catch (error) {
console.error("OTP verification failed", error);
}
}
};

const features = [
{
title:"Real-Time Threat Correlation",
image:threat,
description:"Correlates live security events from backend log ingestion and MongoDB threat memory.",
details:"Our log ingestion engine collects security logs from multiple sources. Using correlation rules and anomaly detection, the system identifies coordinated attacks across systems in real time."
},
{
title:"Attack Path Intelligence",
image:attack,
description:"Maps suspicious movement across users, IPs, and devices.",
details:"Using NetworkX graph analysis, the system reconstructs attacker movement across systems, helping analysts visualize lateral movement and compromised nodes."
},
{
title:"Adaptive Risk Scoring",
image:risk,
description:"Dynamic threat scoring powered by backend risk analysis.",
details:"The platform calculates dynamic risk scores for users, devices, and IP addresses based on suspicious patterns, anomaly scores, and security events."
},
{
title:"Defense Simulation Engine",
image:simulation,
description:"Simulate defense actions like blocking IPs or isolating devices.",
details:"Security teams can simulate response actions before applying them in production environments."
},
{
title:"Incident Report Intelligence",
image:report,
description:"Generate AI-driven incident reports for security teams.",
details:"Our report engine automatically generates incident summaries, attack timelines, threat levels, and recommended mitigation strategies."
},
{
title:"AI Security Copilot",
image:copilot,
description:"Explain threats and recommend actions with AI assistance.",
details:"The AI assistant uses LLM-based reasoning to analyze logs, risk scores, and attack paths."
}
];

return(

<div className="w-full text-white">

<div className="flex justify-between items-center px-12 py-6 border-b border-slate-800">

<h1 className="text-cyan-400 text-xl font-semibold">
AegisCore
</h1>

<div className="flex gap-4">

<button
onClick={()=>{
document
.getElementById("login-section")
.scrollIntoView({behavior:"smooth"});
}}
className="text-sm text-slate-300"
>
Sign In
</button>

<button
onClick={()=>{
document
.getElementById("platform-capabilities")
.scrollIntoView({behavior:"smooth"});
}}
className="bg-cyan-500 px-4 py-2 rounded text-black text-sm"
>
Explore Platform
</button>

</div>

</div>

<div className="flex flex-wrap px-16 py-24">

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

<a
href={demoVideo}
target="_blank"
rel="noopener noreferrer"
className="bg-cyan-500 px-6 py-2 rounded text-black text-sm"
>
Watch Product Tour
</a>

</div>

</div>

<div id="login-section" className="w-full lg:w-1/2 flex justify-center">

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

{step===2 &&(

<>
<input
type="text"
placeholder="Enter 6-digit verification code"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
className="w-full mb-3 px-3 py-2 rounded bg-[#020617] border border-slate-700"
/>

<p className="text-xs text-slate-400 mb-4">
Verification code sent to enterprise email.
</p>
</>

)}

<button
type="submit"
className="w-full bg-cyan-500 py-2 rounded text-black"
>
{step === 1 ? "Authenticate & Continue" : "Verify & Continue Securely"}
</button>

<div className="mt-6 text-xs text-slate-400">

<p className="text-cyan-400 mb-2">Authentication Flow:</p>

<p>✔ Organization Email Validation</p>
<p>✔ Role-Based Access Control</p>
<p>✔ Two-Step Verification Enabled</p>
<p>✔ Secure Session Initialization</p>

<p className="text-slate-500 mt-4">
Access is granted only after identity verification and role authorization.
</p>

<p className="text-slate-500 mt-1">
Monitored under secure enterprise identity protocol.
</p>

</div>

</form>

</div>

</div>

</div>

<div id="platform-capabilities" className="px-16 py-24 border-t border-slate-800">

<h2 className="text-3xl text-cyan-400 mb-16 text-center">
Platform Capabilities
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

{features.map((feature,index)=>(

<div
key={index}
onClick={()=>setSelectedFeature(feature)}
className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition"
>

<img src={feature.image} className="rounded mb-4 h-40 w-full object-cover"/>

<h3 className="text-cyan-400 mb-2">{feature.title}</h3>

<p className="text-slate-400 text-sm">{feature.description}</p>

</div>

))}

</div>

</div>

<div className="px-16 py-24 border-t border-slate-800">

<h2 className="text-3xl text-cyan-400 mb-16 text-center">
Why AegisCore
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<h3 className="text-cyan-400 mb-3">Real-Time Threat Visibility</h3>
<p className="text-slate-400 text-sm">
Monitor and detect suspicious security events instantly across logs and systems.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<h3 className="text-cyan-400 mb-3">AI-Driven Security Intelligence</h3>
<p className="text-slate-400 text-sm">
Machine learning models detect anomalies and highlight hidden threats.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<h3 className="text-cyan-400 mb-3">Attack Path Reconstruction</h3>
<p className="text-slate-400 text-sm">
Graph analysis reveals how attackers move across systems.
</p>
</div>

<div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
<h3 className="text-cyan-400 mb-3">AI Decision Support</h3>
<p className="text-slate-400 text-sm">
The AI copilot explains threats and recommends mitigation actions.
</p>
</div>

</div>

</div>

<div className="px-16 py-12 border-t border-slate-800 bg-[#020617]">

<div className="flex flex-col md:flex-row justify-between items-center gap-6">

<div>
<h3 className="text-cyan-400 text-lg font-semibold">
AegisCore
</h3>
<p className="text-slate-400 text-sm">
AI-Powered Cyber Defense Platform
</p>
</div>

<div className="flex gap-6 text-sm text-slate-400">
<p>Platform</p>
<p>Security</p>
<p>Documentation</p>
<p>Contact</p>
</div>

<div className="text-sm text-slate-400">
<p>
<span className="text-cyan-400">Email:</span> support@aegiscore.ai
</p>
<p className="mt-1">
© {new Date().getFullYear()} AegisCore Security Platform
</p>
</div>

</div>

</div>

</div>

);
}