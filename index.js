console.log(game);
game.width = 800;
game.height = 800;
const ctx = game.getContext("2d");
console.log(ctx);
ctx.fillStyle = "#50FF50";
ctx.fillRect(0, 0, 100, 100);