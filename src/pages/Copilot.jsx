import CopilotChat from "../components/copilot/CopilotChat"
import ThreatContext from "../components/copilot/ThreatContext"

export default function Copilot(){

return(

<div className="p-6 grid grid-cols-2 gap-6">

<ThreatContext/>

<CopilotChat/>

</div>

)

}
