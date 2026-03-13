import {useEffect,useState} from "react"
import {getLogs} from "../../services/api"

export default function LogsTable(){

const [logs,setLogs]=useState([])

useEffect(()=>{

getLogs().then(setLogs)

},[])

return(

<table className="w-full">

<thead>

<tr>
<th>IP</th>
<th>User</th>
<th>Action</th>
<th>Data</th>
<th>Timestamp</th>
</tr>

</thead>

<tbody>

{logs.map((l,i)=>(

<tr key={i}>

<td>{l.ip}</td>
<td>{l.user}</td>
<td>{l.action}</td>
<td>{l.data_transfer}</td>
<td>{l.timestamp}</td>

</tr>

))}

</tbody>

</table>

)

}