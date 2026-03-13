import networkx as nx

def detect_attack_paths(graph):

    if graph is None or len(graph.nodes) == 0:
        return {"paths": []}

    paths = []

    nodes = list(graph.nodes)

    # Generate simple paths between connected nodes
    for edge in graph.edges:
        source, target = edge
        paths.append([source, target])

    return {
        "paths": paths
    }