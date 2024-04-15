function Cart() {
  this.cam=new Camera();
  this.tips=true;
  this.time=0;

  // if the window is 800px and your canvas 600px, apply scale(/*800/600 = */ 1.2)
  this.scale = 1;
  this.reset=false;

  // Set up one entity to render test
  this.hero = new Entity(16, 16, 0, 0, 0, types.HERO);

  // New entity for rotation
  this.rotatingEntity = new Entity(8, 8, 0, 0, 0, types.SHIELD);
  this.spinningEntity = new Entity(4, 4, 0, 0, 0, types.SHIELD);
  this.chasingEntity = new Entity(8, 8, 0, 0, 0, types.SHIELD);
  this.helicalEntity = new Entity(8, 8, 0, 0, 0, types.SHIELD);
  this.figureEightEntity = new Entity(4, 4, 0, 0, 0, types.SHIELD);

  this.enemies = [];
  const numberOfEnemies = 50;
  const radius = 100; // Radius of the circle on which enemies will be placed

  for (let i = 0; i < numberOfEnemies; i++) {
    let angle = (i / numberOfEnemies) * 2 * Math.PI; // Divide the circle into 30 segments
    let enemy = new Enemy(16, 16, types.ENEMY, i, numberOfEnemies);
    enemy.e.x=this.hero.x + radius * Math.cos(angle); // Position enemies in a circle
    enemy.e.y=this.hero.y + radius * Math.sin(angle);
    //this.enemies.push(enemy); // Position and type for the enemy);
  }

  // Render & Logic
  this.update = function(delta, time, gameStarted=false) {
    this.time+=delta;

    if(gameStarted){ // Game loop
      mg.clear();
      // let font = "30px Papyrus";
      // writeTxt(ctx, 1, font,"WHITE","Main Game:", canvasW-300, 200);

      // hero
      this.hero.update(delta);

      this.enemies.forEach(enemy => {
        enemy.update(delta, this.enemies);
        enemy.e.update(delta);
      });

      this.rotatingEntity.update(delta);
      this.spinningEntity.update(delta);
      this.chasingEntity.update(delta);
      //this.figureEightEntity.update(delta);

      // Update rotating entity position
      let radius = 60; // Adjust as needed
      let rotateSpeed = 2;
      let angle = this.time * 2 * Math.PI / rotateSpeed;
      this.rotatingEntity.x = (this.hero.x+32) + radius * Math.cos(angle);
      this.rotatingEntity.y = (this.hero.y+32) + radius * Math.sin(angle);

      // Update spinning entity position around rotatingEntity
      let spinningRadius = 60; // Adjust as needed
      let spinningAngle = this.time * 2 * Math.PI / .6; // Adjust rotation speed
      this.spinningEntity.x = (this.rotatingEntity.x+16) + spinningRadius * Math.cos(spinningAngle);
      this.spinningEntity.y = (this.rotatingEntity.y+16) + spinningRadius * Math.sin(spinningAngle);

      // Update chasing entity position
      let chasingSpeed = 0.1; // Adjust chasing speed as needed
      let dx = this.hero.x - this.chasingEntity.x;
      let dy = this.hero.y - this.chasingEntity.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 1) { // Move only if distance is significant
        this.chasingEntity.x += chasingSpeed * dx;
        this.chasingEntity.y += chasingSpeed * dy;
      }

      // Update figure-eight entity position
      radius = 100; // Adjust as needed
      let orbitSpeed = 2; // Adjust orbit speed as needed
      let x = this.hero.x + radius * Math.sin(this.time * orbitSpeed);
      let y = this.hero.y + radius * Math.sin(this.time * 2 * orbitSpeed); // Double the frequency for the figure-eight pattern
      this.figureEightEntity.x = x;
      this.figureEightEntity.y = y;

      // Movement for Hero
      let speed = delta*400;
      if(left()){
        this.hero.x-=speed;
      }

      if(right()){
        this.hero.x+=speed;
      }

      if(up()){
        this.hero.y-=speed;
      }

      if(down()){
        this.hero.y+=speed;
      }
    } else { // Intro Screen
      let fontSize=getResponsiveFontSize(.05);
      mg.clear();
      ctx.save();
      drawBox(ctx,0.8,"black",0,0,canvasW,canvasH)
      let font=`${fontSize}px Arial`;
      writeTxt(ctx, 1, font,"WHITE","Game Title", 30, 90);
      writeTxt(ctx, 1, font,"WHITE",startDelay>0?"Generating World ..":"Press any key to start", 30, canvasH-120);
      writeTxt(ctx, 1, font,"WHITE","INTRO SCREEN " + TIME, 30, 200);
      ctx.restore();
    }
  }
}
