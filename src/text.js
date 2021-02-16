// Try to adapt Tarjan's strongly connected component algorithm to state with dead nodes and branches to get the textual representation
// According to Knuth per Wikipedia, the algorithm does topological sorting as a byproduct, but I'm not clear how and how I can adapt that to allow branches
// https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm

function orderNodes(nodes, edges) {
  // algorithm tarjan is
  //     input: graph G = (V, E)
  //     output: set of strongly connected components (sets of vertices)
  //     index := 0
  //     S := empty stack
  //     for each v in V do
  //         if v.index is undefined then
  //             strongconnect(v)
  //         end if
  //     end for
  //     function strongconnect(v)
  //         // Set the depth index for v to the smallest unused index
  //         v.index := index
  //         v.lowlink := index
  //         index := index + 1
  //         S.push(v)
  //         v.onStack := true
  //         // Consider successors of v
  //         for each (v, w) in E do
  //             if w.index is undefined then
  //                 // Successor w has not yet been visited; recurse on it
  //                 strongconnect(w)
  //                 v.lowlink := min(v.lowlink, w.lowlink)
  //             else if w.onStack then
  //                 // Successor w is in stack S and hence in the current SCC
  //                 // If w is not on stack, then (v, w) is an edge pointing to an SCC already found and must be ignored
  //                 // Note: The next line may look odd - but is correct.
  //                 // It says w.index not w.lowlink; that is deliberate and from the original paper
  //                 v.lowlink := min(v.lowlink, w.index)
  //             end if
  //         end for
  //         // If v is a root node, pop the stack and generate an SCC
  //         if v.lowlink = v.index then
  //             start a new strongly connected component
  //             repeat
  //                 w := S.pop()
  //                 w.onStack := false
  //                 add w to current strongly connected component
  //             while w ≠ v
  //             output the current strongly connected component
  //         end if
  //     end function
}
