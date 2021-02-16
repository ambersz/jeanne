How to turn the line partial order into the textual representation:
Modified from reference: https://medium.com/@WindUpDurb/on-partial-ordering-total-ordering-and-the-topological-sort-9f9c0d0d812f
Modified Kahn's algorithm assuming there are no living forks in the tree:

1. Count and store the in-degrees of all nodes in a graph. The in-degree of a node A is the number of edges that have A as the target or destination.
Identify nodes with an in-degree of 0. If there are more than 1, add nodes which are not the `start-of-file` node to a `lack-context` set and append them to a corresponding list (to be operated on in step 5). Add the `start-of-file` node to the `textual-representation` set and append it to the corresponding list. 

2. Remove the `start-of-file` node from the set of nodes with in-degree 0. Iterate over its edges, decrementing the stored in-degree of each destination node in the edge. If the node now has an in-degree of 0, add it to a temporary set of nodes. If a node in the temporary set is not alive or is dead, remove it from the set and follow the same process of removing edges and adding new in-degree-0 nodes to the set. When all nodes in the set are alive and not dead, this step is done. 

3. If there is more than one node in the set, there may be a conflict in the textual representation. Run a modified step 2 on each of the nodes one by one to get the total ordering of the textual representation of each branch. (In order to prevent the last branch from eating up a node which is strictly after all branches, the final addition step after 2 is to restore edges from nodes within the branch textual representation to nodes outside the branch textual representation.) Compare the textual representations of all branches. Remove any which are total duplicates. The remaining branches need to be shown as conflicts in the final textual representation. Then revert the edge removal deferral from after step 2, deleting all edges that were previously restored. 

4. Iterate 2 (to get the longest chain of conflict-free textual representation) and 3 (to get the longest chain of conflicting textual representation) until there are no nodes with an in-degree of 0. Concatenate the conflict-free and conflicting chains in order of generation. This is the textual representation of the orderable nodes.

5. Apply 4 to each of the nodes with in-degree-0 which were not the start-of-file, (or just mash them all together with the basic Kahn's algorithm), put them in a separate temp file and throw it at the user with an error that says we don't have enough information to order these.
