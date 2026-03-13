import networkx as nx

def build_graph(logs_df):

    G = nx.DiGraph()

    for _, row in logs_df.iterrows():

        source = row["source_ip"]
        destination = row["destination_ip"]
        user = row["user"]

        # Add nodes
        G.add_node(source, type="device")
        G.add_node(destination, type="server")
        G.add_node(user, type="user")

        # Create connections
        G.add_edge(user, source)
        G.add_edge(source, destination)

    return G