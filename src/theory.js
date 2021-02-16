import sqlite3 from "sqlite3";
// var db = new sqlite3.Database(":memory:");
var db = new sqlite3.Database("jdb");

db.serialize(function () {
  db.run(
    `CREATE TABLE IF NOT EXISTS nodes (id not null PRIMARY KEY, alive default 0, deadness default 0, content)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS edges (
      sourceNode not null, 
      destinationNode not null, 
      PRIMARY KEY (sourceNode, destinationNode),
      FOREIGN KEY (sourceNode) REFERENCES nodes (id),
      FOREIGN KEY (destinationNode) REFERENCES nodes (id),
      aliveness default 0
    )`
  );

  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //   stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();
  let stmt = db.prepare("INSERT INTO nodes (id) VALUES (?)");
  stmt.run(`ID ${Math.floor(Math.random() * 100)}`);
  stmt.finalize();

  db.each("SELECT * FROM nodes", function (err, row) {
    if (!err) console.log(JSON.stringify(row));
    if (err) console.log(err);
  });
});

db.close();

export const serialize = db.serialize;
export class Transaction {
  constructor() {
    this.open = true;
    this.stack = [];
  }
  addStatement(callback) {
    if (this.open) {
      this.stack.push(callback);
    } else {
      throw new Error("Transaction closed");
    }
  }
  runAndCloseTransaction() {
    if (this.open) {
      db.serialize(() => {
        for (let i = 0; i++; i < this.stack.length) {
          this.stack[i]();
        }
      });
      this.open = false;
    } else {
      throw new Error("Transaction closed");
    }
  }
}

export function generateID() {
  // TODO
}

export function createNode(id) {
  let stmt = db.prepare("INSERT INTO nodes (id) VALUES (?)");
  stmt.run(`ID ${id}`);
  stmt.finalize();
}

export function makeNodeAlive(nodeID) {
  let stmt = db.prepare(
    `INSERT INTO nodes (id, alive) VALUES (?,1) ON CONFLICT (id) DO UPDATE set alive = 1`
  );
  stmt.run(nodeID);
  stmt.finalize();
}

export function makeNodeDeader(nodeID) {
  let stmt = db.prepare(
    `INSERT INTO nodes (id, deadness)VALUES (?,1) ON CONFLICT (id) DO UPDATE nodes set deadness = deadness + 1`
  );
  stmt.run(nodeID);
  stmt.finalize();
}

export function incrementEdgeAliveness(sourceNode, destinationNode, delta) {
  let stmt = db.prepare(
    `INSERT INTO edges(sourceNode, destinationNode, aliveness) VALUES (?,?,?)  ON CONFLICT (sourceNode, desetinationNode) DO UPDATE SET count=count+?`
  );
  stmt.run([sourceNode, destinationNode, delta, delta]);
  stmt.finalize();
}

export { db };
