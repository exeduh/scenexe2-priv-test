!function() {
 const dim = dimension.create({
    mapSize: 2000,
    name: 'test',
    type: '4teams',
    freeJoin: true,
    allowScale: true,
    removeFallens: true,
    displayName: '4 Teams',
    displayRadiant: 0.3,
    displayColor: -6,
    walls: [],
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
    maxPolygonSides: 8,
    maxPolygonCount: 30,
    spawnPlayer: function(team, tank) {
      tank.invincible = false
      tank.invincibleTime = 0
      setTimeout(function() {
        if(tank.ws.sendPacket) {
          tank.ws.sendPacket('announcement', 'Welcome to a scenexe2 private server! Type /a to get command access')
        }
      })
      return [0, 0]
    }
 })
  
 generator.wormhole({
    x: 500,
    y: 0,
    size: 75,
    type: 2,
    dim: dim,
    action: function(tank) {
      tank.radiant ++
      dimension.sendTankTo({
        tank: tank,
        dim: 'test',
      })
    }
 })
  
 setTimeout(function() {
    
    generator.polygon({
      x: 500,
      y: 0,
      d: 2 * Math.PI * Math.random(),
      sides: -1,
      dim: dim,
      radiant: 4
    })
    
    const bot = generator.tank({
      dim: dim,
      x: -1000,
      y: 0,
      name: 'Test Bot',
      weapon: 'quad',
      body: 'repeller',
      score: 0,
      radiant: 3,
      static: true,
      team: 8
    })
    bot.firing = true
    let passive = false
    setInterval(function() {
      bot.passive = passive = !passive
    }, 1000)
    setInterval(function() {
      bot.d += 0.1
    }, 100)
    
 }, 1000)
}()
