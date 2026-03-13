import {useEffect,useState} from "react"
import {getRiskSummary,getRecentThreats} from "../../services/api"

export default function ThreatCards(){

const [risk,setRisk]=useState({})
const [threats,setThreats]=useState({})

useEffect(()=>{

getRiskSummary().then(setRisk)
getRecentThreats().then(setThreats)

},[])

return(

<div className="grid grid-cols-4 gap-6">

<div className="card">
<h3>Threat Level</h3>
<p>{risk.level}</p>
</div>

<div className="card">
<h3>Risk Score</h3>
<p>{risk.score}</p>
</div>

<div className="card">
<h3>Suspicious IP</h3>
<p>{threats.ip}</p>
</div>

<div className="card">
<h3>Suspicious User</h3>
<p>{threats.user}</p>
</div>

</div>

)

}