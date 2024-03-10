! function() {
  const dim = dimension.create({
    mapSize: 6000,
    name: 'sanctuary',
    type: 'ffa',
    freeJoin: true,
    displayName: 'Sanctuary',
    displayColor: 6,
    walls: [
      [4000, 4000, 2000, 2000],
      [-4000, 4000, 2000, 2000],
      [4000, -4000, 2000, 2000],
      [-4000, -4000, 2000, 2000],
      [1100, 4000, 900, 2000],
      [-1100, 4000, 900, 2000],
      [1100, -4000, 900, 2000],
      [-1100, -4000, 900, 2000],
      [4000, 1100, 2000, 900],
      [4000, -1100, 2000, 900],
      [-4000, 1100, 2000, 900],
      [-4000, -1100, 2000, 900],
      [0, 0, 1100, 1100, 6]
    ],
    gates: [
      [3, -2300, 0, 0, 200, false, 0],
      [3, 2300, 0, 2, 200, false, 0],
      [3, 0, -2300, 1, 200, false, 0],
      [3, 0, 2300, 3, 200, false, 0]
    ],
    background: {
      r: 105,
      g: 105,
      b: 105
    },
    grid: {
      r: 100,
      g: 100,
      b: 100
    },
    gridSize: 25,
    maxPolygonSides: 0,
    maxPolygonCount: 0,
  });

  function ascend(tank) {
    tank.upgrades = [0, 0, 0, 0, 0, 0, 0, 0];
    tank.countUpgrades();
    tank.weapon = "nova";
    tank.body = "celestial";
    tank.update();
    tank.team = 6,
    tank.removeBullets();
  }

  dim.spawnPlayer = function(team, tank) {
    tank.ascend();
    tank.invincible = true;
    setTimeout(function() {
      if (tank.ws.sendPacket) {
        tank.ws.sendPacket('announcement', 'You have ascended');
      }
    });
    ascend(tank);
    var x = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    var y = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    return [x, y];
  };

  const randomX = Math.floor(Math.random() * (1800 - 1000 + 1) + 1000);
  const randomY = Math.floor(Math.random() * (1800 - 1000 + 1) + 1000);

  function createWormhole(dim, destination) {
    generator.wormhole({
      x: randomX,
      y: randomY,
      size: 75,
      type: 0,
      dim: dim,
      action: function(tank) {
        dimension.sendTankTo({
          tank: tank,
          dim: destination,
        });
      }
    });
  }

  setInterval(function() {
    createWormhole(dim, "2teams");
    createWormhole(dim, "2teams");
    createWormhole(dim, "2teams");
  }, 60000);

  setTimeout(function() {
    const bot = generator.tank({
      dim: dim,
      x: 0,
      y: 0,
      name: 'Prime Celestial',
      weapon: 'ganymede',
      body: 'andromeda',
      score: 1.5e+22,
      radiant: 0,
      static: true,
      god: true,
      team: 6
    });
    bot.firing = false;
    function rotateBot() {
      const rotationSpeed = 0.1;
      const rotationDirection = Math.random() < 0.5 ? 1 : -1;
      bot.d += rotationSpeed * rotationDirection;
    }
    setInterval(rotateBot, Math.random() * 10000 + 1000);
  }, 1000);
}();
