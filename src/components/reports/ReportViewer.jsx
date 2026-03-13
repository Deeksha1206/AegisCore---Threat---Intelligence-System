import {useEffect,useState} from "react"
import {generateReport} from "../../services/api"

export default function ReportViewer(){

const [report,setReport]=useState("")

useEffect(()=>{

generateReport().then(r=>setReport(r.text))

},[])

return(

<div>

<h2>Executive Summary</h2>

<p>{report}</p>

<button>
Download Report
</button>

</div>

)

}