import networkx as nx


def simulate(G, action, target):

    G_copy = G.copy()

    # Apply defense action
    if action == "isolate":

        if target in G_copy:
            G_copy.remove_node(target)

    elif action == "block":

        for edge in list(G_copy.edges()):
            if target in edge:
                G_copy.remove_edge(*edge)

    elif action == "disable":

        if target in G_copy:
            G_copy.nodes[target]["risk"] = 0

    # Recalculate all node risks properly
    for node in G_copy.nodes:

        degree = G_copy.degree(node)

        current_risk = G_copy.nodes[node].get("risk", 0)

        # Reduce risk based on graph disconnection
        adjusted_risk = current_risk / (degree + 1)

        if adjusted_risk > 1:
            adjusted_risk = 1

        G_copy.nodes[node]["risk"] = round(adjusted_risk, 2)

    return G_copy