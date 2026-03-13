import ReactFlow from "reactflow"
import {useEffect,useState} from "react"
import {getAttackPath} from "../../services/api"

export default function AttackGraph(){

const [graph,setGraph]=useState({nodes:[],edges:[]})

useEffect(()=>{

getAttackPath().then(setGraph)

},[])

return(

<div style={{height:400}}>

<ReactFlow
nodes={graph.nodes}
edges={graph.edges}
/>

</div>

)

}