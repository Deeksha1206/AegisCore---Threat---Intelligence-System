import networkx as nx


def build_graph(df):

    graph = nx.DiGraph()

    for _, row in df.iterrows():

        source_ip = row["source_ip"]
        destination_ip = row["destination_ip"]
        event_type = row["event_type"]
        user = row["user"]

        # Always update source node with latest user
        graph.add_node(
            source_ip,
            user=user
        )

        # Destination node
        graph.add_node(destination_ip)

        # Edge connection
        graph.add_edge(
            source_ip,
            destination_ip,
            event=event_type
        )

    return graph