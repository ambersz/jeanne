Structures that would be best described by directed acyclic graphs (specifically a transitive DAG/partial order):

* State of a file: Each line/substring is a node, along with some empty string nodes to help with consistent ordering. When there is only 1 path (containing only living nodes) between any pair of nodes in the graph, the textual representation is consistent with the state. Otherwise (for some pair of nodes there are at least 2 distinct paths which only contain living nodes), the textual representation conflicts with the true state. To resolve the conflict between the textual representation and the state, the user may introduce a new change. 
  * patches can only introduce new nodes to the graph. If a line in an old node was changed, the patch is associated with a change in the status of the original node from alive to dead and the introduction of a new node with the contents of the final line state, status alive, with the same partial ordering of the previous node, but not comparable to the previous node.
    * patches may (?) be able to introduce new edges to the graph. See Missing Context conflict below.
  * for every node in the graph, there is some path from the beginning of the file to the end of the file that includes it

* Patch dependencies: Some changes depend on the existence of other changes. Each node is a patch, edges represent the dependency structure. A patch may depend on 0 or more other patches.

* Timelines of full state: The aggregate of history known to one person's repo evolves over time. For one person alone, a timeline is strictly linear and the state changes in response to the user editing files or using the VCS's commands. However, in a distributed VCS, timelines can evolve independently, only converging when the two people pull changes from each other.

---

Types of conflicts/conflict resolutions:

* Unknown ordering / missing context:
  * Example: 
  Alice inserts A
  ```
  A
  ```
  Bowei inserts B
  ```
  B
  ```
  Alice pulls B: A and B both come after the beginning of file and before the end of file, but the ordering of A and B is unclear.
  Alice resolves the conflict by drawing an edge between A and B, where the direction of the edge determines the order
  ```
  A
  B
  ```
  * This conflict resolution did not mutate the changes themselves, it only added additional information about the context of the change.
  * TODO: How should this conflict resolution be represented? What if two people choose conflicting orders? 
* Rejected change
  * Same example setup as above.
  After Alice pulls B, she rejects the change B.
  * TODO: what does this mean? And how should it be represented? Did she delete B? Did she invert B? If the B patch includes other changes, you can't revert B...
* Other resolution
  * Same example setup as above
  After Alice pulls B, she rejects both original changes A/B. Instead she resolves with C
  * Wat do? This definitely happens in real life usage due to diffing algorithm quirks alone, not to mention other cases where including both changes involves adjustments to both of them.


  ---

* Content of a patch:
  * List of `node_id`s to set to dead
  * List of Nodes to add
  * List of Edges to add

* Content of a Node:
  * id
  * status: visible/hidden
  * textContent: String

* Content of an Edge:
  * Source node_id
  * Destination node_id



## Hard problems
* I think I need a deterministic way to name the empty nodes? How can I make them consistent across repositories?


---

## Simplest Case

If you are tracking a single character file that starts in the state

```
A
```
All states in a linear history are of the form START -> "" -> A (Alive) -> "" -> END


