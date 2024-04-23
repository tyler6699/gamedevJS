function Hero(w, h, x, y, angle, type) {
  this.e = new Entity(16, 16, 0, 0, 0, types.HERO);
  this.hair = new Entity(13, 13, 0, 0, 0, types.HAIR1);
  this.head = new Entity(11, 9, 0, 0, 0, types.HEAD1);
  this.hat = new Entity(16, 14, 0, 0, 0, types.HAT);
  this.rHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.lHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.change=false;
  this.handMovementPhase = 0;
  this.hp=100;
  this.power=0;
  this.particles=[];
  this.showhat=false;

  this.update = function(delta) {
    this.e.move(delta);
    this.e.update(delta);

    this.particles.forEach(p => {
      p.update(ctx, delta);
    });

    this.particles = this.particles.filter(function (p) {
      return p.remove == false;
    });

    if(gameStarted){
      cart.hero.e.flip=this.e.dir==1;
      cart.hero.hair.flip=this.e.dir==1;
      cart.hero.head.flip=this.e.dir==1;
    }

    this.head.x=this.e.x+18;
    this.head.y=this.e.y+18;
    this.head.update(delta);

    switch(this.hair.type){
      case types.HAIR1:
        this.hair.x=this.e.x+8;
        this.hair.y=this.e.y-6;
        break;
      case types.HAIR2:
        this.hair.x=this.e.x-6;
        this.hair.y=this.e.y-8;
        break;
      case types.HAIR3:
        this.hair.x=this.e.x+10;
        this.hair.y=this.e.y+2;
        break;
      case types.HAIR4:
        this.hair.x=this.e.x+18;
        this.hair.y=this.e.y+20;
        break;
      case types.HAT:
        this.hair.x=this.e.x+18;
        this.hair.y=this.e.y+20;
        break;
    }

    if(this.change){
      this.hairChange=false;
      this.head.setType();
      this.hair.setType();
    }

    if(!this.showhat){
        this.hair.update(delta);
    }

    // Update the phase, increase by delta time
    this.handMovementPhase += delta;

    // Bouncing Hands
    let bounce = 3 * Math.sin(this.handMovementPhase * 2 * Math.PI * 0.4); // Oscillates with an amplitude of 5 pixels, frequency of 0.5 Hz
    let xr=this.e.flip?55:65;
    let xl=this.e.flip?15:25;
    this.rHand.x = this.e.x + xr;
    this.rHand.y = this.e.y + 65 + bounce;
    this.lHand.x = this.e.x + xl;
    this.lHand.y = this.e.y + 65 + bounce;

    this.rHand.update(delta);
    this.lHand.update(delta);

    if(this.showhat){
      this.hat.flip=this.e.flip;
      this.hat.x=this.e.x+1;
      this.hat.y=this.e.y-8;
      this.hat.update(delta);
    }

  }

}
