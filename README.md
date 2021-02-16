Goal:

- A state representation and action framework to back flexible version control systems.
  - Fully associative and commutative
  - Can represent a range of conflict states
    - Conflicts due to lack of sufficient context
    - Contradictory context information ("A is before B" AND "B is before A")
- A mapping from the state representation to an informative textual representation

---

Possibilities:

- An extending version control system could use the alive nodes in the state representation to determine the minimum set of nodes and context required to reconstruct the current state.
  - Could possibly use a cumulative deadness heuristic to determine the minimum set of commits required to allow "undoing" any part of the repo `n` times
- deletes (and edits) will not error if the text does not exist yet, allowing an extending version control system to revert arbitrary commits
- Conflicts are a valid state, so the existence of a conflict will not block additional edits. (Although it will still block parsing valid code.)
- Node-based state representation allows an extending version control system to dynamically choose boundaries. i.e. it may decide to store binary data in a single node, or split source code into language-specific tokens
  - the choice of boundary only needs to be made at the time of recording changes into the state representation
    - an extending version control system could change how it chooses boundaries without impacting existing state representations.
    - if an extending version control system stored its changes in external way, it could retroactively change the boundary representations of all history

---

Limitations:

- An extending version control system may want to find what changes cause a contradiction in the state (cycle in the partial order). Determining the minimal changes to remove a cycle is NP-hard
- State representation theory does not support inverse operations.
  - Without the ability to apply inverse operations, an extending version control system would need to reapply all changes except the reverted one in order to see the state
  - Although the change theory doesn't support it, I think the technical representation can, just requires some more work.
    - created-ness property on each Node and Edge. Every time an operation that would have created it is made, must increment that property up. When reverting changes, if the created-ness is 0, delete the object.
- Allowing deletions before existence could result in unintuitive results
  - Applying an edit change that deletes A and inserts B to an empty file will result in a file that says `B`
  - Then, applying the original change that inserted A to this file will do nothing.
- Assumes the final representation of the state with multiple connected nodes is a linear flow of text. Although the state representation is a tree, may be difficult to apply this to version control of a tree of graph.
