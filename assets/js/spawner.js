function Spawner(hero){
  this.hero=hero;
  const numberOfEnemies = 20;
  const radius = 120; // Radius of the circle on which enemies will be placed
  this.enemies = [];

  for (let i = 0; i < numberOfEnemies; i++) {
    let angle = (i / numberOfEnemies) * 2 * Math.PI; // Divide the circle into segments
    let enemy = new Enemy(16, 16, types.ENEMY, i, numberOfEnemies);
    enemy.e.x=this.hero.x + radius * Math.cos(angle); // Position enemies in a circle
    enemy.e.y=this.hero.y + radius * Math.sin(angle);
    this.enemies.push(enemy);
  }

  this.update = function(delta, t) {
    this.enemies.forEach(enemy => {
      enemy.update(delta, this.enemies);
      enemy.e.update(delta);
    });
  }

}
