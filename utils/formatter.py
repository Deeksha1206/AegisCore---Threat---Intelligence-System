def format_graph(G):

    nodes = []
    links = []

    for node in G.nodes:
        nodes.append({
            "id": node,
            "risk": round(G.nodes[node].get("risk", 0), 2)
        })

    for source, target in G.edges:
        links.append({
            "source": source,
            "target": target
        })

    return {
        "nodes": nodes,
        "links": links
    }