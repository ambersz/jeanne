Node
  id/name: uuid
  alive: tinyint/bool 
    (deafult 0)
  deadness: int 0+ 
    (default 0)
  content: nullable string. 
    (default null)
    (null means content not hydrated, empty string means the expected content here is nothing i.e. deleted)
    (only one valid content per Node, can defer hydration due to not needing it or hiding for privacy, but can't choose to dynamically hydrate or change the content)
Edge
  sourceNode: uuid
  destinationNode: uuid
  aliveness: int (default 0)

Operations:

On tree:
  * Create Node ({id})
On Node:
  * Set alive to 1
  * Increment Deadness up
  * If content is null, set content.
On Edge (edges between any ordered pair of nodes exists without needing to be explicitly created):
  * increment aliveness
  * decrement aliveness




