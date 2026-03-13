const API="http://localhost:8000"

export async function getLogs(){
const res=await fetch(`${API}/view-logs`)
return res.json()
}

export async function getRiskSummary(){
const res=await fetch(`${API}/risk-summary`)
return res.json()
}

export async function getRecentThreats(){
const res=await fetch(`${API}/recent-threats`)
return res.json()
}

export async function getAttackPath(){
const res=await fetch(`${API}/attack-path`)
return res.json()
}

export async function runSimulation(data){
const res=await fetch(`${API}/simulate`,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify(data)
})
return res.json()
}

export async function generateReport(){
const res=await fetch(`${API}/generate-report`)
return res.json()
}
const API_BASE = "http://localhost:8000";

export async function sendOTP(email) {

const res = await fetch(`${API_BASE}/send-otp`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ email })
});

return res.json();
}

export async function verifyOTP(email, otp) {

const res = await fetch(`${API_BASE}/verify-otp`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ email, otp })
});

return res.json();
}