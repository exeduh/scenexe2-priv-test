!function() {
 const dim = dimension.create({
    mapSize: 6000,
    name: '2teams',
    type: '2teams',
    freeJoin: true,
    allowScale: false,
    removeFallens: false,
    displayName: '2 Teams',
    displayColor: 4,
    walls: [[-5200, 0, 800, 6000, 1], [5200, 0, 800, 6000, 2]],
    gates: [],
    background: {
      r: 205,
      g: 205,
      b: 205
    },
    grid: {
      r: 200,
      g: 200,
      b: 200
    },
    gridSize: 25,
    maxPolygonSides: 13,
    maxPolygonCount: 30,
    spawnPlayer: function(team, tank) {
      tank.invincible = true;
      tank.update();

      const yValues = [0, -2500, 2500, 5000, 5000];
      const randomY = yValues[Math.floor(Math.random() * yValues.length)];

      let xValue;
      if (team === 2) {
        xValue = 5200;
      } else if (team === 1) {
        xValue = -5200;
      } else {
        xValue = dim.mapSize - 2000;
      }

      tank.x = xValue;
      tank.y = randomY;

      setTimeout(function() {
      }, 0);

      return [tank.x, tank.y];
    }
 });

 setTimeout(function() {
    const dr1 = generator.tank({
      dim: dim,
      x: 5200,
      y: 0,
      name: 'Red Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 2
    });
    const dr2 = generator.tank({
      dim: dim,
      x: 5200,
      y: 2500,
      name: 'Red Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 2
    });
    const dr3 = generator.tank({
      dim: dim,
      x: 5200,
      y: -2500,
      name: 'Red Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 2
    });
    const dr4 = generator.tank({
      dim: dim,
      x: 5200,
      y: 5000,
      name: 'Red Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 2
    });
    const dr5 = generator.tank({
      dim: dim,
      x: 5200,
      y: -5000,
      name: 'Red Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 2
    });
    const db1 = generator.tank({
      dim: dim,
      x: -5200,
      y: 0,
      name: 'Blue Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 1
    });
    const db2 = generator.tank({
      dim: dim,
      x: -5200,
      y: 2500,
      name: 'Blue Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 1
    });
    const db3 = generator.tank({
      dim: dim,
      x: -5200,
      y: -2500,
      name: 'Blue Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 1
    });
    const db4 = generator.tank({
      dim: dim,
      x: -5200,
      y: 5000,
      name: 'Blue Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 1
    });
    const db5 = generator.tank({
      dim: dim,
      x: -5200,
      y: -5000,
      name: 'Blue Defender',
      weapon: 'defender',
      body: 'defender',
      ai: 'defender',
      score: 1.8e19,
      static: true,
      team: 1
    });
 }, 1000);
}()
