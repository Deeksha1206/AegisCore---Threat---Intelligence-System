export default function RecentThreats(){

return(

<div className="card">

<h3 className="text-lg font-semibold text-cyan-400 mb-2">
Recent Threat Activity
</h3>

<ul className="text-slate-400 space-y-2">

<li>192.168.1.45 → Suspicious login attempt</li>
<li>10.0.0.23 → Abnormal data transfer</li>
<li>172.16.0.9 → Multiple failed authentications</li>

</ul>

</div>

)

}
