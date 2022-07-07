const { app } = require("./app");

const { db, DataTypes } = require("./utils/db.utils");

//models
const { User } = require("./models/users.models");
const { Game } = require("./models/games.models");
const { Console } = require("./models/consoles.models");
const { Reviews } = require("./models/reviews.models");
const { Gameinconsole } = require("./models/gamesinConsole.models");

db.authenticate()
  .then(() => {
    console.log("db authenticated");
  })
  .catch(err => console.log(err));

//relations
// user 1<--->M reviews
User.hasMany(Reviews, { foreignKey: "userId" });
Reviews.belongsTo(User);

// game 1<--->M reviews
Game.hasMany(Reviews, { foreignKey: "gameId" });
Reviews.belongsTo(Game);

// game M<--->M console
Game.belongsToMany(Console, { foreignKey: "gameId", through: "gameinconsole" });
Console.belongsToMany(Game, {
  foreignKey: "consoleId",
  through: "gameinconsole",
});

db.sync()
  .then(() => console.log("db synced"))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("express Running");
});
