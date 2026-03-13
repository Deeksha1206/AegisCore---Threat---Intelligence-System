import {runSimulation} from "../../services/api"

export default function SimulationControls(){

async function simulate(action){

const result=await runSimulation({action})

console.log(result)

}

return(

<div className="grid grid-cols-3 gap-4">

<button onClick={()=>simulate("isolate")}>
Isolate Node
</button>

<button onClick={()=>simulate("block")}>
Block Connection
</button>

<button onClick={()=>simulate("disable")}>
Disable Access
</button>

</div>

)

}