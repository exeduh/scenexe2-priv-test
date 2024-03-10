const {
  pack,
  unpack
} = require("msgpackr"),
WebSocket = require("ws"),
{
  WebSocketServer
} = WebSocket,
fs = require("fs"),
http = require("http"),
url = require("url"),
perf_hooks = require("perf_hooks"),
_performance = perf_hooks.performance;
let secret = {},
____ = [];
const checkName = function(e) {
  return ! 0
};
let createAchievement = function(e) {
  return {
    time: Math.floor(Date.now() / 1e3),
    id: e
  }
};
const access = {
  testing: [],
  p2: ["tp", "team", "dim", "weapon", "body", "kick", "ban", "kill", "remove", "ascend", "vanish", "drag", "getip", "god", "name", "radiant", "xp", "bot", "fallenbot", "missile", "mapsize", "polygon", "polyhedra", "announce", "createwall", "removewall", "dragwall", "wallsize", "maxpolygoncount", "maxpolygonsides", "loadwalls", "uploadwalls", "downloadwalls", "savewalls", "wormhole"]
};
console.log = new Proxy(console.log, {
  apply: function(e, t, a) {
    let n = new Date;
    return a.unshift(` [$ {
      n.toDateString()
    }
    $ {
      n.toTimeString().split(" ")[0]
    }]`),
    Reflect.apply(e, t, a)
  }
});
const main = function(tankData, args) {
  process.on("uncaughtException",
  function(e) {
    console.log(e)
  });
  let sendAchievement = function(e, t) {
    e && e.ws && e.ws.accountName && !e.dim.sandbox && args.parentPort.postMessage(["achievement", [e.ws.accountName, t]])
  },
  gameEnd = function(e) {
    if (e.ws && e.ws.accountName && e.ws.accountData && e.ws.timeStart > 0 && !e.dim.sandbox) {
      let t = Math.floor((_performance.now() - e.ws.timeStart) / 1e3);
      e.ws.accountData.timeAlive += t,
      e.ws.accountData.score = e.score,
      args.parentPort.postMessage(["gameEnd", [e.ws.accountName, e.ws.accountData, e.score]]),
      e.ws.accountName = !1,
      e.ws.accountData = !1
    }
  },
  app = function(e, t) {
    let a = url.parse(e.url),
    n = a.pathname;
    "/tankData.json" === n ? (t.setHeader("Access-Control-Allow-Origin", "*"), t.writeHead(200, {
      "Content-Type": "application/json"
    }), t.end(JSON_tankData)) : (t.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    }), t.end('<script>document.write(`<a style="font-family:monospace" href="${\'https://scenexe2.io?s=\' + new URL(location.href).host}">connect to private server</div>`)</script>'))
  },
  httpServer = secret.key && secret.cert ? http.createServer({
    key: fs.readFileSync(secret.key),
    cert: fs.readFileSync(secret.cert)
  },
  app) : http.createServer(app);
  args.port >= 0 ? httpServer.listen(args.port) : httpServer.listen();
  let server = new WebSocketServer({
    noServer: !0
  });
  httpServer.on("upgrade", (e, t, a) = >{
    let n = !0,
    i = {};
    for (let s in e.headers) s.startsWith("scenexe2") && (i[s] = e.headers[s]);
    let o = url.parse(e.url);
    Object.fromEntries(new url.URLSearchParams(o.query));
    let r = o.pathname,
    d = !0,
    $;
    if (r.startsWith("/ws-")) {
      if (6 === ($ = r.slice(4)).length) {
        let c = 0;
        for (let u = 0; u < 5; u++) {
          let p = "0123456789abcdef".indexOf($[u]);
          if (p < 0) {
            d = !1;
            break
          }
          c += p
        }
        "0123456789abcdef".indexOf($[5]) !== c % 16 && (d = !1)
      } else d = !1
    } else d = !1;
    if (d) {
      for (let m = clients.length - 1; m >= 0; m--) if (clients[m].joinToken === $) {
        d = !1;
        break
      }
    }
    d ? server.handleUpgrade(e, t, a, e = >{
      e._headers = i,
      n ? e.joinToken = $: e.failedHeaderCheck = !0,
      server.emit("connection", e)
    }) : t.destroy()
  });
  let JSON_tankData = JSON.stringify(tankData),
  Detector = function() {
    let e = {
      sliceWidth: 100,
      rules: {
        tank: {
          tank: !0,
          detectEnemies: !0,
          detectFriends: !0,
          bullet: !0,
          polygon: !0,
          wall: !0,
          gate: !0,
          wormhole: !0
        },
        detectEnemies: {
          tank: !0,
          polygon: !0,
          bullet: !0
        },
        bullet: {
          tank: !0,
          bullet: !0,
          polygon: !0,
          wall: !0,
          gate: !0,
          wormhole: !0,
          detectEnemies: !0
        },
        polygon: {
          tank: !0,
          bullet: !0,
          detectEnemies: !0,
          polygon: !0,
          wall: !0,
          gate: !0,
          wormhole: !0
        },
        detectFriends: {
          tank: !0
        },
        wall: {
          tank: !0,
          bullet: !0,
          polygon: !0
        },
        gate: {
          tank: !0,
          bullet: !0,
          polygon: !0
        },
        wormhole: {
          tank: !0,
          bullet: !0,
          polygon: !0
        }
      },
      canCollide: function(t, a) {
        return ! t.noCollide && !a.noCollide && ("bullet" === t.type && "bullet" === a.type ? !dimension.isSameTeam(t.object, a.object) || t.object.type === a.object.type: (0, e.rules[t.type][a.type]))
      },
      checkCircle: function(e, t) {
        let a = {
          dx: e.x - t.x,
          dy: e.y - t.y,
          distance: 0,
          size: e.size + t.size,
          colliding: !1
        };
        return a.distance = a.dx * a.dx + a.dy * a.dy,
        a.distance < a.size * a.size && (a.colliding = !0),
        0 === a.dx && 0 === a.dy && (a.dy = 1),
        a
      },
      checkRect: function(e, t) {
        t.rectangular && ([e, t] = [t, e]);
        let a = {
          dx: t.x - e.x,
          dy: t.y - e.y,
          colliding: !0,
          rect: e,
          circle: t
        };
        e.noClip ? a.size = t.size: a.size = t.size < 2 * dimension.clipSize ? t.size / 2 : t.size - dimension.clipSize,
        a.inX = t.x + a.size > e.left && t.x - a.size < e.right,
        a.inY = t.y + a.size > e.bottom && t.y - a.size < e.top;
        let n = t.size - a.size;
        return (a.cinX = t.x > e.left + n && t.x < e.right - n, a.cinY = t.y > e.bottom + n && t.y < e.top - n, (a.inX && a.cinY) + (a.inY && a.cinX)) ? (a.hitSide = !0, a) : (a.cx = t.x < e.x ? e.left + n: e.right - n, a.cy = t.y < e.y ? e.bottom + n: e.top - n, a.dcx = t.x - a.cx, a.dcy = t.y - a.cy, a.distance = a.dcx * a.dcx + a.dcy * a.dcy, a.distance >= t.size * t.size && (a.colliding = !1), a)
      },
      detectCollisions: function(t, a) {
        let n = {},
        i = {},
        s = 1 / e.sliceWidth,
        o = t.length;
        for (let r = 0; r < o; r++) {
          let d = t[r],
          $ = d.w || d.size,
          c = d.h || d.size;
          d.left = d.x - $,
          d.right = d.x + $,
          d.bottom = d.y - c,
          d.top = d.y + c,
          d.w = $,
          d.h = c,
          d.internalId = r;
          let u = 1 + Math.floor(d.left * s),
          p = 1 + Math.floor(d.right * s);
          for (let m = u; m <= p; m++) m in i ? i[m].push(d) : i[m] = [d]
        }
        let _ = (e, t) = >e.bottom - t.bottom,
        f = function(e, t) {
          let a = n[e];
          return a || (a = n[e] = {}),
          !(t in a) && (a[t] = !0, !0)
        },
        g = 0;
        for (let y in i) {
          let h = i[y];
          h.sort(_);
          for (let k = 0, v = h.length - 1; k < v; k++) {
            let b = h[k];
            for (let w = k + 1; w <= v; w++) {
              let x = h[w];
              if (x.bottom > b.top) break;
              if (b.right >= x.left && b.left <= x.right && (b.object, x.object, e.canCollide(b, x) && f(b.internalId, x.internalId))) {
                if (b.rectangular || x.rectangular) {
                  if (b.rectangular ^ x.rectangular) {
                    let z = e.checkRect(b, x);
                    z.colliding && a(z.circle, z.rect, z)
                  }
                } else {
                  let T = e.checkCircle(b, x);
                  T.colliding && a(b, x, T)
                }
              }
              g++
            }
          }
        }
        return g
      }
    };
    return e
  } (),
  View = function() {
    let e = {
      sliceWidth: 100,
      rules: {
        fov: {
          bullet: !0
        },
        bullet: {
          fov: !0
        }
      },
      canCollide: function(t, a) {
        return e.rules[t.type][a.type]
      },
      checkCircle: function(e, t) {
        let a = {
          dx: e.x - t.x,
          dy: e.y - t.y,
          distance: 0,
          size: e.size + t.size,
          colliding: !1
        };
        return a.distance = a.dx * a.dx + a.dy * a.dy,
        a.distance < a.size * a.size && (a.colliding = !0),
        0 === a.dx && 0 === a.dy && (a.dy = 1),
        a
      },
      detectCollisions: function(t, a) {
        let n = {},
        i = {},
        s = 1 / e.sliceWidth,
        o = t.length;
        for (let r = 0; r < o; r++) {
          let d = t[r],
          $ = d.w || d.size,
          c = d.h || d.size;
          d.left = d.x - $,
          d.right = d.x + $,
          d.bottom = d.y - c,
          d.top = d.y + c,
          d.w = $,
          d.h = c,
          d.internalId = r;
          let u = 1 + Math.floor(d.left * s),
          p = 1 + Math.floor(d.right * s);
          for (let m = u; m <= p; m++) m in i ? i[m].push(d) : i[m] = [d]
        }
        let _ = (e, t) = >e.bottom - t.bottom,
        f = function(e, t) {
          let a = n[e];
          return a || (a = n[e] = {}),
          !(t in a) && (a[t] = !0, !0)
        },
        g = 0;
        for (let y in i) {
          let h = i[y];
          h.sort(_);
          for (let k = 0, v = h.length - 1; k < v; k++) {
            let b = h[k];
            for (let w = k + 1; w <= v; w++) {
              let x = h[w];
              if (x.bottom > b.top) break;
              if (b.right >= x.left && b.left <= x.right && (b.object, x.object, e.canCollide(b, x) && f(b.internalId, x.internalId))) {
                let z = e.checkCircle(b, x);
                z.colliding && a(b, x, z)
              }
              g++
            }
          }
        }
        return g
      }
    };
    return e
  } (),
  clients = [],
  game = {
    clients: clients,
    tokens: {},
    tokenUses: {},
    generateToken: function() {
      let e = "scenexe2-";
      for (let t = 0; t < 55; t++) e += "0123456789abcdef" [Math.floor(16 * Math.random())];
      return e in game.tokens ? game.generateToken() : e
    },
    codes: args.codes ||
    function() {
      let e = {
        recieve: {
          ready: 0,
          gameUpdate: 1,
          gameStart: 2,
          announcement: 3,
          death: 4,
          setStats: 5,
          test: 6,
          flag: 7,
          eval: 8,
          waiting: 9
        },
        send: {
          joinGame: 0,
          chat: 1,
          typing: 2,
          passive: 3,
          firing: 4,
          controlPosition: 5,
          upgradeStat: 6,
          upgradeWeapon: 7,
          upgradeBody: 8,
          restore: 9,
          direction: 10,
          d: 11,
          token: 12,
          result: 13,
          ping: 14,
          captcha: 15,
          login: 16,
          createAccount: 17
        }
      };
      for (let t in e.send) e.send[e.send[t]] = t;
      for (let a in e.recieve) e.recieve[e.recieve[a]] = a;
      return e
    } (),
    c: {
      recieve: {
        0 : "ready",
        ready: 0,
        1 : "gameUpdate",
        gameUpdate: 1,
        2 : "gameStart",
        gameStart: 2,
        3 : "announcement",
        announcement: 3,
        4 : "death",
        death: 4,
        5 : "setStats",
        setStats: 5,
        6 : "test",
        test: 6,
        7 : "flag",
        flag: 7
      },
      send: {
        joinGame: 14,
        14 : "joinGame",
        chat: 1,
        1 : "chat",
        typing: 2,
        2 : "typing",
        passive: 3,
        3 : "passive",
        firing: 4,
        4 : "firing",
        controlPosition: 5,
        5 : "controlPosition",
        upgradeStat: 6,
        6 : "upgradeStat",
        upgradeWeapon: 7,
        7 : "upgradeWeapon",
        upgradeBody: 8,
        8 : "upgradeBody",
        restore: 9,
        9 : "restore",
        direction: 10,
        10 : "direction",
        d: 11,
        11 : "d",
        token: 17,
        17 : "token",
        result: 29,
        29 : "result",
        ping: 31,
        31 : "ping",
        captcha: 79,
        79 : "captcha"
      }
    },
    token: secret.token
  },
  createMessage = function() {
    args.parentPort.postMessage(["createMessage", Array.from(arguments)])
  },
  dimension = {
    clipSize: 125,
    tickTime: .02,
    tickRate: 50,
    tickMultiplier: 2,
    power97: .9409,
    power96: .9216,
    savedWalls: {
      m1: [[ - 1599, 1501, 1400, 1500], [1599, 1499, 1400, 1500], [149, 1399, 50, 1400], [ - 149, 1399, 50, 1400], [ - 101, 2799, 10, 200], [ - 201, 2801, 10, 200], [199, 2801, 10, 200], [99, 2801, 10, 200], [ - 1, -599, 400, 400]],
      m2: [[6, -671, 500, 100], [677, 761, 50, 100], [12, 302, 500, 100], [605, -525, 100, 250], [611, 149, 100, 250], [ - 593, -185, 100, 585], [669, -191, 10, 100], [676, 1037, 50, 100], [552, -192, 10, 100], [1980, -1750, 400, 400], [1291, 1696, 700, 700], [ - 1913, -1926, 900, 900], [ - 627, 662, 1e3, 100], [1575, 715, 50, 100], [1430, 1338, 50, 100], [1576, 995, 50, 100], [ - 131, 1072, 500, 100], [157, 1680, 200, 300], [865, 968, 50, 100], [1456, 101, 500, 300], [419, -188, 25, 200], [868, 686, 50, 100], [1059, 760, 50, 100], [1059, 1041, 50, 100], [296, 24, 25, 100], [1236, 825, 50, 100], [1406, 925, 50, 100], [298, -400, 25, 100], [292, -193, 100, 25], [2377, 336, 100, 100], [169, -191, 25, 100], [93, -390, 100, 100], [97, 9, 100, 100], [47, -193, 50, 50], [ - 183, -394, 100, 100], [ - 177, 4, 100, 100], null, [ - 183, -193, 100, 50], [ - 442, 151, 50, 50], null, [ - 442, -522, 50, 50], [ - 328, -50, 50, 50], [ - 333, -341, 50, 50], [ - 790, -178, 100, 400], [ - 1038, -182, 100, 300], null, [ - 1297, -187, 100, 200], [ - 1564, -191, 100, 100], [ - 2806, -1126, 100, 100], [ - 3e3, -1421, 100, 100], [ - 2811, -1711, 100, 100], [ - 3003, -2e3, 100, 100], [ - 2804, -2291, 100, 100], [ - 3001, -2592, 100, 100], [ - 2594, -3003, 100, 100], [ - 2291, -2826, 100, 100], [ - 1113, -2831, 100, 100], [ - 1402, -2996, 100, 100], [ - 1685, -2823, 100, 100], [ - 1983, -2996, 100, 100], [ - 2990, -3163, 10, 10], [ - 2990, -3144, 10, 10], [ - 2990, -3122, 10, 10], [ - 2993, -3100, 10, 10], [ - 2964, -3120, 10, 10], null, [ - 2967, -3122, 10, 10], null, null, null, [ - 2945, -3122, 10, 10], [ - 2942, -3101, 10, 10], [ - 2893, -3124, 10, 10], [ - 2892, -3105, 10, 10], [ - 2894, -3163, 10, 10], [1162, -943, 200, 500], null, null, [2078, -2588, 500, 200], null, [ - 583, 1877, 300, 500], [298, -1628, 400, 600], [919, -902, 100, 100], [ - 1685, 1157, 500, 200], null, null, [ - 1469, 1818, 300, 200], [2694, -1879, 100, 500], [1124, 660, 500, 100], null, [520, -2690, 600, 100], null, [2197, -1026, 600, 100], [2492, 14, 300, 400], [ - 2802, -317, 200, 600], null, [2309, -666, 700, 100], [ - 1905, -797, 500, 100], [2607, 660, 400, 100], [2494, 1471, 500, 100], null, [2501, 2263, 200, 500], [ - 481, -2708, 400, 300], [2520, 1085, 300, 100], null, null, [ - 2089, 151, 300, 600], null, [1148, -2019, 200, 300], [ - 717, -2117, 300, 100], null, [ - 403, -1740, 300, 100], [ - 710, -1400, 300, 100], null, [293, 2282, 300, 100], [3085, 2455, 200, 100], [1689, 2699, 300, 100], [ - 2376, 2134, 300, 500], [ - 1450, 2804, 400, 200], [ - 2802, 1148, 200, 100], null, [723, 2908, 300, 100], [738, 2474, 300, 100], [ - 760, 2900, 300, 100], [ - 2156, 2908, 300, 100], [ - 1319, 467, 300, 100], [1918, 666, 100, 100], [ - 38, 2679, 200, 100], null, [ - 1478, 2313, 300, 100], [ - 893, 1067, 100, 100], [ - 2595, 646, 200, 100], [2677, -2486, 100, 100], [2904, -2904, 100, 100], [1491, 2393, 100, 100], [1892, 2611, 100, 100], [1890, 2778, 100, 100], [1490, 2984, 100, 100], [940, 2834, 100, 100], [942, 2536, 100, 100], [ - 35, 2788, 100, 100], [ - 37, 2591, 100, 100], [ - 19, 1950, 100, 30], null, [ - 148, 1880, 30, 100], [ - 153, 1478, 30, 100], [ - 279, 1406, 100, 30], [ - 253, 1685, 30, 50], null, [ - 74, 1684, 30, 50], [2571, 1655, 100, 100]]
    },
    saveWalls: function(e, t) {
      if (!t || t.length <= 0) return "Failed: Invalid name";
      let a = e.walls.slice(e.defaultWalls);
      return a.length > 0 ? (dimension.savedWalls[t] = JSON.parse(JSON.stringify(a)), `Success: saved as $ {
        t
      }`) : "Failed: No walls to save"
    },
    loadWalls: function(e, t, a) {
      if (!t) return "Failed: Invalid name";
      let n = a ? t: dimension.savedWalls[t];
      if (!n) return "Failed: Invalid name";
      n = JSON.parse(JSON.stringify(n));
      let i = e.walls.length;
      if (i > e.defaultWalls) {
        for (let s = e.defaultWalls; s < i; s++) e.removedWalls[s] = s;
        e.walls = e.walls.slice(0, e.defaultWalls)
      }
      i = e.walls.length;
      for (let o = 0, r = n.length; o < r; o++) e.walls.push(n[o]),
      delete e.removedWalls[i],
      e.updatedWalls[i] = n[o],
      i++;
      return`Success: Loaded $ {
        n.length
      }
      walls`
    },
    antilag: function() {
      for (let e in dimension.dims) {
        let t = dimension.dims[e],
        a = t.tanks;
        for (let n = a.length - 1; n >= 0; n--) {
          let i = a[n];
          i.static || i.ws.data.isPlayer || i.remove()
        }
        for (let s = t.tanks.length - 1; s >= 0; s--) t.tanks[s].removeBullets();
        for (let o = t.polygons.length - 1; o >= 0; o--) t.polygons[o].remove()
      }
    },
    antibot: function() {
      for (let e in dimension.dims) {
        let t = dimension.dims[e].tanks;
        for (let a = t.length - 1; a >= 0; a--) {
          let n = t[a]; ! n.static && n.ws.data.isPlayer && n.score < 1e4 && (n.remove(), n.ws.close())
        }
      }
    },
    sendTankTo: function(e) {
      if (e.tank.destroyed) return;
      e.tank.destroyed = !0;
      let t = e.dim;
      e.dim = dimension.dims[t];
      let a = {
        dim: e.dim,
        ai: e.tank.aiInput,
        aiRam: e.tank.aiRam,
        polygon: e.tank.polygon,
        invisible: e.tank.invisible,
        noKillNotification: e.tank.noKillNotification,
        forceDeathScore: e.tank.forceDeathScore,
        x: e.x || 0,
        y: e.y || 0,
        d: e.tank.d,
        upgrades: e.tank.upgrades,
        upgradeCount: e.tank.upgradeCount,
        radiant: e.tank.radiant,
        name: e.tank.name,
        team: e.tank.team,
        score: e.tank.score,
        weapon: e.tank.weapon,
        body: e.tank.body,
        passive: e.tank.passive
      };
      if (e.tank.team && (e.tank.ws.data.lastTeam = e.tank.team), e.dim) e.dim.newTanks.push([a, e.tank.ws, e.tank.dim.name]),
      e.tank.remove(!0);
      else if (!dimension.isolate || e.override) {
        if (e.tank.ws.data.isPlayer) {
          if (e.tank.ws.data.uid >= 0) {
            if (delete a.aiRam, delete a.ai, delete a.dim, a.commands = e.tank.ws.data.commands, e.tank.ws.accountData) {
              let n = Math.floor((_performance.now() - e.tank.ws.timeStart) / 1e3);
              e.tank.ws.accountData.timeAlive += n
            }
            args.parentPort.postMessage(["send", [e.tank.ws.data.uid, t, [a, e.tank.dim.name], e.tank.ws.accountData, e.tank.ws.accountName]])
          }
        } else "string" != typeof e.tank.ai && e.tank.ai || (delete a.dim, a.commands = {},
        args.parentPort.postMessage(["sendBot", [t, [a, e.tank.dim.name]]]));
        e.tank.remove(!0)
      }
    },
    getBulletSpeed: function(e, t) {
      let a = 4.5 * e.speed * (1 + t.upgrades[1] / 30);
      return 1 === e.type || 3 === e.type ? a *= 1.5 : (2 === e.type || 4 === e.type) && (a = 2.3 * e.speed * (1 + t.upgrades[1] / 60)),
      a
    },
    getBulletData: function(e) {
      let t = 1,
      a = 1;
      return 0 === e ? (a = 1.5, t = 100) : 1 === e ? (a = 12, t = 600) : 2 === e ? (a = 0, t = 100) : 3 === e ? (a = 12, t = 600) : 4 === e && (a = 0, t = 100),
      [a, t]
    },
    aimAtTarget: function(e, t, a) {
      a *= 2;
      let n = t.x - e.x,
      i = t.y - e.y,
      s = t.xv * t.xv + t.yv * t.yv - a * a,
      o = 2 * (n * t.xv + i * t.yv),
      r = o * o - 4 * s * (n * n + i * i);
      if (! (r > 0)) return [n, i]; {
        let d = Math.sqrt(r),
        $ = [( - o + d) / (2 * s), ( - o - d) / (2 * s)];
        if ($[0] > 0 && $[1] > 0) $ = $[0] < $[1] ? $[0] : $[1];
        else if ($[0] > 0) $ = $[0];
        else {
          if (! ($[1] > 0)) return [n, i];
          $ = $[1]
        }
        let c;
        return [n + $ * t.xv, i + $ * t.yv]
      }
    },
    wallRestitution: .1,
    averageAngles: function(e, t, a) {
      let n = 2 * Math.PI;
      e = (e % n + n) % n;
      let i = (n + t - e) % n;
      return i > Math.PI ? ((e + (i - n) / (a + 1)) % n + n) % n: ((e + i / (a + 1)) % n + n) % n
    },
    confine: function(e, t, a) {
      e.x < -t ? (e.x = -t, e.xv = Math.abs(e.xv * dimension.wallRestitution) + a) : e.x > t && (e.x = t, e.xv = -Math.abs(e.xv * dimension.wallRestitution) - a),
      e.y < -t ? (e.y = -t, e.yv = Math.abs(e.yv * dimension.wallRestitution) + a) : e.y > t && (e.y = t, e.yv = -Math.abs(e.yv * dimension.wallRestitution) - a)
    },
    getRadiantMultiplier: function(e) {
      return e <= 0 ? 1 : e <= 1 ? 1 === e ? 25 : Math.pow(25, e) : 25 * Math.pow(4, e - 1)
    },
    dims: {},
    isSameTeam: function(e, t) {
      return e && t && (e === t || e.team && e.team === t.team || e.parent && (e.parent === t.parent || e.parent === t) || t.parent && t.parent === e)
    },
    isolate: !1,
    create: function(e) {
      if (! (e.name in dimension.dims)) {
        let t = e.darkness > 0 ? Math.round(100 * e.darkness) : 0,
        a = e.maxPolygonCount || 0;
        args.lessPolygons && (a *= .1);
        let n = {
          playerCount: function() {
            let e = 0;
            for (let t = n.tanks.length - 1; t >= 0; t--) {
              let a = n.tanks[t];
              a.ws && a.ws.data && a.ws.data.isPlayer && e++
            }
            return e
          },
          entryMessage: e.entryMessage || !1,
          exitMessage: e.exitMessage || !1,
          ambientParticles: e.ambientParticles || [],
          sandbox: !!e.sandbox,
          noPolygons: !!e.noPolygons,
          forceRespawnScore: e.forceRespawnScore,
          removeFallens: !!e.removeFallens,
          autoScale: e.autoScale || !1,
          allowScale: !!e.allowScale,
          onDeath: e.onDeath ||
          function() {},
          onUpdate: e.onUpdate ||
          function() {},
          freeJoin: !!e.freeJoin,
          fillWalls: !!e.fillWalls,
          displayName: e.displayName || "",
          displayColor: e.displayColor || 0,
          displayRadiant: e.displayRadiant || 0,
          friction: !0,
          nextSpawnPolyhedra: !1,
          lastPolyhedra: 0,
          mapSize: e.mapSize || 100,
          _mapSize: 0,
          mapSizeSpeed: 0,
          lastMapSize: e.mapSize || 100,
          gridSize: e.gridSize || 30,
          background: e.background,
          grid: e.grid,
          maxPolygonSides: e.maxPolygonSides || 0,
          _maxPolygonSides: e.maxPolygonSides || 0,
          maxPolygonCount: a,
          _maxPolygonCount: a,
          name: e.name,
          tanks: [],
          type: e.type || "ffa",
          ids: {
            tank: [],
            bullet: [],
            polygon: [],
            wormhole: []
          },
          spawnPlayer: e.spawnPlayer ||
          function() {
            return [0, 0]
          },
          spawnPolygon: e.spawnPolygon || !1,
          newTanks: [],
          darkness: t,
          darknessUpdated: !1,
          setDarkness: function(e) {
            let t = e > 0 ? Math.round(100 * e) : 0;
            t !== n.darkness && (n.darkness = t, n.darknessUpdated = !0)
          },
          resizedWormholes: {},
          rupturedWormholes: {},
          fadeTimeChanges: {},
          removedWormholes: {},
          addedWormholes: {},
          updatedTanks: {},
          updatedGates: {},
          updatedPortals: {},
          updatedWalls: {},
          removedWalls: {},
          bullets: [],
          polygons: [],
          bases: [],
          walls: e.walls || [],
          defaultWalls: 0,
          gates: e.gates || [],
          wormholes: {},
          chatMessages: {},
          leaderboard: [],
          leaderboardChanges: {},
          remove: function() {
            dimension.dims[n.name] === n && delete dimension.dims[n.name]
          },
          add: function(e, t) {
            let a = n[e];
            0 > a.indexOf(t) && a.push(t)
          },
          delete: function(e, t) {
            let a = n[e],
            i = a.indexOf(t);
            i >= 0 && a.splice(i, 1)
          },
          broadcast: function(e) {
            for (let t = n.tanks.length - 1; t >= 0; t--) {
              let a = n.tanks[t];
              a.ws && a.ws.sendPacket && a.ws.sendPacket("announcement", e)
            }
          }
        };
        if (n.defaultWalls = n.walls.length, "ffa" === n.name || "4teams" === n.name || "2teams" === n.name) {
          let i = function() {
            let e = Math.floor(4 * Math.pow(Math.random(), 2)),
            t = `crasher$ {
              e + 3
            } - 0`,
            a = 0;
            if (4096 * Math.random() < 1) for (a++; 9 * Math.random() < 1;) a++;
            generator.tank({
              dim: n,
              x: (1 - 2 * Math.random()) * (n.mapSize - 2e3),
              y: (1 - 2 * Math.random()) * (n.mapSize - 2e3),
              name: "an Awakened " + ["Triangle", "Square", "Pentagon", "Hexagon"][e],
              weapon: t,
              body: t,
              noKillNotification: !0,
              score: 5250 * Math.pow(4, e),
              radiant: a,
              team: 5,
              ai: "fallen",
              aiRam: !0,
              invincible: !1,
              onDeath: function() {
                setTimeout(i, 1e4 + 2e4 * Math.random())
              },
              polygon: !0
            })
          };
          for (let s = 0; s < 10; s++) setTimeout(i, 1e4 + 2e4 * Math.random());
          let o = !1,
          r = function() {
            let e = 1 + Math.floor(3 * Math.pow(Math.random(), 4)),
            t = (1 - 2 * Math.random()) * (n.mapSize - 2e3),
            a = (1 - 2 * Math.random()) * (n.mapSize - 2e3);
            generator.wormhole({
              x: t,
              y: a,
              size: 175,
              type: 1,
              time: 300,
              dim: n,
              ruptured: !1,
              action: function(e) {
                dimension.sendTankTo({
                  tank: e,
                  dim: "abyssHallway"
                })
              }
            });
            let i = generator.tank({
              dim: n,
              x: t,
              y: a,
              name: "Peacekeeper",
              weapon: "peacekeeper" + e,
              body: "peacekeeper" + e,
              score: 1e6 * Math.pow(5, e),
              forceDeathScore: 1e6 * Math.pow(5, e),
              radiant: 1,
              team: 8,
              ai: "peacekeeper",
              invincible: !1
            }),
            s = 2 * Math.PI * Math.random();
            return i.xv = 15 * Math.sin(s),
            i.yv = 15 * Math.cos(s),
            i.d = -s,
            i
          };
          setTimeout(function() {
            o = r(),
            setInterval(function() {
              o.alive || (o = r())
            },
            18e5)
          },
          1e4 + 0 * Math.random())
        }
        return dimension.dims[n.name] = n,
        startTick(n),
        n
      }
    },
    reset: function(e) {
      for (let t = e.tanks.length - 1; t >= 0; t--) {
        let a = e.tanks[t];
        a._d = [],
        a.firedBarrels = {},
        a.lastLevelSent !== a.level && (a.lastLevelSent = a.level)
      }
      e.updatedTanks = {},
      e.chatMessages = {},
      e.updatedGates = {},
      e.resizedWormholes = {},
      e.rupturedWormholes = {},
      e.fadeTimeChanges = {},
      e.removedWormholes = {},
      e.addedWormholes = {},
      e.updatedPortals = {},
      e.updatedWalls = {},
      e.removedWalls = {},
      e.mapSizeUpdated = !1,
      e.darknessUpdated = !1
    },
    bounceCircles: function(e, t, a, n, i) {
      let s = Math.sqrt(a.distance) || 0;
      s <= 1 && (s = 1);
      let o = (a.size - s + 1) * .01 * n;
      o > .5 ? o = .5 : o < i && (o = i);
      let r = (e.x - t.x) / s * o,
      d = (e.y - t.y) / s * o,
      $ = 1,
      c = 1,
      u = e.size * (e.weight || 1),
      p = t.size * (t.weight || 1);
      t.size > e.size ? c = (c = u / p) * c: $ = ($ = p / u) * $,
      (!e.static || e.canBePushed) && ($ *= dimension.tickMultiplier / (e.density || 1), e.xv += r * $, e.yv += d * $),
      (!t.static || t.canBePushed) && (c *= dimension.tickMultiplier / (t.density || 1), t.xv += -r * c, t.yv += -d * c)
    },
    collideWall: function(e) {
      let t = e.rect,
      a = e.circle.object;
      if (e.cinX || e.cinY) {
        if (e.cinX && e.cinY) Math.abs((a.y - t.y) * t.w) > Math.abs((a.x - t.x) * t.h) ? a.y > t.y ? a.y = e.rect.top + e.size: a.y = e.rect.bottom - e.size: a.x > t.x ? a.x = e.rect.right + e.size: a.x = e.rect.left - e.size,
        "tank" !== a.objectType && a.remove();
        else {
          if (e.cinY && e.inX) {
            let n = a.x > t.x;
            n ? a.x = e.rect.right + e.size: a.x = e.rect.left - e.size,
            a.xv = (n ? 1 : -1) * Math.abs(a.xv * dimension.wallRestitution)
          }
          if (e.cinX && e.inY) {
            let i = a.y > t.y;
            i ? a.y = e.rect.top + e.size: a.y = e.rect.bottom - e.size,
            a.yv = (i ? 1 : -1) * Math.abs(a.yv * dimension.wallRestitution)
          }
        }
      } else {
        let s = Math.sqrt(e.distance);
        s < .1 && (s = .1);
        let o = a.size / s;
        a.x = e.cx + (a.x - e.cx) * o,
        a.y = e.cy + (a.y - e.cy) * o
      }
    },
    bounceGate: function(e, t, a) {
      a *= dimension.tickMultiplier,
      (0 === e.d) + (2 === e.d) ? t.xv > 0 ? (t.xv = -a, t.x = e.left - t.size - 1) : (t.xv = a, t.x = e.right + t.size + 1) : t.yv > 0 ? (t.yv = -a, t.y = e.bottom - t.size - 1) : (t.yv = a, t.y = e.top + t.size + 1)
    },
    collideGate: function(e, t) {
      let a = e.rect,
      n = a.object[5];
      if (2 === a.gateType) {
        let i = a.d < 2 ? 50 : -50;
        0 === a.d || 2 === a.d ? t.xv = i: t.yv = i
      } else 1 === a.gateType ? n || t.parent && t.parent.radiant > 0 || (t.radiant > 0 ? (a.object[5] = !0, a.object[6] = 75) : 0 === a.d || 2 === a.d ? t.xv > 0 ? (t.xv = -50, t.x = a.left - t.size - 1) : (t.xv = 50, t.x = a.right + t.size + 1) : t.yv > 0 ? (t.yv = -50, t.y = a.bottom - t.size - 1) : (t.yv = 50, t.y = a.top + t.size + 1)) : 0 === a.gateType ? t.level >= 60 && 7 !== t.team ? 6 !== t.team && (t.ascend(), t.ws && t.ws.sendPacket && t.ws.sendPacket("setStats", t.upgrades)) : dimension.bounceGate(a, t, 50) : 3 !== a.gateType || n || ([t.xv > 0, t.yv > 0, t.xv < 0, t.yv < 0][a.d] ? (a.object[5] = !0, a.object[6] = 15, 0 === a.d || 2 === a.d ? t.xv = 2 === a.d ? -100 : 100 : t.yv = 3 === a.d ? -100 : 100) : 0 === a.d || 2 === a.d ? 2 === a.d ? (t.xv = -50, t.x = a.left - t.size - 1) : (t.xv = 50, t.x = a.right + t.size + 1) : 3 === a.d ? (t.yv = -50, t.y = a.bottom - t.size - 1) : (t.yv = 50, t.y = a.top + t.size + 1))
    },
    polygonDamage: 3,
    checkAngle: function(e, t, a, n) {
      return dimension.validateAngle(Math.atan2( - a, n), e, t)
    },
    validateAngle: function(e, t, a) {
      return ! (a <= 0) && (!(t <= 0) && !(t >= 0) || !(a > 0) || Math.abs(((e - t + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) <= a)
    },
    clampAngle: function(e, t, a) {
      if ((t <= 0 || t >= 0) && a > 0) {
        let n = ((e - t + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
        if (! (Math.abs(n) <= a)) return n < 0 ? t - a: t + a
      }
      return e
    },
    collide: function(e, t, a) {
      let n = {
        tank: 0,
        detectEnemies: 1,
        bullet: 2,
        polygon: 3,
        detectFriends: 4,
        wall: 5,
        gate: 6,
        wormhole: 7
      },
      i = e.object,
      s = t.object;
      if (n[e.type] > n[t.type] && ([e, t] = [t, e], [i, s] = [s, i]), "tank" === e.type) {
        if ("tank" === t.type) dimension.bounceCircles(i, s, a, 1, .2),
        dimension.isSameTeam(i, s) || i.invincible || s.invincible || (i.inBase || i.prevInBase || i.damage(10 * dimension.tickMultiplier * s.bodyDamage * s.levelMultiplier * s.bodyDamageMultiplier, s, "tanks"), s.inBase || s.prevInBase || s.damage(10 * dimension.tickMultiplier * i.bodyDamage * i.levelMultiplier * i.bodyDamageMultiplier, i, "tanks"));
        else if ("detectEnemies" === t.type) {
          if (!dimension.isSameTeam(t.parent, i) && !(i.invincible || i.inBase || i.prevInBase) && dimension.checkAngle(t.d, t.range, i.x - t.x, i.y - t.y)) {
            t.objects.push(i);
            let o = Math.sqrt(a.distance) - a.size;
            t.distances.push(o),
            (o < t.closest || !1 === t.closest) && (t.closest = o, t.closestObject = i),
            (o < t.closestTankDistance || !1 === t.closestTank) && (t.closestTankDistance = o, t.closestTank = i)
          }
        } else if ("bullet" === t.type) {
          if (!dimension.isSameTeam(i, s.parent) && !(i.inBase || i.prevInBase)) {
            if (i.invincible) s.remove();
            else {
              i.damage(3 * dimension.tickMultiplier * s.damageMultiplier * s.barrel.data.damage * s.parent.levelMultiplier, s.parent, "tanks"),
              s.damage(10 * dimension.tickMultiplier * (i.bodyDamage >= 0 ? i.bodyDamage: 1) * i.levelMultiplier * (i.bodyDamageMultiplier >= 0 ? i.bodyDamageMultiplier: 1));
              let r = [0, 1, 2, 1, 2, 0][s.type];
              0 === r ? dimension.bounceCircles(i, s, a, .02, 0) : 1 === r ? dimension.bounceCircles(i, s, a, .5, 0) : dimension.bounceCircles(i, s, a, .02, 0)
            }
          }
        } else if ("polygon" === t.type) dimension.bounceCircles(i, s, a, 1, .2),
        i.invincible || 5 === i.team || (i.inBase || i.prevInBase || i.ignorePolygonDamage || i.damage(dimension.tickMultiplier * dimension.polygonDamage, s, "polygons"), s.damage(10 * dimension.tickMultiplier * i.bodyDamage * i.levelMultiplier * i.bodyDamageMultiplier, i, "tanks"));
        else if ("detectFriends" === t.type) {
          if (dimension.isSameTeam(t.parent, i)) {
            t.objects.push(i);
            let d = Math.sqrt(a.distance) - a.size;
            t.distances.push(d),
            (d < t.closest || !1 === t.closest) && (t.closest = d, t.closestObject = i)
          }
        } else if ("wall" !== t.type || i.clip) {
          if ("gate" === t.type) dimension.collideGate(a, i);
          else if ("wormhole" === t.type) {
            if (0 === s.type) {
              if ((i.level >= 60 || s.ruptured) && !(i.invincible && i.invincibleTime || i.static)) {
                s._objects[i.id] = i;
                let $ = s.x - i.x,
                c = s.y - i.y,
                u = $ * $ + c * c,
                p = .01 * (u > 1 ? 1 / Math.sqrt(u) : 1);
                i.xv += $ * p,
                i.yv += c * p
              } else dimension.bounceCircles(i, s, a, 1, .5)
            } else if (1 === s.type) {
              if ((i.radiant > 0 || s.ruptured) && !(i.invincible && i.invincibleTime || i.static)) {
                s._objects[i.id] = i;
                let m = s.x - i.x,
                _ = s.y - i.y,
                f = m * m + _ * _,
                g = .01 * (f > 1 ? 1 / Math.sqrt(f) : 1);
                i.xv += m * g,
                i.yv += _ * g
              } else dimension.bounceCircles(i, s, a, 1, .5)
            } else s._objects[i.id] = i
          }
        } else dimension.isSameTeam(i, s) ? t.noInvincibility || (i.inBase = !0) : (dimension.collideWall(a, i), t.object.team >= 0 && !(i.inBase || i.prevInBase || i.static || i.invincible) && i.maxHealth && (i.health -= dimension.tickMultiplier * i.maxHealth * .003, i.regenTime = 0))
      } else if ("detectEnemies" === e.type) {
        if ("polygon" === t.type) {
          if (5 !== e.parent.team && dimension.checkAngle(e.d, e.range, s.x - e.x, s.y - e.y)) {
            e.objects.push(s);
            let y = Math.sqrt(a.distance) - a.size;
            e.distances.push(y),
            (y < e.closest || !1 === e.closest) && (e.closest = y, e.closestObject = s)
          }
        } else if ("bullet" === t.type && !dimension.isSameTeam(e.parent, s.parent)) {
          e.bullets && e.objects.push(s);
          let h = Math.sqrt(a.distance) - a.size;
          e.bullets && e.distances.push(h),
          (h < e.closestBulletDistance || !1 === e.closestBullet) && (e.closestBulletDistance = h, e.closestBullet = s)
        }
      } else if ("bullet" === e.type) {
        if ("bullet" === t.type) {
          if (dimension.isSameTeam(i.parent, s.parent)) {
            let k = [0, 1, 2, 1, 2, 0][i.type];
            k === [0, 1, 2, 1, 2, 0][s.type] && (0 === k || (1 === k ? dimension.bounceCircles(i, s, a, .5, .1) : dimension.bounceCircles(i, s, a, 1, 0)))
          } else if (i.health >= 0 && s.health >= 0) {
            dimension.bounceCircles(i, s, a, .5, .1);
            let v = 2,
            b = 3 * dimension.tickMultiplier * s.barrel.data.damage * s.parent.levelMultiplier * v,
            w = 3 * dimension.tickMultiplier * i.barrel.data.damage * i.parent.levelMultiplier * v,
            x = b > i.health,
            z = w > s.health;
            x ^ z && (x && b > 0 ? w *= i.health / b: z && w > 0 && (b *= s.health / w)),
            i.damage(b),
            s.damage(w)
          }
        } else if ("polygon" === t.type) {
          let T = [0, 1, 2, 1, 2, 0][i.type];
          0 === T ? dimension.bounceCircles(i, s, a, .02, 0) : 1 === T ? dimension.bounceCircles(i, s, a, .1, 0) : dimension.bounceCircles(i, s, a, .2, .05),
          5 !== i.parent.team && (i.damage(dimension.tickMultiplier * dimension.polygonDamage), s.damage(3 * dimension.tickMultiplier * i.damageMultiplier * i.barrel.data.damage * i.parent.levelMultiplier, i.parent, "tanks"))
        } else "wall" === t.type ? dimension.isSameTeam(i.parent, s) || t.noInvincibility || (dimension.collideWall(a, i), !(t.object.team >= 0) || i.inBase || i.prevInBase || i.static || i.invincible || (i.damage(dimension.tickMultiplier * i.maxHealth * .003), i.regenTime = 0)) : "gate" === t.type ? dimension.collideGate(a, i) : "wormhole" === t.type && 2 === s.type && dimension.bounceCircles(i, s, a, 1, .5)
      } else "polygon" === e.type ? "polygon" === t.type ? dimension.bounceCircles(i, s, a, 1, .2) : "wall" === t.type ? (dimension.collideWall(a, i), t.object.team >= 0 && (i.health -= dimension.tickMultiplier * i.maxHealth * .003, i.regenTime = 0)) : "gate" === t.type ? dimension.collideGate(a, i) : "wormhole" === t.type && dimension.bounceCircles(i, s, a, 1, .5) : e.type
    },
    getRadiantName: function(e) {
      return e < 1 ? "": e < 5 ? ["Radiant", "Gleaming", "Luminous", "Lustrous"][e - 1] : `Highly Radiant($ {
        e
      })`
    },
    getPolygonName: function(e) {
      return e < 0 ? ["Tetrahedron", "Cube", "Octahedron", "Dodecahedron", "Icosahedron"][ - e - 1] : e < 3 ? "???": e < 21 ? ["Triangle", "Square", "Pentagon", "Hexagon", "Heptagon", "Octagon", "Nonagon", "Decagon", "Hendecagon", "Dodecagon", "Tridecagon", "Tetradecagon", "Pentadecagon", "Hexadecagon", "Heptadecagon", "Octadecagon", "Nonadecagon", "Icosagon", ][e - 3] : `Circle($ {
        e
      })`
    },
    getFullPolygonName: function(e) {
      let t = dimension.getPolygonName(e.sides),
      a;
      return (a = e.radiant < 1 ? 0 > "AEIOU".indexOf(t[0]) ? "a ": "an ": `a $ {
        dimension.getRadiantName(e.radiant)
      }`) + t
    },
    update: function(e, t, a) {
      if ((e.onUpdate && e.onUpdate({
        now: a
      }), e.mapSizeSpeed > 0) ? Math.abs(e.mapSize - e._mapSize) <= e.mapSizeSpeed ? (e.mapSize = e._mapSize, e.mapSizeSpeed = 0) : e.mapSize += e.mapSize > e._mapSize ? -e.mapSizeSpeed: e.mapSizeSpeed: e._mapSize = e.mapSize, e.tanks.length > 1e3) {
        for (let n = e.tanks.length - 1; n >= 0; n--) {
          let i = e.tanks[n];
          i.static || i.ws.data.isPlayer || i.remove()
        }
        if (e.tanks.length > 1e3) for (let s = e.tanks.length - 1; s >= 0; s--) {
          let o = e.tanks[s];
          o.static || o.remove()
        }
      }
      if (a - e.lastPolyhedra > 12e4 && (e.lastPolyhedra = a, .01 > Math.random() && (e.nextSpawnPolyhedra = !0)), t.gameUpdate) {
        e.lastMapSize !== e.mapSize && (e.mapSizeUpdated = e.lastMapSize = e.mapSize);
        for (let r = e.newTanks.length - 1; r >= 0; r--) {
          let d = e.newTanks[r],
          $ = d[1],
          c = 0,
          u = 0,
          p = 0;
          if (c = d[0].team >= 5 && !(dimension.noPinkTeam && 6 === d[0].team) ? d[0].team: "2teams" === e.type ? $.data.lastTeam > 0 && $.data.lastTeam < 3 ? $.data.lastTeam: 1 + Math.floor(2 * Math.random()) : "ffa" === e.type ? 0 : $.data.lastTeam > 0 && $.data.lastTeam < 5 ? $.data.lastTeam: 1 + Math.floor(4 * Math.random()), $.data.lastTeam = c, d[0].team = c, d[1].data.tank = generator.tank(d[0], d[1]), [u, p] = e.spawnPlayer(c, d[1].data.tank, d[2]), d[1].data.tank.x = u, d[1].data.tank.y = p, console.log("dim", `name: $ {
            d[0].name
          }
          score: $ {
            Math.round(d[0].score)
          }
          dim: $ {
            e.name
          }`), d[1].data.waiting = !1, $ && $.accountData) {
            let m = $.accountData;
            m.dims[e.name] = 1;
            let _ = d[1].data.tank;
            if (m.dims.ffa && m.dims["2teams"] && m.dims["4teams"] && !m.achievements[8]) {
              let f = m.achievements[8] = createAchievement(8);
              sendAchievement(_, f)
            }
            if (_.celestial && "sanctuary" === e.type) {
              if (!m.achievements[3]) {
                let g = m.achievements[3] = createAchievement(3);
                sendAchievement(_, g)
              }
              if (_.level >= 90 && !m.achievements[5]) {
                let y = m.achievements[5] = createAchievement(5);
                sendAchievement(_, y)
              }
            }
            if ("crossroads" === e.type && !m.achievements[4]) {
              let h = m.achievements[4] = createAchievement(4);
              sendAchievement(_, h)
            }
            if ("abyss" === e.type && !m.achievements[17]) {
              let k = m.achievements[17] = createAchievement(17);
              sendAchievement(_, k)
            }
          }
          d[1].sendPacket && d[1].sendPacket("gameStart", packer.gameStart({
            tank: d[1].data.tank,
            dim: d[0].dim,
            upgrades: d[1].data.tank.upgrades,
            saveCode: d[1].data.saveCode
          })),
          d[1].data.isPlayer && !d[1].data.tank.invisible && (d[0].dim.broadcast(`$ {
            d[1].data.tank.name
          }
          has spawned.`), d[1].accountName && d[1].accountData && d[1].accountData.timeAlive <= 0 && d[1].sendPacket("announcement", `Logged in to account: $ {
            d[1].accountName
          }`))
        }
        e.newTanks = []
      }
      let v = [],
      b = [];
      for (let w = e.gates.length - 1; w >= 0; w--) {
        let x = e.gates[w];
        1 === x[0] || 3 === x[0] ? (x[6] > 0 && (x[6] -= .01 * dimension.tickMultiplier, x[6] <= 0 && (x[6] = 0)), x[5] = 0 !== x[6]) : (x[5] = !1, x[6] = 0)
      }
      let z = [];
      for (let T = e.tanks.length - 1; T >= 0; T--) {
        let S = e.tanks[T];
        if (S.score >= 0 || (S.score = 0, S.update(), S.dim.updatedTanks[S.id] = S), S.xv || (S.xv = 0), S.yv || (S.yv = 0), S.x || (S.x = 0), S.y || (S.y = 0), S.d || (S.d = 0), S.ai && "function" == typeof S.ai) try {
          S.ai({
            now: a,
            options: t
          })
        } catch(P) {}
        if ((!S.regen || S.regen < 1) && (S.regen = 1), S.regenTime < 1) {
          let D = 25 - S.upgrades[6] / 1.4;
          S.regenTime += .01 * dimension.tickMultiplier / D * (S.regenTime > .75 ? 1 : 1 + .3 * (S.regen - 1)),
          S.regenTime > 1 && (S.regenTime = 1)
        } else if (S.health < S.maxHealth) {
          let j = 25 - S.upgrades[6] / 2;
          S.health += dimension.tickMultiplier * S.maxHealth * .01 / j * (1 + .3 * (S.regen - 1)),
          S.health > S.maxHealth && (S.health = S.maxHealth)
        }
        S.regen = 1,
        S.bodyDamageMultiplier = 1 + S.upgrades[5] / 17.6;
        let W = 800 * S.levelMultiplier * S.maxHealthMultiplier * (S.celestial ? 4 : 1) * (1 + S.upgrades[7] / 22.5);
        if (W != S.maxHealth && S.setMaxHealth(W), S.mousePosition[0] = S.x + S.controlPosition[0], S.mousePosition[1] = S.y + S.controlPosition[1], S.dragTarget) for (let C = S.dragTarget.length - 1; C >= 0; C--) {
          let M = S.dragTarget[C];
          M.static || (M.x = S.mousePosition[0], M.y = S.mousePosition[1])
        }
        if (S.dragWall) {
          let B = S.dragWall,
          I = S.mousePosition[0],
          H = S.mousePosition[1],
          R = 2;
          if (S.dragWallSnap && (I = 50 * Math.round(I / 50), H = 50 * Math.round(H / 50), R = .8), B[0] !== I || B[1] !== H) {
            B[0] = Math.round((B[0] * R + I) / (R + 1)),
            B[1] = Math.round((B[1] * R + H) / (R + 1));
            let N = e.walls.indexOf(B);
            N >= 0 ? e.updatedWalls[N] = B: S.dragWall = !1
          }
        }
        t.updateFinalDamage && (S.finalDamage.tanks = generator.updateFinalDamage(S.finalDamage.tanks), S.finalDamage.polygons = generator.updateFinalDamage(S.finalDamage.polygons)),
        S.x += S.xv,
        S.y += S.yv,
        S.invincibleTime && (S.invincibleTime > a ? (S.firing || S.input.movement[0] || S.input.movement[1]) && S.invincibleTime - a > 5e3 && (S.invincibleTime = a + 5e3) : (S.invincibleTime = !1, S.invincible = !1));
        let U = S.speed * dimension.tickMultiplier * .14 * (S.size > 30 ? 10 / (S.size - 20) : 1) * (1 + .1 * S.upgrades[4]) * S.movementSpeed,
        O = e.friction ? dimension.power96: 1;
        1 !== S.friction && (S.friction < 1 ? O = 1 - (1 - O) * S.friction: O /= S.friction),
        S.xv = S.xv * O + dimension.tickMultiplier * S.input.movement[0] * U,
        S.yv = S.yv * O + dimension.tickMultiplier * S.input.movement[1] * U,
        t.recordDirection && S._d.push((Math.round(S.d / Math.PI * 1e3) % 2e3 + 2e3) % 2e3);
        let A = !S.static && !S.fullFov,
        F = {
          x: S.x,
          y: S.y,
          size: S.size,
          object: S,
          type: "tank",
          noCollide: S.noHitBox
        },
        Y = {
          x: S.x,
          y: S.y,
          size: 1.5 * S.size + 200,
          object: S,
          type: "bullet",
          str: "tanks"
        };
        if (v.push(F), A) {
          b.push(Y);
          let X = {
            x: S.x,
            y: S.y,
            size: 1800 * Math.sqrt(S.size / 75) * S.weaponCameraSize * S.bodyCameraSize,
            object: S,
            type: "fov",
            fov: {
              tanks: {},
              polygons: {},
              bullets: {}
            }
          };
          b.push(X),
          z.push(X)
        } {
          let q = {
            x: S.x,
            y: S.y,
            size: 300 + S.size * S.range,
            object: S,
            type: "detectEnemies",
            parent: S,
            objects: [],
            distances: [],
            closest: !1,
            closestObject: !1,
            closestTank: !1,
            closestTankDistance: !1,
            closestBullet: !1,
            closestBulletDistance: !1,
            possible: []
          };
          S.detector = q,
          v.push(q)
        }
        let E = Math.sin(S.d),
        G = Math.cos(S.d);
        for (let L = 0, K = S._turrets.length; L < K; L++) {
          let J = S._turrets[L],
          V = {
            x: S.x + S.size * (J.x * G + J.y * E),
            y: S.y - S.size * (J.y * G - J.x * E),
            d: S.d + (J.angle >= 0 || J.angle <= 0 ? J.angle: 0),
            range: J.angleRange,
            size: 10 * S.size * J.size + 400,
            object: J,
            type: "detectEnemies",
            parent: S,
            objects: [],
            distances: [],
            closest: !1,
            closestObject: !1,
            closestTank: !1,
            closestTankDistance: !1,
            closestBullet: !1,
            closestBulletDistance: !1,
            possible: []
          };
          J.detector = V,
          J.gameX = V.x,
          J.gameY = V.y,
          v.push(V)
        }
        for (let Q = 0, Z = S.auras.length; Q < Z; Q++) {
          let ee = S.auras[Q];
          if (ee.gameSize = S.size * ee.auraSize, !1 === S.passive) {
            let et = {
              x: S.x + S.size * (ee.x * G + ee.y * E),
              y: S.y - S.size * (ee.y * G - ee.x * E),
              size: ee.gameSize,
              object: ee,
              type: "detectEnemies",
              parent: S,
              objects: [],
              distances: [],
              closest: !1,
              closestObject: !1,
              closestTank: !1,
              closestTankDistance: !1,
              closestBullet: !1,
              closestBulletDistance: !1,
              possible: []
            };
            if (2 === ee.type) et.bullets = !0;
            else if (1 === ee.type) et.type = "detectFriends";
            else if (0 !== ee.type) continue;
            et.x,
            et.y,
            et.size,
            ee.detector = et,
            ee.gameX = et.x,
            ee.gameY = et.y,
            v.push(et)
          }
        }
      }
      for (let ea = e.bullets.length - 1; ea >= 0; ea--) {
        let en = e.bullets[ea],
        ei = en.parent;
        en.x += en.xv,
        en.y += en.yv;
        let el = Math.sin(en.d),
        es = Math.cos(en.d); (1 === en.type || 2 === en.type || 3 === en.type || 4 === en.type) && e.friction && (en.xv *= dimension.power96, en.yv *= dimension.power96);
        let eo = {
          x: en.x,
          y: en.y,
          size: en.size,
          object: en,
          type: "bullet"
        },
        er = {
          x: en.x,
          y: en.y,
          size: 1.5 * en.size + 200,
          object: en,
          type: "bullet",
          str: "bullets"
        };
        if (v.push(eo), b.push(er), en.auras) for (let ed = 0, e$ = en.auras.length; ed < e$; ed++) {
          let ec = en.auras[ed];
          if (ec.gameSize = en.size * ec.auraSize, !1 === ei.passive) {
            let eu = {
              x: en.x + en.size * (ec.x * es + ec.y * el),
              y: en.y - en.size * (ec.y * es - ec.x * el),
              size: ec.gameSize,
              object: ec,
              type: "detectEnemies",
              parent: ei,
              objects: [],
              distances: [],
              closest: !1,
              closestObject: !1,
              closestTank: !1,
              closestTankDistance: !1,
              closestBullet: !1,
              closestBulletDistance: !1,
              possible: []
            };
            if (2 === ec.type) eu.bullets = !0;
            else if (1 === ec.type) eu.type = "detectFriends";
            else if (0 !== ec.type) continue;
            eu.x,
            eu.y,
            eu.size,
            ec.detector = eu,
            ec.gameX = eu.x,
            ec.gameY = eu.y,
            v.push(eu)
          }
        }
        if (en.timeExisted += .01 * dimension.tickMultiplier, (en.timeExisted > en.lifeTime && 2 !== en.type && 4 !== en.type || en.health <= 0) && en.remove(), en.turrets && en.turrets[0]) for (let ep = 0, em = en.turrets.length; ep < em; ep++) {
          let e_ = en.turrets[ep],
          ef = {
            x: en.x - en.size * (e_.x * es + e_.y * el),
            y: en.y + en.size * (e_.y * es - e_.x * el),
            size: 10 * en.size * e_.size + 400,
            object: e_,
            type: "detectEnemies",
            parent: en.parent,
            objects: [],
            distances: [],
            closest: !1,
            closestObject: !1,
            closestTank: !1,
            closestTankDistance: !1,
            closestBullet: !1,
            closestBulletDistance: !1,
            possible: []
          };
          e_.detector = ef,
          e_.gameX = ef.x,
          e_.gameY = ef.y,
          v.push(ef)
        }
      }
      for (let eg = e.polygons.length - 1; eg >= 0; eg--) {
        let ey = e.polygons[eg];
        if (ey.finalDamage.tanks = generator.updateFinalDamage(ey.finalDamage.tanks), ey.regenTime < 1) ey.regenTime += .02 * dimension.tickMultiplier / (9 + 2 * Math.abs(ey.sides)),
        ey.regenTime > 1 && (ey.regenTime = 1);
        else if (ey.health < ey.maxHealth) {
          let eh = ey.sides >= 3 ? ey.sides: 10 - ey.sides;
          ey.health += dimension.tickMultiplier * ey.maxHealth * .004 / (eh * eh * .1 - .15),
          ey.health > ey.maxHealth && (ey.health = ey.maxHealth)
        }
        ey.x += ey.xv,
        ey.y += ey.yv,
        e.friction && (ey.xv *= dimension.power97, ey.yv *= dimension.power97);
        let ek = .005 * dimension.tickMultiplier * ey.speed;
        ey.d += ek,
        ey.d >= 2 * Math.PI && (ey.d -= 2 * Math.PI),
        ek *= 8,
        ey.xv += Math.sin(ey.d) * ek,
        ey.yv -= Math.cos(ey.d) * ek;
        let ev = {
          x: ey.x,
          y: ey.y,
          size: ey.size,
          object: ey,
          type: "polygon"
        },
        eb = {
          x: ey.x,
          y: ey.y,
          size: 1.5 * ey.size + 200,
          object: ey,
          type: "bullet",
          str: "polygons"
        };
        v.push(ev),
        b.push(eb),
        ey.removeTime++,
        ey.removeTime >= 600 * dimension.tickRate && ey.health >= ey.maxHealth && ey.remove()
      }
      for (let ew = e.walls.length - 1; ew >= 0; ew--) {
        let e0 = e.walls[ew];
        if (!e0 || e0[5] && e0[5].noHitBox) continue;
        let ex = {
          x: e0[0],
          y: e0[1],
          w: e0[2],
          h: e0[3],
          type: "wall",
          rectangular: !0,
          object: {
            team: e0[4] || -1
          },
          noInvincibility: !!e0[5] && e0[5].noInvincibility
        };
        v.push(ex)
      }
      for (let e3 = e.gates.length - 1; e3 >= 0; e3--) {
        let ez = e.gates[e3],
        eT,
        eS;
        0 === ez[3] || 2 === ez[3] ? (eT = 30, eS = ez[4]) : (eT = ez[4], eS = 30);
        let eP = {
          gateType: ez[0],
          x: ez[1],
          y: ez[2],
          d: ez[3],
          noClip: !0,
          object: ez,
          w: eT,
          h: eS,
          type: "gate",
          rectangular: !0
        };
        v.push(eP)
      }
      for (let e1 in e.wormholes) {
        let e4 = e.wormholes[e1];
        if (e4.type < 2) {
          let e2 = Object.keys(e4._objects).length + 1;
          if (e4.time < 10 ? e4.time -= .01 * dimension.tickMultiplier: e4.time -= .01 * dimension.tickMultiplier * (1 + e2), e4.time < 0) {
            for (let e7 in e4._objects) e4.action(e4._objects[e7]);
            e4.remove();
            continue
          }
          e4.time < 10 && (e4.fadeTime = (10 - e4.time) / 10, e.fadeTimeChanges[e4.id] = e4)
        } else e4.time = 0;
        let eD = {
          x: e4.x,
          y: e4.y,
          object: e4,
          objects: {},
          size: e4.size,
          type: "wormhole"
        };
        e4._objects = {},
        v.push(eD)
      }
      for (let e5 = v.length - 1; e5 >= 0; e5--) {
        let ej = v[e5],
        e6 = ej.object;
        "tank" === ej.type && (e6.fov.tanks = e.tanks, e6.fov.bullets = e.bullets, e6.fov.polygons = e.polygons)
      }
      try {
        Detector.detectCollisions(v,
        function(e, t, a) {
          dimension.collide(e, t, a)
        })
      } catch(eW) {
        return dimension.antilag()
      }
      if (t.gameUpdate) {
        View.detectCollisions(b,
        function(e, t, a) {
          if ("fov" === t.type && ([e, t] = [t, e]), "fov" === e.type) {
            let n = e.fov,
            i = t.object;
            "bullet" === t.type && (n[t.str][i.id] = i)
          }
        });
        for (let eC = z.length - 1; eC >= 0; eC--) {
          let eM = z[eC],
          eB = eM.object;
          eB.fov.bullets = Object.values(eM.fov.bullets),
          eB.fov.polygons = Object.values(eM.fov.polygons)
        }
      }
      for (let eI in e.wormholes) {
        let e8 = e.wormholes[eI],
        e9 = e8._objects;
        if (e8.type < 2) {
          let eH = 0;
          for (let eR in e9) {
            let eN = e9[eR].size;
            eH += eN * eN * 2,
            !(eR in e8.objects) && (!e8.ruptured && Math.random() < .03 + .07 * e8.entries && (e8.rupture(), e.fadeTimeChanges[e8.id] = e8), e8.entries++)
          }
          e8.objects = e8._objects,
          eH !== e8.contents && (e8.contents = eH, e8.size = Math.sqrt(e8.defaultSize + eH), e.resizedWormholes[e8.id] = e8)
        } else {
          for (let eU in e9) {
            let eO = e9[eU];
            e8.action(eO),
            eU in e8.objects || !(eO.team >= 0) || (e8.color = eO.team, e8.radiant = eO.radiant || 0, e.updatedPortals[e8.id] = e8)
          }
          e8.objects = e8._objects
        }
      }
      for (let eA = e.bullets.length - 1; eA >= 0; eA--) {
        let eF = e.bullets[eA],
        eY = eF.parent;
        if (dimension.confine(eF, e.mapSize - (eF.size < 2 * dimension.clipSize ? eF.size / 2 : eF.size - dimension.clipSize), e.mapSizeSpeed > 0 ? e.mapSize > e._mapSize ? e.mapSizeSpeed: -e.mapSizeSpeed: 0), 2 === eF.type || 4 === eF.type) {
          let eX = dimension.tickMultiplier * eF.speed * .05,
          eq = 1,
          eE = [eY.x, eY.y],
          eG = !1;
          eF.target = !1,
          eY.firing || eY.droneControl ? (eE = eY.mousePosition, eG = !0, eY.droneControl && (eX = -eX)) : !1 == eY.passive && eY.detector && (eY.detector.closestObject ? (eF.target = eY.detector.closestObject, eE = [eF.target.x, eF.target.y], eG = !0) : eF.target = !1);
          let eL;
          if (eX >= 0) {
            if (eL = Math.atan2(eF.x - eE[0], eE[1] - eF.y), 4 === eF.type && eG && 2 !== eF.visualType) {
              let eK = [eF.x - eE[0], eF.y - eE[1]]; (eK = Math.sqrt(eK[0] * eK[0] + eK[1] * eK[1]) - eF.size - (eF.target ? eF.target.size: 0)) < (eY.size + .5 * eF.size) * (eY.firing ? 2.5 : .5) + eF.size && (eq = -1)
            }
          } else eL = Math.atan2(eE[0] - eF.x, eF.y - eE[1]),
          eX = -eX;
          if (eF.timeExisted < 1.5) {
            let eJ = 10 * (1 - eF.timeExisted / 1.5);
            eF.d = dimension.averageAngles(eF.d, eL, eJ)
          } else eF.d = eL;
          eX *= 1.2,
          eF.xv += -dimension.tickMultiplier * Math.sin(eF.d) * eX * eq,
          eF.yv += dimension.tickMultiplier * Math.cos(eF.d) * eX * eq
        }
        if (3 === eF.type || 4 === eF.type) {
          for (let eV = 0, eQ = eF._barrels.length; eV < eQ; eV++) {
            let eZ = eF._barrels[eV];
            if (6 === eZ.data.type || 7 === eZ.data.type || eZ.data.type >= 9) continue;
            eZ.current += .01 * dimension.tickMultiplier;
            let te = .5 * eZ.data.reload * (1 - eY.upgrades[3] / 30),
            tt;
            if (2 === eZ.data.type || 4 === eZ.data.type ? tt = !(eZ.bullets.length >= eZ.data.drones * (1 + eY.upgrades[0] / 30)) : (tt = 4 === eF.type ? eY.firing || eY.droneControl || !eY.passive && eF.target: !eY.passive, eZ.turret && !eZ.turret.active && (tt = !1)), tt) {
              if (eZ.current >= te) {
                te ? (eZ.current -= te, eZ.current >= te && (eZ.current = eZ.current % te)) : eZ.current = 0,
                (1 === eZ.data.type || 3 === eZ.data.type) && eZ.bullets.length > eZ.maxTraps && eZ.bullets[0].remove();
                let ta = (eZ.turret ? eZ.turret.d: eF.d) + eZ.data.d,
                tn = eF.x,
                ti = eF.y,
                tl = -eZ.data.x,
                ts = -eZ.data.y + 2 * eZ.data.height,
                to = Math.sin(ta),
                tr = Math.cos(ta),
                td = dimension.getBulletSpeed(eZ.data, eF.parent),
                t$ = eF.parent,
                [tc, tu] = dimension.getBulletData(eZ.data.type),
                tp = eZ.data.relativeSize * t$.size,
                tm = (eZ.data.relativeSizeS || eZ.data.relativeSize) * eZ.data.width;
                if (8 === eZ.data.type) {
                  let t_ = generator.polygon({
                    x: tn + tp * (tr * tl - to * ts),
                    y: ti + tp * (tr * ts + to * tl),
                    d: ta,
                    sides: 3,
                    dim: t$.dim,
                    radiant: 1
                  });
                  t_.xv = -to * td,
                  t_.yv = tr * td
                } else {
                  let tf = to,
                  tg = tr;
                  eZ.data.spread && (ta += (Math.random() - .5) * eZ.data.spread * Math.PI % (2 * Math.PI), tf = Math.sin(ta), tg = Math.cos(ta)),
                  generator.bullet({
                    dim: e,
                    parent: t$,
                    barrelId: eZ.id,
                    size: tm,
                    d: ta,
                    damage: 1 + t$.upgrades[2] / 22.5,
                    health: eZ.data.penetration * tu * (1 + t$.upgrades[0] / 17.6),
                    lifeTime: eZ.data.time * tc,
                    x: tn + tp * (tr * tl - to * ts),
                    y: ti + tp * (tr * ts + to * tl),
                    xv: -tf * td,
                    yv: tg * td,
                    speed: td,
                    barrel: eZ
                  })
                }
                if (eZ.data.recoil) {
                  let ty = .6 * eZ.data.recoil * tm * tm * (1 + t$.upgrades[1] / 30);
                  eF.xv += ty * to,
                  eF.yv -= ty * tr
                }
              }
            } else {
              let th = te * (1 - eZ.data.delay);
              eZ.current > th && (eZ.current = th)
            }
          }
          if (eF.auras) for (let tk = 0, tv = eF.auras.length; tk < tv; tk++) {
            let tb = eF.auras[tk],
            tw = (1 + eY.upgrades[3] / 15) * (1 + eY.upgrades[2] / 15) * (1 + eY.upgrades[0] / 15);
            if (tb.detector && !1 === eY.passive && tb.detector && tb.detector.objects) {
              if (0 === tb.type) for (let t0 = tb.detector.objects.length - 1; t0 >= 0; t0--) {
                let tx = tb.detector.objects[t0];
                if (! (tx.invincible || tx.inBase || tx.prevInBase)) {
                  let t3 = 2 * tx.size,
                  tz = tb.detector.distances[t0] + t3,
                  tT = tz < 0 ? 1 : (1 - tz / t3) * .5 + .5;
                  tx.damage(dimension.tickMultiplier * tT * tw * tb.auraDamage * 5 * eY.levelMultiplier, eY, "tanks")
                }
              } else if (1 === tb.type && tb.healing) for (let tS = tb.detector.objects.length - 1; tS >= 0; tS--) tb.detector.objects[tS].regen += (tb.healing - 1) * (1 + eY.upgrades[3] / 20) * .1 * (1 + eY.upgrades[6] / 15);
              else if (2 === tb.type && tb.auraPull) for (let tP = tb.detector.objects.length - 1; tP >= 0; tP--) {
                let t1 = tb.detector.objects[tP];
                if (! (t1.invincible || t1.inBase || t1.prevInBase)) {
                  let t4 = t1.x - tb.gameX,
                  t2 = t1.y - tb.gameY,
                  t7 = Math.sqrt(t4 * t4 + t2 * t2),
                  tD = .3 * tb.auraPull * (eF.size * eY.weight) / (t1.size * (t1.weight || 1));
                  t7 = t7 < 1 ? tD: tD / t7,
                  t1.xv -= t4 * t7,
                  t1.yv -= t2 * t7
                }
              }
            }
          }
        }
        if (eF.turrets && eF.turrets[0]) for (let t5 = 0, tj = eF.turrets.length; t5 < tj; t5++) {
          let t6 = eF.turrets[t5],
          tW = t6.detector.closestTank || t6.detector.closestObject;
          if (tW) {
            let tC = dimension.aimAtTarget({
              x: t6.gameX,
              y: t6.gameY
            },
            tW, dimension.getBulletSpeed(t6.barrels[0].data, eY));
            t6.d = eY.d + dimension.clampAngle(Math.atan2( - tC[0], tC[1]) - eY.d, t6.angle, t6.angleRange),
            t6.active = !eY.passive
          } else {
            t6.active = !1;
            let tM = eF.parent,
            tB = !0;
            if (tM.firing) {
              let tI,
              t8 = Math.atan2(t6.gameX - tM.mousePosition[0], tM.mousePosition[1] - t6.gameY) - tM.d;
              dimension.validateAngle(t8, t6.angle, t6.angleRange) && (t6.d = tM.d + t8, tB = !1)
            }
            if (tB) {
              if (t6.angle >= 0 || t6.angle <= 0) {
                let t9 = (t6.angle + tM.d) % (2 * Math.PI);
                t6.d = dimension.averageAngles(t6.d, t9, 2)
              } else t6.d += .01 * dimension.tickMultiplier,
              t6.d >= 2 * Math.PI && (t6.d -= 2 * Math.PI)
            }
          }
        }
      }
      for (let tH = e.tanks.length - 1; tH >= 0; tH--) {
        let tR = e.tanks[tH];
        dimension.confine(tR, e.mapSize - (tR.size < 2 * dimension.clipSize ? tR.size / 2 : tR.size - dimension.clipSize), e.mapSizeSpeed > 0 ? e.mapSize > e._mapSize ? e.mapSizeSpeed: -e.mapSizeSpeed: 0),
        tR.prevInBase = tR.inBase,
        tR.inBase = !1;
        let tN = !1;
        if (tR.detector && tR.detector.closestObject && (tN = tR.detector.closestObject), "peacekeeper" === tR.ai) {
          let tU = tR.detector.closestTank;
          if (tU && (tU.x >= 0 || tU.x <= 0) && (tU.y >= 0 || tU.y <= 0)) {
            tR.mousePosition = [tU.x, tU.y];
            let tO = [tU.x - tR.x, tU.y - tR.y];
            tR.controlPosition = [tO[0], tO[1]];
            let tA = Math.sqrt(tO[0] * tO[0] + tO[1] * tO[1]) || 1;
            tA < tU.size + tR.size + 100 && !tR.aiRam && (tA = -tA),
            tR.input.movement = [tO[0] / tA, tO[1] / tA],
            tR.firing = !0;
            let tF = tankData.bodies[tR.body];
            tF = tF && tF.celestial ? Math.PI: 0,
            tR.d = Math.atan2( - tO[0], tO[1]) + tF
          } else {
            let tY = -Math.sin(tR.d),
            tX = Math.cos(tR.d);
            tR.mousePosition = [0, 0],
            tR.controlPosition = [0, 0],
            tR.input.movement = [tY, tX],
            tR.firing = !1,
            t.gameUpdate && .01 > Math.random() && (tR.d = 2 * Math.random() * Math.PI)
          }
          tR.droneControl = !1,
          tR.aiRam && (tR.firing = !0)
        } else if (7 === tR.team && !tR.ws.data.isPlayer || "fallen" === tR.ai) {
          tR.passive = !1;
          let tq = tankData.bodyUpgradeMap[tR.body],
          tE = tankData.weaponUpgradeMap[tR.weapon];
          if (tE && tR.level >= tE.level) {
            let tG = tE.upgrades[Math.floor(Math.random() * tE.upgrades.length)];
            tR.removeBullets(),
            generator.setTankWeapon(tR, tG),
            tR.firedBarrels = {},
            generator.updateTank(tR),
            tR.update(),
            tR.dim.updatedTanks[tR.id] = tR
          }
          if (tq && tR.level >= tq.level) {
            let tL = tq.upgrades[Math.floor(Math.random() * tq.upgrades.length)];
            tR.removeBullets(),
            generator.setTankBody(tR, tL),
            tR.firedBarrels = {},
            generator.updateTank(tR),
            tR.update(),
            tR.dim.updatedTanks[tR.id] = tR
          }
          if (tR.upgradeCount < 120 && tR.upgradeCount < tR.level - 1) {
            tR.upgradeCount++;
            let tK = [];
            for (let tJ = 0; tJ < 8; tJ++) tR.upgrades[tJ] < 15 && tK.push(tJ);
            tR.upgrades[tK[Math.floor(Math.random() * tK.length)]]++
          }
          let tV = !1;
          if (tR.health < .5 * tR.maxHealth && tR.detector.closestTank && (tN = tR.detector.closestTank, tV = !0), !tR.aiRam && tR.health < .75 * tR.maxHealth && tR.detector.closestBulletDistance < 200 && tR.detector.closestBullet && (tN = tR.detector.closestBullet, tV = !0), tN && (tN.x >= 0 || tN.x <= 0) && (tN.y >= 0 || tN.y <= 0)) {
            tR.mousePosition = [tN.x, tN.y];
            let tQ = [tN.x - tR.x, tN.y - tR.y];
            tR.controlPosition = [tQ[0], tQ[1]];
            let tZ = Math.sqrt(tQ[0] * tQ[0] + tQ[1] * tQ[1]) || 1; (tZ < tN.size + tR.size + 100 || tV) && !tR.aiRam && (tZ = -tZ),
            tR.input.movement = [tQ[0] / tZ, tQ[1] / tZ],
            tR.firing = !0;
            let ae = tankData.bodies[tR.body];
            ae = ae && ae.celestial ? Math.PI: 0,
            tR.d = Math.atan2( - tQ[0], tQ[1]) + ae
          } else {
            let at = -Math.sin(tR.d),
            aa = Math.cos(tR.d);
            tR.mousePosition = [0, 0],
            tR.controlPosition = [0, 0],
            tR.aiRam ? (tR.input.movement = [.3 * at, .3 * aa], tR.d += .01, tR.d > 2 * Math.PI && (tR.d -= 2 * Math.PI)) : (tR.input.movement = [at, aa], tR.firing = !1, t.gameUpdate && .01 > Math.random() && (tR.d = 2 * Math.random() * Math.PI))
          }
          tR.droneControl = !1,
          tR.aiRam && (tR.firing = !0)
        }
        for (let an = 0, ai = tR._turrets.length; an < ai; an++) {
          let al = tR._turrets[an];
          al.position = "weaponTurret",
          al.active = !tR.passive;
          let as = al.detector.closestTank || al.detector.closestObject;
          if (as) {
            let ao = dimension.aimAtTarget({
              x: al.gameX,
              y: al.gameY
            },
            as, dimension.getBulletSpeed(al.barrels[0].data, tR));
            al.d = tR.d + dimension.clampAngle(Math.atan2( - ao[0], ao[1]) - tR.d, al.angle, al.angleRange)
          } else {
            al.active = !1;
            let ar = !0;
            if (tR.firing) {
              let ad,
              a$ = Math.atan2(al.gameX - tR.mousePosition[0], tR.mousePosition[1] - al.gameY) - tR.d;
              dimension.validateAngle(a$, al.angle, al.angleRange) && (al.d = tR.d + a$, ar = !1)
            }
            if (ar) {
              if (al.angle >= 0 || al.angle <= 0) {
                let ac = (al.angle + tR.d) % (2 * Math.PI);
                al.d = dimension.averageAngles(al.d, ac, 2)
              } else al.d += .01 * dimension.tickMultiplier,
              al.d >= 2 * Math.PI && (al.d -= 2 * Math.PI)
            }
          }
        }
        for (let au = 0, ap = tR.auras.length; au < ap; au++) {
          let am = tR.auras[au],
          a_ = (1 + tR.upgrades[3] / 15) * (1 + tR.upgrades[2] / 15) * (1 + tR.upgrades[0] / 15);
          if (am.detector && !1 === tR.passive && am.detector && am.detector.objects) {
            if (0 === am.type) for (let af = am.detector.objects.length - 1; af >= 0; af--) {
              let ag = am.detector.objects[af];
              if (! (ag.invincible || ag.inBase || ag.prevInBase)) {
                let ay = 2 * ag.size,
                ah = am.detector.distances[af] + ay,
                ak = ah < 0 ? 1 : (1 - ah / ay) * .5 + .5;
                ag.damage(dimension.tickMultiplier * ak * a_ * am.auraDamage * 5 * tR.levelMultiplier, tR, "tanks")
              }
            } else if (1 === am.type && am.healing) for (let av = am.detector.objects.length - 1; av >= 0; av--) am.detector.objects[av].regen += am.healing * (1 + tR.upgrades[3] / 20) * .7 * (1 + tR.upgrades[6] / 15) - 1;
            else if (2 === am.type && am.auraPull) for (let ab = am.detector.objects.length - 1; ab >= 0; ab--) {
              let aw = am.detector.objects[ab];
              if (! (aw.invincible || aw.inBase || aw.prevInBase)) {
                let a0 = aw.x - am.gameX,
                ax = aw.y - am.gameY,
                a3 = Math.sqrt(a0 * a0 + ax * ax),
                az = .3 * am.auraPull * (tR.size * tR.weight) / (aw.size * (aw.weight || 1));
                a3 = a3 < 1 ? az: az / a3,
                aw.xv -= a0 * a3,
                aw.yv -= ax * a3
              }
            }
          }
        }
        for (let aT = 0, aS = tR._barrels.length; aT < aS; aT++) {
          let aP = tR._barrels[aT];
          if (6 === aP.data.type || 7 === aP.data.type || aP.data.type >= 9 || aP.child) continue;
          aP.current += .01 * dimension.tickMultiplier;
          let a1 = .5 * aP.data.reload * (1 - tR.upgrades[3] / 30),
          a4 = tR.firing;
          if (aP.turret && (a4 = !!aP.turret.detector.closest && aP.turret.active), (2 === aP.data.type || 4 === aP.data.type) && (a4 = !(aP.bullets.length >= aP.data.drones * (1 + tR.upgrades[0] / 30)) && (!tR.passive || tR.firing)), a4) {
            if (aP.current >= a1) {
              a1 ? (aP.current -= a1, aP.current >= a1 && (aP.current = aP.current % a1)) : aP.current = 0,
              (1 === aP.data.type || 3 === aP.data.type) && aP.bullets.length > aP.maxTraps && aP.bullets[0].remove();
              let a2 = (aP.turret ? aP.turret.d: tR.d) + aP.data.d,
              a7 = aP.turret ? aP.turret.gameX: tR.x,
              aD = aP.turret ? aP.turret.gameY: tR.y,
              a5 = Math.sin(a2),
              aj = Math.cos(a2),
              a6 = -aP.data.x,
              aW = -aP.data.y + 2 * aP.data.height,
              aC = dimension.getBulletSpeed(aP.data, tR),
              [aM, aB] = dimension.getBulletData(aP.data.type),
              aI = aP.data.relativeSize * tR.size;
              tR.firedBarrels[aT] = aT;
              let a8 = (aP.data.relativeSizeS || aP.data.relativeSize) * aP.data.width;
              if (8 === aP.data.type) {
                let a9 = generator.polygon({
                  x: a7 + aI * (aj * a6 - a5 * aW),
                  y: aD + aI * (aj * aW + a5 * a6),
                  d: a2,
                  sides: aP.data.polygonSides,
                  dim: tR.dim,
                  radiant: 1 + tR.radiant
                });
                a9.xv = -a5 * aC * 5,
                a9.yv = aj * aC * 5
              } else {
                let aH = a5,
                aR = aj;
                aP.data.spread && (a2 += (Math.random() - .5) * aP.data.spread * Math.PI % (2 * Math.PI), aH = Math.sin(a2), aR = Math.cos(a2)),
                generator.bullet({
                  dim: e,
                  parent: tR,
                  barrelId: aT,
                  size: a8,
                  d: a2,
                  damage: 1 + tR.upgrades[2] / 22.5,
                  health: aP.data.penetration * aB * (1 + tR.upgrades[0] / 17.6),
                  lifeTime: aP.data.time * aM,
                  x: a7 + aI * (aj * a6 - a5 * aW),
                  y: aD + aI * (aj * aW + a5 * a6),
                  xv: -aH * aC,
                  yv: aR * aC,
                  speed: aC,
                  barrel: aP
                })
              }
              if (aP.data.recoil && !tR.static) {
                let aN = .6 * aP.data.recoil * a8 * (1 + tR.upgrades[1] / 30);
                tR.xv += aN * a5,
                tR.yv -= aN * aj
              }
            }
          } else {
            let aU = a1 * (1 - aP.data.delay);
            aP.current > aU && (aP.current = aU)
          }
        }
        if (tR.health <= 0) {
          let aO = !0,
          aA = !0,
          aF = {},
          aY = {};
          for (let aX = tR.dim.tanks.length - 1; aX >= 0; aX--) {
            let aq = tR.dim.tanks[aX];
            aF[aq.id] = aq
          }
          for (let aE = tR.dim.polygons.length - 1; aE >= 0; aE--) {
            let aG = tR.dim.polygons[aE];
            aY[aG.id] = aG
          }
          if (tR.onDeath && tR.onDeath({
            tank: tR,
            preventDefault: function() {
              aO = !1
            },
            preventRemove: function() {
              aA = !1
            },
            dimTanks: aF,
            dimPolygons: aY
          }), tR.dim.onDeath && tR.dim.onDeath({
            tank: tR,
            preventDefault: function() {
              aO = !1
            },
            preventRemove: function() {
              aA = !1
            },
            dimTanks: aF,
            dimPolygons: aY
          }), aO) {
            aA && tR.remove(),
            tR.noKillNotification || console.log("killedTank", `name: $ {
              tR.name
            }
            score: $ {
              tR.score
            }
            dim: $ {
              tR.dim.name
            }`);
            let aL = tR.score;
            tR.forceDeathScore >= 0 && (aL = tR.forceDeathScore);
            let aK = 0,
            aJ = aL * dimension.getRadiantMultiplier(tR.radiant) * .8,
            aV = {},
            aQ = {},
            aZ = [],
            ne = {},
            nt = 0;
            for (let na in tR.finalDamage.tanks) {
              let nn = aF[na];
              if (nn && !nn.static) {
                let ni = tR.finalDamage.tanks[na],
                nl = 0;
                for (let ns = 0; ns < 16; ns++) nl += ni[ns];
                aV[na] = nl,
                aZ.push(nn.name),
                ne[na] = nt,
                nt++,
                aK += nl
              }
            }
            for (let no in tR.finalDamage.polygons) {
              let nr = aY[no];
              if (nr) {
                let nd = tR.finalDamage.polygons[no],
                n$ = 0;
                for (let nc = 0; nc < 16; nc++) n$ += nd[nc];
                aQ[no] = n$,
                aZ.push(dimension.getFullPolygonName(nr)),
                aK += n$
              }
            }
            let nu = [!1, 0];
            for (let np in aV) {
              let nm = aV[np] / aK,
              n_ = aF[np],
              nf = nm * aJ;
              if (nf && (nm > nu[1] && (nu[1] = nm, nu[0] = n_), n_.score += nf, e.skinwalkers && (n_.removeBullets(), generator.setTankWeapon(n_, tR.weapon), generator.setTankBody(n_, tR.body), n_.firedBarrels = {},
              generator.updateTank(n_), n_.dim.updatedTanks[n_.id] = n_), n_.update(), n_.ws.sendPacket && !tR.noKillNotification)) {
                let ng = ne[np],
                ny = aZ.slice(0, ng).concat(aZ.slice(ng + 1)),
                nh = ny.length;
                0 === nh ? n_.ws.sendPacket("announcement", `You killed $ {
                  tR.name
                }.`) : 1 === nh ? n_.ws.sendPacket("announcement", `You and $ {
                  ny[0]
                }
                killed $ {
                  tR.name
                }.`) : n_.ws.sendPacket("announcement", `You, $ {
                  ny.slice(0, nh - 1).join(", ")
                },
                and $ {
                  ny[nh - 1]
                }
                killed $ {
                  tR.name
                }.`)
              }
            }
            if (nu[0] && nu[0].ws && nu[0].ws.accountData) {
              let nk = nu[0].ws.accountData;
              if (tR && (tR.celestial ? (nk.celestialKills++, args.parentPort.postMessage(["celestialKilled", [nu[0].ws.accountName]])) : nk.tankKills++, !nk.achievements[0])) {
                let nv = nk.achievements[0] = createAchievement(0);
                sendAchievement(nu[0], nv)
              }
            }
            for (let nb in aQ) {
              let nw = aQ[nb] / aK,
              n0 = aY[nb],
              nx = nw * aJ / (2 * (n0.radiant < 1 ? 1 : 15 * Math.pow(3, n0.radiant - 1)));
              nx && (n0.score += nx, n0.update())
            }
            if (tR.ws && tR.ws.data.isPlayer && createMessage("1210052935728369665", "`" + tR.name.replaceAll("`", "") + " died to " + aZ.join(", ") + "`"), gameEnd(tR), tR.ws.sendPacket && aA) {
              let n3 = Math.round(.2 * tR.score);
              aK <= 0 && (n3 = Math.round(.8 * tR.score)),
              tR.dim.forceRespawnScore >= 0 && (n3 = tR.dim.forceRespawnScore),
              tR.ws.data.respawnScore = n3,
              tR.ws.data.isPlayer && (tR.ws.data.uid >= 0 || args.standalone) && (args.standalone ? (console.log("death", [aZ, n3]), tR.ws.sendPacket("death", [aZ, n3])) : (tR.ws.data.ready = !1, args.parentPort.postMessage(["death", [tR.ws.data.uid, n3, [aZ, n3], tR.ws.data.lastTeam]])))
            }
          }
        }
      }
      e.polygons.length < e.maxPolygonCount && !e.noPolygons && e.maxPolygonSides >= 3 ? spawnPolygon(e) : e.polygons.length > 2 * e.maxPolygonCount && e.polygons[0] && e.polygons[0].remove();
      for (let nz = e.polygons.length - 1; nz >= 0; nz--) {
        let nT = e.polygons[nz];
        if (dimension.confine(nT, e.mapSize - (nT.size < 2 * dimension.clipSize ? nT.size / 2 : nT.size - dimension.clipSize), e.mapSizeSpeed > 0 ? e.mapSize > e._mapSize ? e.mapSizeSpeed: -e.mapSizeSpeed: 0), nT.health <= 0) {
          let nS = 0,
          nP = nT.score * dimension.getRadiantMultiplier(nT.radiant),
          n1 = nP >= 1e8 || nT.radiant > 3,
          n4 = {},
          n2 = [],
          n7 = {},
          nD = {},
          n5 = dimension.getFullPolygonName(nT);
          for (let nj = nT.dim.tanks.length - 1; nj >= 0; nj--) {
            let n6 = nT.dim.tanks[nj];
            nD[n6.id] = n6
          }
          let nW = 0;
          for (let nC in nT.finalDamage.tanks) {
            let nM = nD[nC];
            if (nM && !nM.static) {
              let nB = nT.finalDamage.tanks[nC],
              nI = 0;
              for (let n8 = 0; n8 < 16; n8++) nI += nB[n8];
              n4[nC] = nI,
              n2.push(nM.name),
              n7[nC] = nW,
              nW++,
              nS += nI
            }
          }
          let n9 = [!1, 0],
          nH = 0;
          for (let nR in n4) {
            let nN = n4[nR] / nS,
            nU = nD[nR],
            nO = nN * nP;
            if (nO) {
              if (nN > n9[1] && (n9[1] = nN, n9[0] = nU), nH++, nN < .1 && nU.ws && nU.ws.accountData) {
                let nA = nU.ws.accountData;
                if (!nA.achievements[2]) {
                  let nF = nA.achievements[2] = createAchievement(2);
                  sendAchievement(nU, nF)
                }
              }
              if (nU.score += nO, nO > 1e6 && nU.ws && nU.ws.accountData && (nU.ws.accountData.ohNode = !1, nU.ws.accountData.classic = !1), nU.update(), nU.ws.sendPacket && n1) {
                let nY = n7[nR],
                nX = n2.slice(0, nY).concat(n2.slice(nY + 1)),
                nq = nX.length;
                0 === nq ? nU.ws.sendPacket("announcement", `You killed $ {
                  n5
                }.`) : 1 === nq ? nU.ws.sendPacket("announcement", `You and $ {
                  nX[0]
                }
                killed $ {
                  n5
                }.`) : nU.ws.sendPacket("announcement", `You, $ {
                  nX.slice(0, nq - 1).join(", ")
                },
                and $ {
                  nX[nq - 1]
                }
                killed $ {
                  n5
                }.`)
              }
            }
          }
          if (n9[0] && n9[0].ws && n9[0].ws.accountData) {
            let nE = n9[0].ws.accountData;
            if (nE.polygonKills++, nT.radiant > 0) {
              if (nE.radiantPolygonKills++, !nE.achievements[6]) {
                let nG = nE.achievements[6] = createAchievement(6);
                sendAchievement(n9[0], nG)
              }
              if (nT.radiant >= 4 && !nE.achievements[18]) {
                let nL = nE.achievements[18] = createAchievement(18);
                sendAchievement(n9[0], nL)
              }
            }
            if (1 === nH && nT.sides >= 10 && !nE.achievements[1]) {
              let nK = nE.achievements[1] = createAchievement(1);
              sendAchievement(n9[0], nK)
            }
            if (nT.sides >= 13 && !nE.achievements[9]) {
              let nJ = nE.achievements[9] = createAchievement(9);
              sendAchievement(n9[0], nJ)
            }
          }
          nT.remove()
        }
      }
      if (t.gameUpdate) {
        for (let nV = e.gates.length - 1; nV >= 0; nV--) {
          let nQ = e.gates[nV];
          nQ[5] !== nQ[7] && (nQ[7] = nQ[5], e.updatedGates[nV] = [nV, nQ[5]])
        }
        let nZ = dimension.leaderboard(e),
        ie = [],
        it = {};
        for (let ia = 0; ia < 8; ia++) {
          let ii = nZ[ia],
          il;
          il = ii ? {
            place: ia,
            id: ii.id,
            type: "tank" === ii.objectType ? 1 : 0,
            score: Math.round(ii.score),
            sides: ii.sides,
            radiant: ii.radiant
          }: {
            place: ia,
            id: -ia - 1,
            type: 0,
            score: 1,
            sides: 0,
            radiant: 0
          };
          let is = e.leaderboard[ia];
          is && (is.id !== il.id || Math.round(is.score) !== il.score || is.type !== il.type || is.radiant !== il.radiant) && (it[ia] = il),
          ie.push(il)
        }
        e.leaderboard = ie;
        let io = [];
        for (let ir in it) {
          let id = it[ir];
          io.push([ir, id.id, id.type ? 0 : [id.sides, id.radiant], Math.round(id.score)])
        }
        e.leaderboardChanges = io
      }
    },
    leaderboard: function(e) {
      let t = e.tanks.concat([]).sort((e, t) = >e.displayScore === t.displayScore ? t.radiant - e.radiant: t.displayScore - e.displayScore),
      a = [],
      n = 0;
      for (let i = 0, s = t.length; i < s && !(!t[i].static && !t[i].invisible && (a.push(t[i]), ++n >= 10)); i++);
      return a
    }
  },
  generator = {
    getId: function(e, t) {
      let a = t.ids[e],
      n = a.length;
      if (0 === n) return a.push(0),
      0;
      let i = 0;
      for (; a[i] === i && i < n;) i++;
      return a.splice(i, 0, i),
      i
    },
    removeId: function(e, t, a) {
      setTimeout(function() {
        let n = a.ids[e],
        i = n.indexOf(t);
        i >= 0 && n.splice(i, 1)
      },
      5e3)
    },
    updateTank: function(e) {
      e._barrels = [];
      let t = function(a) {
        e._barrels.push(a),
        (1 === a.data.type || 3 === a.data.type) && (a.maxTraps = 12 / a.data.reload * 3);
        let n = a.data.relativeSizeS * a.data.width;
        if (a.data && (3 === a.data.type || 4 === a.data.type)) {
          let i = a.data.bulletWeapon;
          if (i) for (let s = 0, o = i.barrels.length; s < o; s++) {
            let r = i.barrels[s];
            r.relativeSize = n,
            r.relativeSizeS = n * ("size" in r && r.size || 1),
            t({
              data: r,
              child: !0
            })
          }
          let d = a.data.bulletBody;
          if (d) for (let $ = 0, c = d.turrets.length; $ < c; $++) {
            let u = d.turrets[$],
            p = u,
            m = u.barrels || [];
            for (let _ = 0, f = m.length; _ < f; _++) {
              let g = m[_];
              g.relativeSize = n * p.size,
              g.relativeSizeS = g.relativeSize * ("size" in g && g.size || 1),
              t({
                data: g,
                turret: p,
                child: !0
              })
            }
          }
        }
      };
      for (let a = 0, n = e.barrels.length; a < n; a++) t(e.barrels[a]);
      e._turrets = e.weaponTurrets.concat(e.turrets);
      for (let i = 0, s = e._turrets.length; i < s; i++) {
        let o = e._turrets[i];
        for (let r = 0, d = o.barrels.length; r < d; r++) t(o.barrels[r])
      }
      e.removeBullets()
    },
    setTankWeapon: function(e, t) {
      "node" !== t && e.ws.accountData && (e.ws.accountData.ohNode = !1);
      let a = t;
      if (t = tankData.weapons[t]) {
        e.weapon = a,
        e.weaponData = t,
        e.weaponCameraSize = t.cameraSizeMultiplier,
        e.barrels = [],
        e.weaponTurrets = [];
        for (let n = 0, i = t.barrels.length; n < i; n++) {
          let s = t.barrels[n];
          s.relativeSize = 1,
          s.relativeSizeS = "size" in s && s.size || 1,
          e.barrels.push({
            current: .5 * s.reload * (1 - e.upgrades[3] / 30) * (1 - s.delay) - .1,
            bullets: [],
            data: s
          })
        }
        for (let o = 0, r = t.weaponTurrets.length; o < r; o++) {
          let d = {...t.weaponTurrets[o]
          };
          d.gameX = e.x,
          d.gameY = e.y,
          d.detector = {},
          d.d = e.d,
          d.position = "weaponTurret";
          let $ = d.barrels;
          d.barrels = [];
          for (let c = 0, u = $.length; c < u; c++) {
            let p = $[c];
            p.relativeSize = .5 * d.size,
            p.relativeSizeS = p.relativeSize * ("size" in p && p.size || 1),
            d.barrels.push({
              current: .5 * p.reload * (1 - e.upgrades[3] / 30) * (1 - p.delay) - .1,
              bullets: [],
              data: p,
              turret: d,
              active: !1
            })
          }
          e.weaponTurrets.push(d)
        }
        generator.updateTank(e)
      }
    },
    setTankBody: function(e, t) {
      "base" !== t && e.ws.accountData && (e.ws.accountData.classic = !1);
      let a = t;
      if (t = tankData.bodies[t]) {
        e.celestial = !!t.celestial,
        e.body = a,
        e.bodyData = t,
        e.maxHealthMultiplier = t.maxHealth,
        e.movementSpeed = t.movementSpeed * (e.celestial ? 1.5 : 1),
        e.bodyDamage = t.bodyDamage,
        e.bodyCameraSize = t.cameraSizeMultiplier,
        e.turrets = [],
        e.auras = [],
        e.noHitBox = !!t.noHitBox;
        for (let n = 0, i = t.turrets.length; n < i; n++) {
          let s = {...t.turrets[n]
          };
          s.gameX = e.x,
          s.gameY = e.y,
          s.detector = {},
          s.d = e.d,
          s.position = "turret";
          let o = s.barrels;
          s.barrels = [];
          for (let r = 0, d = o.length; r < d; r++) {
            let $ = o[r];
            $.relativeSize = .5 * s.size,
            $.relativeSizeS = $.relativeSize * ("size" in $ && $.size || 1),
            s.barrels.push({
              current: .5 * $.reload * (1 - e.upgrades[3] / 30) * (1 - $.delay) - .1,
              bullets: [],
              data: $,
              turret: s,
              active: !1
            })
          }
          e.turrets.push(s)
        }
        for (let c = 0, u = t.auras.length; c < u; c++) {
          let p = {...t.auras[c]
          };
          p.gameX = e.x,
          p.gameY = e.y,
          p.detector = {},
          e.auras.push(p)
        }
        generator.updateTank(e)
      }
    },
    updateFinalDamage: function(e) {
      let t = {};
      for (let a in e) {
        let n = e[a];
        Math.max(...n) > 0 && (t[a] = n.slice(1).concat(0))
      }
      return t
    },
    log1: 1 / Math.log(1.2),
    log2: 1 / Math.log(4),
    getLevel: function(e) {
      return Math.floor(Math.round(1e6 * Math.log(e / 500 + 1) * generator.log1) / 1e6) + 1
    },
    getCelestialLevel: function(e) {
      return Math.floor(Math.round(1e6 * Math.log((e - 23477631) / 5e6 + 1) * generator.log1) / 1e6) + 75
    },
    getSides: function(e) {
      return Math.floor(Math.round(1e6 * Math.log(1 + 3 * (e - 250) / 1e3) * generator.log2) / 1e6) + 3
    },
    tank: function(e, t) {
      let a = !1;
      t || (t = {
        data: {},
        sendPacket: function() {}
      },
      a = !0);
      let n = {
        id: generator.getId("tank", e.dim),
        lastChat: 0,
        chat: function(e) {
          n.lastChat = _performance.now(),
          n.dim.chatMessages[n.id] = e
        },
        friction: e.friction >= 0 ? e.friction: 1,
        canBePushed: e.canBePushed || !e.static,
        alwaysShowOnMinimap: e.alwaysShowOnMinimap || !1,
        polygon: e.polygon || !1,
        noKillNotification: e.noKillNotification || !1,
        invisible: e.invisible || !1,
        dim: e.dim || !1,
        ignorePolygonDamage: e.ignorePolygonDamage || !1,
        weight: e.weight || 1,
        density: e.density || 1,
        speed: e.speed || 1,
        onDeath: e.onDeath ||
        function() {},
        forceDeathScore: e.forceDeathScore >= 0 ? e.forceDeathScore: -1,
        x: e.x || 0,
        y: e.y || 0,
        d: e.d || 0,
        fullFov: !1,
        _d: [],
        xv: 0,
        yv: 0,
        range: "range" in e ? e.range: 12,
        static: e.static || !1,
        clip: e.clip || !1,
        firing: !1,
        droneControl: !1,
        firedBarrels: {},
        upgrades: e.upgrades || [0, 0, 0, 0, 0, 0, 0, 0],
        maxHealthMultiplier: 1,
        upgradeCount: e.upgradeCount || 0,
        alive: !0,
        countUpgrades: function() {
          let e = 0;
          for (let t = 0; t < 8; t++) e += n.upgrades[t];
          n.upgradeCount = e
        },
        bodyDamageMultiplier: 1,
        radiant: e.radiant || 0,
        controlPosition: [0, 0],
        mousePosition: [0, 0],
        name: e.name || "",
        team: e.team || 0,
        score: e.score || 0,
        displayScore: e.score || 0,
        level: 0,
        lastSendLevel: 0,
        levelMultiplier: 1,
        health: 800,
        maxHealth: 800,
        regenTime: 1,
        size: 30,
        detector: !1,
        input: {
          movement: [0, 0]
        },
        typing: e.typing || !1,
        passive: e.passive || !1,
        invincible: !("invincible" in e) || e.invincible,
        invincibleTime: _performance.now() + 3e4,
        weapon: e.weapon || "node",
        body: e.body || "base",
        turrets: [],
        auras: [],
        bullets: {},
        ascend: function() {
          n.ws.accountData && !n.ws.accountData.ascended && (n.ws.accountData.ascended = !0, args.parentPort.postMessage(["ascention", [n.ws.accountName]])),
          n.upgrades = [0, 0, 0, 0, 0, 0, 0, 0],
          n.countUpgrades(),
          n.weapon = "nova",
          n.body = "celestial",
          7 !== n.team && (n.team = 6),
          n.dim.updatedTanks[n.id] = n,
          n.update(),
          n.removeBullets(),
          generator.setTankWeapon(n, n.weapon),
          generator.setTankBody(n, n.body),
          n.firedBarrels = {},
          generator.updateTank(n),
          t.data.tank.dim.updatedTanks[t.data.tank.id] = t.data.tank
        },
        fov: {
          tanks: [],
          polygons: [],
          bullets: []
        },
        finalDamage: {
          tanks: {},
          polygons: {}
        },
        removeBullets: function() {
          for (let e in n.bullets) n.bullets[e].remove()
        },
        setMaxHealth: function(e) {
          n.health = n.health / n.maxHealth * e,
          n.maxHealth = e
        },
        damage: function(e, t, a) {
          if (e > 0) {
            n.ws.accountData && (n.ws.accountData.pristine = !1),
            n.health -= e,
            n.health < 0 && (n.health = 0),
            n.regenTime = 0;
            let i = n.finalDamage[a];
            i && (i[t.id] ? i[t.id][15] += e: i[t.id] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, e])
          }
        },
        remove: function(e) {
          n.alive = !1,
          n.removeBullets();
          let a = n.dim.tanks.indexOf(n);
          a >= 0 && n.dim.tanks.splice(a, 1),
          generator.removeId("tank", n.id, n.dim),
          t && t.data && t.data.tank === n && (t.data.tank = !1),
          n.dim.autoScale && (n.dim.mapSize, n.dim.autoScale())
        },
        update: function() {
          let e = tankData.bodies[n.body],
          t = 1;
          if (e && e.celestial && (n.celestial = !0), e && e.size && (t = e.size), n.ws.accountData) {
            let a = n.ws.accountData;
            if (n.score >= 1e9 && !a.achievements[16]) {
              let i = a.achievements[16] = createAchievement(16);
              sendAchievement(n, i)
            }
          }
          if (n.celestial) n.score < 23477631 && (n.score = 23477631),
          n.level = generator.getCelestialLevel(n.score);
          else {
            n.level = generator.getLevel(n.score);
            let s = n.ws.accountData;
            if (n.level >= 75 && s && !s.achievements[11]) {
              let o = s.achievements[11] = createAchievement(11);
              sendAchievement(n, o)
            }
            if (n.level >= 45 && s && n.ws) {
              if (s.ohNode && (s.ohNode = !1, !s.achievements[13])) {
                let r = s.achievements[13] = createAchievement(13);
                sendAchievement(n, r)
              }
              if (s.classic && (s.classic = !1, !s.achievements[10])) {
                let d = s.achievements[10] = createAchievement(10);
                sendAchievement(n, d)
              }
              if (n.level >= 60 && s.pristine && (s.pristine = !1, !s.achievements[24])) {
                let $ = s.achievements[24] = createAchievement(24);
                sendAchievement(n, $)
              }
            }
          }
          if (n.displayScore = n.score * dimension.getRadiantMultiplier(n.radiant), n.levelMultiplier = Math.pow(1.01, n.level - (n.celestial ? 15 : 1)), n.size = 30 * n.levelMultiplier * (n.celestial ? 1.5 : 1) * t, n.size > 1e3 && (n.size = 1e3), n.barrels) for (let c = n.barrels.length - 1; c >= 0; c--) {
            let u = n.barrels[c].bullets;
            for (let p = u.length - 1; p >= 0; p--) u[p].size = n.size * u[p].rawSize
          }
          7 !== n.team || n.ws.data.isPlayer || (n.name = `Fallen $ {
            n.weapon && n.weapon[0] ? n.weapon[0].toUpperCase() + n.weapon.slice(1) : "???"
          } - $ {
            n.body && n.body[0] ? n.body[0].toUpperCase() + n.body.slice(1) : "???"
          }`)
        },
        ws: t,
        setWs: function(e) {
          n.ws = t = e
        },
        objectType: "tank",
        aiInput: e.ai
      };
      if (a && (t.data.tank = n), "fallen" === e.ai) n.ai = "fallen",
      n.aiRam = !!e.aiRam;
      else if ("defender" === e.ai) {
        n.range = 5;
        let i = 2 * Math.random() * Math.PI,
        s = 0;
        n.ai = function(e) {
          n.d = dimension.averageAngles(n.d, i, 100),
          s < e.now && (s = e.now + 1e4 + 1e4 * Math.random(), i = 2 * Math.random() * Math.PI)
        }
      } else "peacekeeper" === n.ai ? n.ai = "peacekeeper": e.ai && (n.ai = e.ai);
      return n.update(),
      generator.setTankWeapon(n, n.weapon),
      generator.setTankBody(n, n.body),
      n.dim && (n.dim.updatedTanks[n.id] = n, n.dim.add("tanks", n)),
      n.dim.autoScale && (n.dim.mapSize, n.dim.autoScale()),
      n
    },
    bullet: function(e) {
      let t = e.parent._barrels[e.barrelId],
      a = e.barrel || t,
      n = {
        id: generator.getId("bullet", e.dim),
        type: t.data.type,
        visualType: t.data.visualType || t.data.type,
        parent: e.parent,
        parentId: e.parent.id,
        barrelId: e.barrelId,
        barrel: t,
        barrels: [],
        dim: e.dim || !1,
        damageMultiplier: e.damage || 1,
        timeExisted: 0,
        target: !1,
        lifeTime: e.lifeTime || 1,
        health: e.health || 125,
        maxHealth: e.health || 125,
        damage: function(e) {
          e > 0 && (n.health -= e, n.health < 0 && (n.health = 0))
        },
        d: e.d || 0,
        x: e.x || 0,
        y: e.y || 0,
        xv: dimension.tickMultiplier * (e.xv || 0),
        yv: dimension.tickMultiplier * (e.yv || 0),
        speed: e.speed || 0,
        size: e.size * e.parent.size,
        rawSize: e.size,
        remove: function() {
          if (n === e.parent.bullets[n.id] && delete e.parent.bullets[n.id], n.barrels) for (let t = n.barrels.length - 1; t >= 0; t--) {
            let i = n.barrels[t].bullets;
            for (let s = i.length - 1; s >= 0; s--) i[s].remove()
          }
          let o = n.dim.bullets.indexOf(n);
          o >= 0 && n.dim.bullets.splice(o, 1),
          generator.removeId("bullet", n.id, n.dim),
          (o = a.bullets.indexOf(n)) >= 0 && a.bullets.splice(o, 1)
        }
      };
      if (3 === t.data.type || 4 === t.data.type) {
        let i = t.data.bulletWeapon;
        if (i) {
          n.barrels = [];
          for (let s = 0, o = i.barrels.length; s < o; s++) {
            let r = i.barrels[s],
            d = -1;
            for (d = e.parent._barrels.length - 1; d >= 0 && e.parent._barrels[d].data !== r; d--);
            n.barrels.push({
              current: .5 * r.reload * (1 - n.parent.upgrades[3] / 30) * (1 - r.delay) - .1,
              bullets: [],
              data: r,
              id: d
            })
          }
        }
        n._barrels = n.barrels.slice(0);
        let $ = t.data.bulletBody;
        if ($) {
          n.bodyData = $,
          n.speed *= $.movementSpeed,
          n.health *= $.maxHealth,
          n.damageMultiplier *= $.bodyDamage,
          n.bodyCameraSize = $.cameraSizeMultiplier,
          n.turrets = [],
          n.auras = [];
          for (let c = 0, u = $.turrets.length; c < u; c++) {
            let p = {...$.turrets[c]
            };
            p.gameX = n.x,
            p.gameY = n.y,
            p.detector = {},
            p.d = n.d,
            p.position = "turret";
            let m = p.barrels || [];
            p.barrels = [];
            for (let _ = 0, f = m.length; _ < f; _++) {
              let g = m[_];
              g.relativeSize = .25 * p.size,
              g.relativeSizeS = g.relativeSize * ("size" in g && g.size || 1);
              let y = -1;
              for (y = e.parent._barrels.length - 1; y >= 0 && e.parent._barrels[y].data !== g; y--);
              let h = {
                current: .5 * g.reload * (1 - n.parent.upgrades[3] / 30) * (1 - g.delay) - .1,
                bullets: [],
                data: g,
                turret: p,
                active: !1,
                id: y
              };
              p.barrels.push(h),
              n._barrels.push(h)
            }
            n.turrets.push(p)
          }
          for (let k = 0, v = $.auras.length; k < v; k++) {
            let b = {...$.auras[k]
            };
            b.gameX = n.x,
            b.gameY = n.y,
            b.detector = {},
            n.auras.push(b)
          }
        }
      }
      return a.bullets.push(n),
      e.parent.bullets[n.id] = n,
      n.dim && n.dim.add("bullets", n),
      n
    },
    polygon: function(e) { ! e.dim.sandbox && (e.sides < 0 ? createMessage("1187917859742027786", `\` [$ {
        new Date().toTimeString().split(" ")[0]
      }] Spawned $ {
        dimension.getFullPolygonName(e)
      } in $ {
        e.dim.name
      } ! \``) : e.radiant > 4 && createMessage("1187917859742027786", `\` [$ {
        new Date().toTimeString().split(" ")[0]
      }] Spawned $ {
        dimension.getFullPolygonName(e)
      } in $ {
        e.dim.name
      } ! \``)),
      e.sides = Math.floor(e.sides);
      let t = {
        id: generator.getId("polygon", e.dim),
        dim: e.dim || !1,
        x: e.x || 0,
        y: e.y || 0,
        d: e.d || 0,
        xv: 0,
        yv: 0,
        alive: !0,
        radiant: e.radiant || 0,
        sides: e.sides || 3,
        score: 0,
        health: 0,
        maxHealth: 0,
        regenTime: 1,
        removeTime: 0,
        size: 0,
        finalDamage: {
          tanks: {}
        },
        damage: function(e, a, n) {
          if (e > 0) {
            t.removeTime = 0,
            t.health -= e,
            t.health < 0 && (t.health = 0),
            t.regenTime = 0;
            let i = t.finalDamage[n];
            i && (i[a.id] ? i[a.id][15] += e: i[a.id] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, e])
          }
        },
        remove: function() {
          t.alive = !1;
          let e = t.dim.polygons.indexOf(t);
          e >= 0 && t.dim.polygons.splice(e, 1),
          generator.removeId("polygon", t.id, t.dim)
        },
        update: function() {
          if (t.sides < 0) return;
          t.score < 150 && (t.score = 250),
          t.displayScore = t.score * dimension.getRadiantMultiplier(t.radiant);
          let e = generator.getSides(t.score),
          a = Math.floor(t.dim.maxPolygonSides);
          if (a < 3 && (a = 3), e > a && (e = a), e !== t.sides) {
            t.sides = e,
            t.size = generator.getPolygonSize(t.sides);
            let n = generator.getPolygonHealth(t.sides);
            t.speed = dimension.tickMultiplier * generator.getPolygonSpeed(t.sides),
            t.health *= n / t.maxHealth,
            t.maxHealth = n
          }
        }
      };
      return t.sides < 0 ? t.score = 1e9 * Math.pow(3, -t.sides - 1) : t.score = 250 + 1e3 * (Math.pow(4, t.sides - 3) - 1) / 3,
      t.displayScore = t.score * dimension.getRadiantMultiplier(t.radiant),
      t.size = generator.getPolygonSize(t.sides),
      t.speed = dimension.tickMultiplier * generator.getPolygonSpeed(t.sides),
      t.health = t.maxHealth = generator.getPolygonHealth(t.sides),
      t.dim && t.dim.add("polygons", t),
      t
    },
    getPolygonSize: function(e) {
      return e >= 3 ? 20 * Math.pow(1.5, e - 3) : 50 * Math.pow(1.4, -e - 1)
    },
    getPolygonSpeed: function(e) {
      return e >= 3 ? Math.pow(.6, e - 3) : .5 * Math.pow(.4, -e - 1)
    },
    getPolygonHealth: function(e) {
      return e >= 3 ? 35 * Math.pow(3.6, e - 3) : 5e4 * Math.pow(2, -e - 1)
    },
    wormhole: function(e) {
      let t = e.size || 75,
      a = {
        id: generator.getId("wormhole", e.dim),
        dim: e.dim || !1,
        type: e.type || 0,
        color: e.color >= 0 ? e.color: 8,
        radiant: e.radiant >= 0 || e.radiant <= 0 ? e.radiant: 0 === e.type ? 0 : 1,
        x: e.x || 0,
        y: e.y || 0,
        objects: {},
        _objects: {},
        time: e.time || 30,
        fadeTime: 0,
        action: e.action ||
        function() {},
        onRupture: e.onRupture,
        ruptured: e.ruptured || !1,
        entries: 0,
        contents: 0,
        size: t,
        defaultSize: t * t,
        remove: function() {
          a.dim.wormholes[a.id] === a && delete a.dim.wormholes[a.id],
          a.dim.removedWormholes[a.id] = a,
          generator.removeId("wormhole", a.id, a.dim)
        },
        rupture: function() { ! a.ruptured && (a.ruptured = !0, a.time = 30 + 20 * Math.random(), a.dim.rupturedWormholes[a.id] = a, a.onRupture && a.onRupture(a))
        }
      };
      return a.dim && (a.dim.wormholes[a.id] = a, a.dim.addedWormholes[a.id] = a),
      a
    }
  },
  packer = {
    gameStart: function(e) {
      let t = e.dim,
      a = [];
      for (let n = t.tanks.length - 1; n >= 0; n--) {
        let i = t.tanks[n];
        a.push([i.id, i.name, i.team, i.radiant, i.weapon, i.body, !!i.ws && !!i.ws.accountData && !!i.ws.accountData.accountNameParsed])
      }
      let s = dimension.leaderboard(t),
      o = [];
      for (let r = 0; r < 8; r++) {
        let d = s[r];
        d ? o.push([d.id, "tank" === d.objectType ? 0 : [d.sides, d.radiant], Math.round(d.score)]) : o.push([ - r - 1, [0, 0], 1])
      }
      let $ = [];
      for (let c = 0, u = t.gates.length; c < u; c++) $.push(t.gates[c].slice(0, 6));
      let p = [];
      for (let m in t.wormholes) {
        let _ = t.wormholes[m];
        p.push([_.id, _.x, _.y, _.type, _.size, _.ruptured || !1, Math.round(100 * _.fadeTime), _.color, _.radiant])
      }
      let f = [];
      for (let g = 0, y = t.walls.length; g < y; g++) {
        let h = t.walls[g];
        h ? f.push(h) : f.push(!1)
      }
      let k = [];
      for (let v = 0, b = t.ambientParticles.length; v < b; v++) {
        let w = t.ambientParticles[v];
        k.push([w.amount, w.radiant, w.size[0], w.size[1], w.color.r, w.color.g, w.color.b, w.d, w.range, w.speed, w.fade, w.t, w.opacity])
      }
      return [a, t.mapSize, o, f, $, p, e.upgrades, Math.round(t.darkness), [t.background.r, t.background.g, t.background.b, t.grid.r, t.grid.g, t.grid.b, t.gridSize], e.saveCode, !!t.fillWalls, k]
    },
    gameUpdate: function(e) {
      let t = [e.id, e.score];
      if (Object.keys(e.tanks)[0] >= 0) {
        let a = [0];
        for (let n in e.tanks) {
          let i = e.tanks[n],
          s = (Math.round(i.d / Math.PI * 1e3) % 2e3 + 2e3) % 2e3,
          o = [],
          r = i._d.length;
          if (r <= 1) o = s;
          else {
            let d = !0;
            for (let $ = 0; $ < 5; $++) $ < r ? (o.push(i._d[$]), d && $ > 0 && i._d[$] !== o[$ - 1] && (d = !1)) : o.push(s);
            d && (o = s)
          }
          let c = [];
          for (let u = 0, p = i._turrets.length; u < p; u++) {
            let m = i._turrets[u];
            c.push((Math.round(m.d / Math.PI * 50) % 100 + 100) % 100)
          }
          let _ = [i.id, Math.round(i.x), Math.round(i.y), o, c, Math.floor((1 - i.health / i.maxHealth) * 100), (i.typing ? 1 : 0) + (i.passive ? 2 : 0) + (i.invincible ? 4 : 0) + (i.invisible ? 8 : 0) + (i.alwaysShowOnMinimap ? 16 : 0), i.level],
          f = Object.values(i.firedBarrels);
          f[0] >= 0 && _.push(f),
          a.push(_)
        }
        t.push(a)
      }
      if (Object.keys(e.dim.updatedTanks)[0] >= 0) {
        let g = [1];
        for (let y in e.dim.updatedTanks) {
          let h = e.dim.updatedTanks[y],
          k = [h.id, h.name, h.team, h.radiant, h.weapon, h.body, !!h.ws && !!h.ws.accountData && !!h.ws.accountData.accountNameParsed];
          g.push(k)
        }
        t.push(g)
      }
      if (Object.keys(e.dim.chatMessages)[0] >= 0) {
        let v = [2];
        for (let b in e.dim.chatMessages) v.push([b, e.dim.chatMessages[b]]);
        t.push(v)
      }
      if (Object.keys(e.bullets)[0] >= 0) {
        let w = [3],
        x = {},
        z = {};
        for (let T in e.bullets) {
          let S = e.bullets[T],
          P = S.parentId,
          D = S.barrelId;
          P in x || (x[P] = {},
          z[P] = P);
          let j = x[P],
          W = [S.id, Math.round(S.x), Math.round(S.y), (Math.round(S.d / Math.PI * 100) % 200 + 200) % 200];
          if (S.turrets && S.turrets[0]) {
            let C = [];
            for (let M in S.turrets) {
              let B = S.turrets[M];
              C.push((Math.round(B.d / Math.PI * 100) % 200 + 200) % 200)
            }
            W.push(C)
          }
          D in j ? j[D].push(W) : j[D] = [D, W]
        }
        for (let I in x) {
          let H = x[I],
          R = [z[I]];
          for (let N in H) R.push(H[N]);
          w.push(R)
        }
        t.push(w)
      }
      if (Object.keys(e.polygons)[0] >= 0) {
        let U = [4],
        O = {},
        A = {},
        F = {};
        for (let Y in e.polygons) {
          let X = e.polygons[Y],
          q = O[X.radiant];
          if (q || (q = O[X.radiant] = {},
          A[X.radiant] = X.radiant), q[X.sides]) q[X.sides][X.id] = X;
          else {
            let E = {};
            E[X.id] = X,
            q[X.sides] = E,
            F[X.sides] = X.sides
          }
        }
        for (let G in O) {
          let L = O[G = A[G]],
          K = [G];
          for (let J in L) {
            let V = L[J],
            Q = [F[J]];
            for (let Z in V) {
              let ee = V[Z];
              Q.push([ee.id, Math.round(ee.x), Math.round(ee.y), (Math.round(ee.d / Math.PI * 500) % 1e3 + 1e3) % 1e3, Math.floor((1 - ee.health / ee.maxHealth) * 500), ])
            }
            K.push(Q)
          }
          U.push(K)
        }
        t.push(U)
      }
      if (Object.keys(e.dim.leaderboardChanges)[0] >= 0) {
        let et = [5].concat(e.dim.leaderboardChanges);
        t.push(et)
      }
      if (Object.keys(e.dim.updatedGates)[0] >= 0) {
        let ea = [6];
        for (let en in e.dim.updatedGates) {
          let ei = e.dim.updatedGates[en];
          ea.push(ei)
        }
        t.push(ea)
      }
      if (Object.keys(e.dim.resizedWormholes)[0] >= 0) {
        let el = [7];
        for (let es in e.dim.resizedWormholes) {
          let eo = e.dim.resizedWormholes[es];
          el.push([eo.id, Math.round(eo.size)])
        }
        t.push(el)
      }
      if (Object.keys(e.dim.rupturedWormholes)[0] >= 0) {
        let er = [8];
        for (let ed in e.dim.rupturedWormholes) {
          let e$ = e.dim.rupturedWormholes[ed];
          er.push(e$.id)
        }
        t.push(er)
      }
      if (Object.keys(e.dim.fadeTimeChanges)[0] >= 0) {
        let ec = [9];
        for (let eu in e.dim.fadeTimeChanges) {
          let ep = e.dim.fadeTimeChanges[eu];
          ec.push([ep.id, Math.round(100 * ep.fadeTime)])
        }
        t.push(ec)
      }
      if (Object.keys(e.dim.removedWormholes)[0] >= 0) {
        let em = [10];
        for (let e_ in e.dim.removedWormholes) {
          let ef = e.dim.removedWormholes[e_];
          em.push(ef.id)
        }
        t.push(em)
      }
      if (Object.keys(e.dim.addedWormholes)[0] >= 0) {
        let eg = [11];
        for (let ey in e.dim.addedWormholes) {
          let eh = e.dim.addedWormholes[ey];
          eg.push([eh.id, eh.x, eh.y, eh.type, eh.size, eh.ruptured || !1, Math.round(100 * eh.fadeTime), eh.color, eh.radiant])
        }
        t.push(eg)
      }
      if (e.dim.darknessUpdated && t.push([12, e.dim.darkness]), Object.keys(e.dim.updatedPortals)[0] >= 0) {
        let ek = [13];
        for (let ev in e.dim.updatedPortals) {
          let eb = e.dim.updatedPortals[ev];
          ek.push([eb.id, eb.color, eb.radiant])
        }
        t.push(ek)
      }
      if (Object.keys(e.dim.updatedWalls)[0] >= 0) {
        let ew = [14];
        for (let e0 in e.dim.updatedWalls) {
          let ex = e.dim.updatedWalls[e0];
          ex && ew.push([parseInt(e0), ex[4] || !1, ex[0], ex[1], ex[2], ex[3]])
        }
        t.push(ew)
      }
      if (e.dim.mapSizeUpdated && t.push([15, e.dim.mapSizeUpdated]), Object.keys(e.dim.removedWalls)[0] >= 0) {
        let e3 = [16];
        for (let ez in e.dim.removedWalls) {
          let eT = e.dim.removedWalls[ez];
          e3.push(eT)
        }
        t.push(e3)
      }
      return t
    }
  },
  commands = {
    getTargets: function(e, t) {
      if (!e) return;
      let a = [],
      n = t.dim.tanks;
      switch (e) {
      case "all":
        return t.dim.tanks.concat(t.dim.polygons).concat(t.dim.bullets);
      case "bullets":
        return t.dim.bullets.slice();
      case "tanks":
        let i = [];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o.polygon || i.push(o)
        }
        return i;
      case "polygons":
        return t.dim.polygons.slice();
      case "me":
        return [t];
      case "fallens":
        for (let r = n.length - 1; r >= 0; r--) {
          let d = n[r];
          7 !== d.team || d.ws.data.isPlayer || a.push(d)
        }
        return a;
      case "pinks":
      case "celes":
      case "celestials":
        for (let $ = n.length - 1; $ >= 0; $--) {
          let c = n[$];
          6 === c.team && a.push(c)
        }
        return a;
      case "blues":
        for (let u = n.length - 1; u >= 0; u--) {
          let p = n[u];
          1 === p.team && a.push(p)
        }
        return a;
      case "reds":
        for (let m = n.length - 1; m >= 0; m--) {
          let _ = n[m];
          2 === _.team && a.push(_)
        }
        return a;
      case "greens":
        for (let f = n.length - 1; f >= 0; f--) {
          let g = n[f];
          3 === g.team && a.push(g)
        }
        return a;
      case "purples":
        for (let y = n.length - 1; y >= 0; y--) {
          let h = n[y];
          4 === h.team && a.push(h)
        }
        return a;
      case "yellows":
        for (let k = n.length - 1; k >= 0; k--) {
          let v = n[k];
          8 === v.team && a.push(v)
        }
        return a;
      case "others":
        for (let b = n.length - 1; b >= 0; b--) {
          let w = n[b];
          w !== t && a.push(w)
        }
        return a;
      case "polyps":
        for (let x = n.length - 1; x >= 0; x--) {
          let z = n[x];
          5 === z.team && a.push(z)
        }
        return a;
      default:
        let T = e[0],
        S = parseInt(e.slice(1));
        if (S >= 0) {
          if ("t" === T) {
            let P = t.dim.tanks;
            for (let D = P.length - 1; D >= 0; D--) {
              let j = P[D];
              if (j.id === S) return [j]
            }
          }
          if ("p" === T) {
            let W = t.dim.polygons;
            for (let C = W.length - 1; C >= 0; C--) {
              let M = W[C];
              if (M.id === S) return [M]
            }
          }
        }
      }
    },
    parse: function(e, t, a) {
      let n = [];
      for (let i = 0, s = e.length; i < s; i++) {
        let o = e[i];
        if ("position" === o) {
          let r = t.splice(0, 1)[0],
          d = commands.getTargets(r, a);
          if (d && 1 === d.length) n.push([d[0].x, d[0].y]);
          else {
            r = parseFloat(r);
            let $ = parseFloat(t.splice(0, 1)[0]);
            if (! (r >= 0) && !(r <= 0) || !($ >= 0) && !($ <= 0)) return {
              ok: !1,
              error: `Failed to parse position '${r} ${$}'`
            };
            n.push([r, $])
          }
        } else if ("targets" === o) {
          let c = t.splice(0, 1)[0],
          u = commands.getTargets(c, a);
          if (!u || !(u.length > 0)) return {
            ok: !1,
            error: `Cannot find targets with selector '${c}'`
          };
          n.push(u)
        } else if ("int" === o) {
          let p = t.splice(0, 1)[0],
          m = parseInt(p);
          if (! (m >= 0) && !(m <= 0)) return {
            ok: !1,
            error: `Cannot parse int '${p}'`
          };
          n.push(m)
        } else if ("float" === o) {
          let _ = t.splice(0, 1)[0],
          f = parseFloat(_);
          if (! (f >= 0) && !(f <= 0)) return {
            ok: !1,
            error: `Cannot parse float '${_}'`
          };
          n.push(f)
        } else if ("string" === o) n.push(t.splice(0, 1)[0]);
        else if ("*" === o) {
          n.push(t.join(" ")),
          t = [];
          break
        }
      }
      return t.length > 0 ? {
        ok: !1,
        error: `Too many arguments ! '${t.join(" ")}'`
      }: n
    },
    rules: {
      name: [[["targets", "*"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          "tank" === o.objectType && (o.name = i, o.dim.updatedTanks[o.id] = o)
        }
      }], [["*"],
      function(e, t, a) {
        t.name = e[0],
        t.dim.updatedTanks[t.id] = t
      }], ],
      radiant: [[["int"],
      function(e, t, a) {
        t.radiant = e[0],
        t.dim.updatedTanks[t.id] = t,
        t.update()
      }], [["targets", "int"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          "radiant" in o && (o.radiant = i, "tank" === o.objectType && (o.dim.updatedTanks[o.id] = o), o.update && o.update())
        }
      }], ],
      missile: [[["targets", "position"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o.static || createAbyssling({
            dim: o.dim,
            tank: o,
            x: i[0],
            y: i[1]
          })
        }
      }]],
      fallen: [[["targets"],
      function(e, t, a) {
        let n = e[0];
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          "tank" !== s.objectType || s.static || ((s.invisible || s.noHitBox) && s.remove(), s.team = 7, s.invincible = !1, s.invincibleTime = 0, s.ws.sendPacket && s.ws.data.isPlayer && (s.ws.data.uid >= 0 || args.standalone) && (args.standalone ? s.ws.sendPacket("death", [["/fallen"], 0]) : (t.ws.data.ready = !1, args.parentPort.postMessage(["death", [s.ws.data.uid, 0, [["/fallen"], 0], s.ws.data.lastTeam]]))), s.ws && (s.ws.data.tank = !1, s.ws.data.respawnScore = 0, s.ws = {
            data: {
              isPlayer: !1
            },
            sendPacket: function() {}
          }), s.dim.updatedTanks[s.id] = s)
        }
      }]],
      bot: [[["position", "*"],
      function(e, t) {
        let a = e[0];
        generator.tank({
          dim: t.dim,
          x: a[0],
          y: a[1],
          name: e[1],
          weapon: "node",
          body: "base",
          score: 0,
          radiant: 0,
          team: 8
        })
      }]],
      fallenbot: [[["position", "*"],
      function(e, t) {
        let a = e[0];
        generator.tank({
          dim: t.dim,
          x: a[0],
          y: a[1],
          name: e[1],
          weapon: "node",
          body: "base",
          score: 0,
          radiant: 0,
          team: 7
        })
      }]],
      drag: [[[],
      function(e, t, a) {
        t.dragTarget = !1
      }], [["targets"],
      function(e, t, a) {
        let n = e[0];
        t.dragTarget = n
      }]],
      dragwall: [[[],
      function(e, t, a) {
        t.dragWall = !1
      }], [["string"],
      function(e, t, a) {
        let n = t.dim;
        if ("w" === e[0][0]) {
          let i = parseInt(e[0].slice(1)),
          s = n.walls[i];
          s && i >= n.defaultWalls && (t.dragWall = s)
        } else "snap" === e[0] ? t.dragWallSnap = !0 : (e[0] = "nosnap", delete t.dragWallSnap)
      }]],
      wallsize: [[["int", "int"],
      function(e, t, a) {
        let n = t.dim.walls.indexOf(t.dragWall);
        t.dragWall && n >= 0 && (t.dragWall[2] = e[0] > 10 ? e[0] : 10, t.dragWall[3] = e[1] > 10 ? e[1] : 10, t.dim.updatedWalls[n] = t.dragWall)
      }]],
      wallteam: [[["int"],
      function(e, t, a) {
        let n = t.dim.walls.indexOf(t.dragWall);
        t.dragWall && n >= 0 && (t.dragWall[4] = e[0] >= 0 ? e[0] : 0, t.dim.updatedWalls[n] = t.dragWall)
      }]],
      createwall: [[[],
      function(e, t, a) {
        let n = [t.mousePosition[0], t.mousePosition[1], 100, 100],
        i = t.dim,
        s = 0;
        for (s = i.defaultWalls, l = i.walls.length; s < l && i.walls[s]; s++);
        t.dragWall = n,
        i.walls[s] = n,
        i.updatedWalls[s] = n
      }], ],
      savewalls: [[["string"],
      function(e, t, a) {
        let n = dimension.saveWalls(t.dim, e[0]);
        a.sendPacket("announcement", n)
      }]],
      downloadwalls: [[["string"],
      function(e, t, a) {
        let n = t.dim.walls.slice(t.dim.defaultWalls);
        n.length > 0 && (a.sendPacket("eval", `navigator.clipboard.writeText($ {
          JSON.stringify(JSON.stringify(n))
        })`), a.sendPacket("announcement", "Copied to clipboard"))
      }]],
      loadwalls: [[["string"],
      function(e, t, a) {
        let n = dimension.loadWalls(t.dim, e[0]);
        a.sendPacket("announcement", n)
      }]],
      uploadwalls: [[["*"],
      function(e, t, a) {
        try {
          let n = JSON.parse(e[0]);
          if (n && n.length > 0) {
            let i = dimension.loadWalls(t.dim, n, !0);
            a.sendPacket("announcement", i)
          } else a.sendPacket("announcement", "Failed: ")
        } catch(s) {
          a.sendPacket("announcement", "Failed: " + s)
        }
      }]],
      removewall: [[["string"],
      function(e, t, a) {
        let n = t.dim;
        if ("walls" === e[0]) {
          let i = n.walls.length;
          if (i > n.defaultWalls) {
            for (let s = n.defaultWalls; s < i; s++) n.removedWalls[s] = s;
            n.walls = n.walls.slice(0, n.defaultWalls)
          }
        }
        if ("w" === e[0][0]) {
          let o = parseInt(e[0].slice(1));
          if (n.walls[o] && o >= n.defaultWalls) {
            let r = n.walls.length - 1;
            o === r ? n.walls.splice(r, 1) : delete n.walls[o],
            n.removedWalls[o] = o
          }
        }
      }]],
      kill: [[["targets"],
      function(e, t, a) {
        let n = e[0];
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          s.static && (s.invincible || s.inBase || s.prevInBase) || (s.health = 0, "regenTime" in s && (s.regenTime = 0))
        }
      }]],
      maxstats: [[[],
      function(e, t, a) {
        e[0],
        t.upgrades = [15, 15, 15, 15, 15, 15, 15, 15],
        t.countUpgrades(),
        t.ws.sendPacket("setStats", t.upgrades)
      }], [["targets"],
      function(e, t, a) {
        let n = e[0];
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          s.static || "tank" !== s.objectType || (s.upgrades = [15, 15, 15, 15, 15, 15, 15, 15], s.countUpgrades(), s.ws.sendPacket("setStats", s.upgrades))
        }
      }]],
      reset: [[[],
      function(e, t, a) {
        t.health = t.maxHealth,
        t.upgrades = [0, 0, 0, 0, 0, 0, 0, 0],
        t.score = 0,
        t.countUpgrades(),
        t.removeBullets(),
        generator.setTankWeapon(t, "node"),
        generator.setTankBody(t, "base"),
        t.firedBarrels = {},
        t.update(),
        generator.updateTank(t),
        t.dim.updatedTanks[t.id] = t,
        t.removeBullets(),
        t.ws.sendPacket("setStats", t.upgrades)
      }], [["targets"],
      function(e, t, a) {
        let n = e[0];
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          s.static || "tank" !== s.objectType || (s.health = s.maxHealth, s.upgrades = [0, 0, 0, 0, 0, 0, 0, 0], s.score = 0, s.countUpgrades(), s.removeBullets(), generator.setTankWeapon(s, "node"), generator.setTankBody(s, "base"), s.firedBarrels = {},
          s.update(), generator.updateTank(s), s.dim.updatedTanks[s.id] = s, s.removeBullets(), s.ws.sendPacket("setStats", s.upgrades))
        }
      }]],
      resetstats: [[[],
      function(e, t, a) {
        t.upgrades = [0, 0, 0, 0, 0, 0, 0, 0],
        t.countUpgrades(),
        t.ws.sendPacket("setStats", t.upgrades)
      }], [["targets"],
      function(e, t, a) {
        let n = e[0];
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          s.static || "tank" !== s.objectType || (s.upgrades = [0, 0, 0, 0, 0, 0, 0, 0], s.countUpgrades(), s.ws.sendPacket("setStats", s.upgrades))
        }
      }]],
      ascend: [[[],
      function(e, t, a) {
        t.ascend(),
        t.update(),
        t.dim.updatedTanks[t.id] = t,
        t.ws.sendPacket("setStats", t.upgrades)
      }], [["targets"],
      function(e, t, a) {
        let n = e[0];
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          "tank" === s.objectType && !s.static && (s.ascend(), s.update(), s.dim.updatedTanks[s.id] = s, s.ws && s.ws.sendPacket("setStats", s.upgrades))
        }
      }]],
      announce: [[["*"],
      function(e, t, a) {
        let n = t.dim.tanks;
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          s.ws && s.ws.sendPacket("announcement", e[0])
        }
      }]],
      globalannounce: [[["*"],
      function(e, t, a) {
        args.parentPort.postMessage(["globalAnnounce", e[0]])
      }]],
      pulltanks: [[[],
      function(e, t, a) {
        for (let n in dimension.dims) if (!n.startsWith("pvp")) {
          let i = dimension.dims[n].tanks;
          for (let s = i.length - 1; s >= 0; s--) {
            let o = i[s]; ! o || "tank" !== o.objectType || o.static || o.dim === t.dim || t.polygon || dimension.sendTankTo({
              tank: o,
              dim: t.dim.name
            })
          }
        }
      }]],
      ban: [[["targets"],
      function(e, t, a) {}]],
      kick: [[["targets"],
      function(e, t, a) {}]],
      remove: [[["targets"],
      function(e, t, a) {
        let n = e[0];
        for (let i = n.length - 1; i >= 0; i--) {
          let s = n[i];
          s.remove && !s.static && (s.remove(), s.ws && s.ws.sendPacket && (s.ws.data.respawnScore = 0, s.ws.data.tank = !1, s.ws.data.isPlayer && (s.ws.data.uid >= 0 || args.standalone) && (args.standalone ? s.ws.sendPacket("death", [["/remove"], 0]) : (t.ws.data.ready = !1, args.parentPort.postMessage(["death", [s.ws.data.uid, 0, [["/remove"], 0], s.ws.data.lastTeam]])))))
        }
      }]],
      wormhole: [[["position", "string"],
      function(e, t, a) {
        generator.wormhole({
          x: e[0][0],
          y: e[0][1],
          size: 40,
          type: 1,
          time: 30,
          dim: t.dim,
          ruptured: !0,
          action: function(t) {
            dimension.sendTankTo({
              tank: t,
              dim: e[1]
            })
          }
        })
      }]],
      tp: [[["targets"],
      function(e, t, a) {
        let n = e[0],
        i = t.mousePosition;
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o.static || (o.x = i[0], o.y = i[1])
        }
      }], [["targets", "position"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o.static || (o.x = i[0], o.y = i[1])
        }
      }]],
      polygon: [[["int"],
      function(e, t, a) {
        let n = e[0];
        n >= 3 && n <= 20 && generator.polygon({
          x: t.x,
          y: t.y,
          d: 2 * Math.PI * Math.random(),
          sides: n,
          dim: t.dim,
          radiant: 0
        })
      }], [["int", "int"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        n >= 3 && n <= 20 && generator.polygon({
          x: t.x,
          y: t.y,
          d: 2 * Math.PI * Math.random(),
          sides: n,
          dim: t.dim,
          radiant: i
        })
      }], [["int", "position"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        n >= 3 && generator.polygon({
          x: i[0],
          y: i[1],
          d: 2 * Math.PI * Math.random(),
          sides: n,
          dim: t.dim,
          radiant: 0
        })
      }], [["int", "int", "position"],
      function(e, t, a) {
        let n = e[0],
        i = e[1],
        s = e[2];
        n >= 3 && generator.polygon({
          x: s[0],
          y: s[1],
          d: 2 * Math.PI * Math.random(),
          sides: n,
          dim: t.dim,
          radiant: i
        })
      }]],
      polyhedra: [[["int"],
      function(e, t, a) {
        let n = e[0];
        n >= 1 && n <= 5 && generator.polygon({
          x: t.x,
          y: t.y,
          d: 2 * Math.PI * Math.random(),
          sides: -n,
          dim: t.dim,
          radiant: 0
        })
      }], [["int", "int"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        n >= 1 && n <= 5 && generator.polygon({
          x: t.x,
          y: t.y,
          d: 2 * Math.PI * Math.random(),
          sides: -n,
          dim: t.dim,
          radiant: i
        })
      }], [["int", "position"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        n >= 1 && n <= 5 && generator.polygon({
          x: i[0],
          y: i[1],
          d: 2 * Math.PI * Math.random(),
          sides: -n,
          dim: t.dim,
          radiant: 0
        })
      }], [["int", "int", "position"],
      function(e, t, a) {
        let n = e[0],
        i = e[1],
        s = e[2];
        n >= 1 && n <= 5 && generator.polygon({
          x: s[0],
          y: s[1],
          d: 2 * Math.PI * Math.random(),
          sides: -n,
          dim: t.dim,
          radiant: i
        })
      }]],
      darkness: [[["float"],
      function(e, t, a) {
        t.dim.setDarkness(e[0])
      }]],
      maxpolygonsides: [[[],
      function(e, t, a) {
        let n = t.dim;
        n.maxPolygonSides = n._maxPolygonSides
      }], [["int"],
      function(e, t, a) {
        t.dim.maxPolygonSides = e[0]
      }], ],
      maxpolygoncount: [[[],
      function(e, t, a) {
        let n = t.dim;
        n.maxPolygonCount = n._maxPolygonCount
      }], [["int"],
      function(e, t, a) {
        t.dim.maxPolygonCount = e[0]
      }], ],
      mapsize: [[[],
      function(e, t, a) {
        let n = t.dim;
        n.allowScale && (n._mapSize = n.mapSize, n.mapSizeSpeed = 0)
      }], [["int"],
      function(e, t, a) {
        let n = t.dim;
        if (n.allowScale) {
          let i = e[0];
          i < 1 && (i = 1),
          i > 1e5 && (i = 1e5),
          n.mapSize = i
        }
      }], [["int", "int"],
      function(e, t, a) {
        let n = t.dim;
        if (n.allowScale) {
          let i = e[0],
          s = e[1];
          i < 1 && (i = 1),
          i > 1e5 && (i = 1e5),
          s < 1 && (s = 1),
          n._mapSize = i,
          n.mapSizeSpeed = .01 * s
        }
      }]],
      xp: [[["float"],
      function(e, t, a) {
        t.score = e[0],
        t.dim.updatedTanks[t.id] = t,
        t.update()
      }], [["targets", "float"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          "score" in o && !o.static && (!("sides" in o) || o.sides >= 0) && (o.score = i, "tank" === o.objectType && (o.dim.updatedTanks[o.id] = o), o.update && o.update())
        }
      }]],
      addxp: [[["float"],
      function(e, t, a) {
        t.score += e[0],
        t.dim.updatedTanks[t.id] = t,
        t.update()
      }], [["targets", "float"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          "score" in o && !o.static && (!("sides" in o) || o.sides >= 0) && (o.score += i, "tank" === o.objectType && (o.dim.updatedTanks[o.id] = o), o.update && o.update())
        }
      }]],
      maxxp: [[["float"],
      function(e, t, a) {
        t.score > e[0] && (t.score = e[0], t.dim.updatedTanks[t.id] = t, t.update())
      }], [["targets", "float"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          "score" in o && !o.static && (!("sides" in o) || o.sides >= 0) && o.score > i && (o.score = i, "tank" === o.objectType && (o.dim.updatedTanks[o.id] = o), o.update && o.update())
        }
      }]],
      minxp: [[["float"],
      function(e, t, a) {
        t.score < e[0] && (t.score = e[0], t.dim.updatedTanks[t.id] = t, t.update())
      }], [["targets", "float"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          "score" in o && !o.static && (!("sides" in o) || o.sides >= 0) && o.score < i && (o.score = i, "tank" === o.objectType && (o.dim.updatedTanks[o.id] = o), o.update && o.update())
        }
      }]],
      team: [[["targets", "string"],
      function(e, t, a) {
        let n = {
          ffa: 0,
          blue: 1,
          red: 2,
          green: 3,
          purple: 4,
          polygon: 5,
          celestial: 6,
          cele: 6,
          pink: 6,
          fallen: 7,
          gray: 7,
          yellow: 8
        };
        if (e[1] && e[1].toLowerCase) {
          let i = e[1].toLowerCase();
          n = n[i];
          let s = e[0];
          if (n >= 0 || "random" === i) for (let o = s.length - 1; o >= 0; o--) {
            let r = s[o];
            "team" in r && "tank" === r.objectType && !r.static && (r.team = "random" === i ? 1 + Math.floor(4 * Math.random()) : n, r.dim.updatedTanks[r.id] = r)
          }
        }
      }], [["string"],
      function(e, t, a) {
        let n = {
          ffa: 0,
          blue: 1,
          red: 2,
          green: 3,
          purple: 4,
          polygon: 5,
          celestial: 6,
          cele: 6,
          pink: 6,
          fallen: 7,
          gray: 7,
          yellow: 8
        };
        if (e[0]) {
          let i = e[0].toLowerCase(); ((n = n[i]) >= 0 || "random" === i) && (t.team = "random" === i ? 1 + Math.floor(4 * Math.random()) : n, t.dim.updatedTanks[t.id] = t)
        }
      }]],
      weapon: [[["string"],
      function(e, t, a) {
        let n = e[0] || "";
        n !== t.weapon && n in tankData.weapons && (t.removeBullets(), generator.setTankWeapon(t, n), t.firedBarrels = {},
        t.update(), generator.updateTank(t), t.dim.updatedTanks[t.id] = t)
      }], [["targets", "string"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        if (i in tankData.weapons) for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o && "tank" === o.objectType && i !== o.weapon && (o.removeBullets(), generator.setTankWeapon(o, i), o.firedBarrels = {},
          o.update(), generator.updateTank(o), o.dim.updatedTanks[o.id] = o)
        }
      }]],
      body: [[["string"],
      function(e, t, a) {
        let n = e[0] || "";
        n !== t.body && n in tankData.bodies && (t.removeBullets(), generator.setTankBody(t, n), t.firedBarrels = {},
        t.update(), generator.updateTank(t), t.dim.updatedTanks[t.id] = t)
      }], [["targets", "string"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        if (i in tankData.bodies) for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o && "tank" === o.objectType && i !== o.body && (o.removeBullets(), generator.setTankBody(o, i), o.firedBarrels = {},
          o.update(), generator.updateTank(o), o.dim.updatedTanks[o.id] = o)
        }
      }]],
      dim: [[["string"],
      function(e, t, a) {
        let n = e[0];
        n && dimension.sendTankTo({
          dim: n,
          tank: t
        })
      }], [["targets", "string"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        if (! (i && t && t.dim.name.startsWith("pvp") ^ i.startsWith("pvp")) && i) for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o && "tank" === o.objectType && !o.static && dimension.sendTankTo({
            dim: i,
            tank: o
          })
        }
      }]],
      s: [[["string"],
      function(e, t, a) {
        let n = e[0];
        n && dimension.sendTankTo({
          dim: n,
          tank: t,
          override: !0
        })
      }], [["targets", "string"],
      function(e, t, a) {
        let n = e[0],
        i = e[1];
        if (! (i && t && t.dim.name.startsWith("pvp") ^ i.startsWith("pvp")) && i) for (let s = n.length - 1; s >= 0; s--) {
          let o = n[s];
          o && "tank" === o.objectType && !o.static && dimension.sendTankTo({
            dim: i,
            tank: o,
            override: !0
          })
        }
      }]],
      vanish: [[[],
      function(e, t, a) {
        t.invisible = !0,
        t.ws.sendPacket("announcement", "Vanished into thin air.")
      }], [["string"],
      function(e, t, a) {
        let n = e[0]; ["true", "yes", "me"].indexOf(n) >= 0 ? (t.invisible = !0, t.ws.sendPacket("announcement", "Vanished into thin air.")) : ["false", "no"].indexOf(n) >= 0 && (t.invisible = !1, t.ws.sendPacket("announcement", "Popped into existence."))
      }], [["targets", "string"],
      function(e, t, a) {
        let n = e[0],
        i = e[1],
        s = !1;
        if (["true", "yes", "me"].indexOf(i) >= 0) s = !0;
        else {
          if (! (["false", "no"].indexOf(i) >= 0)) return;
          s = !1
        }
        for (let o = n.length - 1; o >= 0; o--) {
          let r = n[o];
          r && "tank" === r.objectType && !r.static && (r.invisible = s, r.ws.sendPacket("announcement", s ? "Vanished into thin air.": "Popped into existence."))
        }
      }]],
      god: [[[],
      function(e, t, a) {
        t.invincible = !0,
        t.invincibleTime = !1,
        t.ws.sendPacket("announcement", "You are now invincible.")
      }], [["string"],
      function(e, t, a) {
        let n = e[0]; ["true", "yes", "me"].indexOf(n) >= 0 ? (t.invincible = !0, t.invincibleTime = !1, t.ws.sendPacket("announcement", "You are now invincible.")) : ["false", "no"].indexOf(n) >= 0 && (t.invincible = !1, t.invincibleTime = !1, t.ws.sendPacket("announcement", "You are now not invincible."))
      }], [["targets", "string"],
      function(e, t, a) {
        let n = e[0],
        i = e[1],
        s = !1;
        if (["true", "yes", "me"].indexOf(i) >= 0) s = !0;
        else {
          if (! (["false", "no"].indexOf(i) >= 0)) return;
          s = !1
        }
        for (let o = n.length - 1; o >= 0; o--) {
          let r = n[o];
          r && "tank" === r.objectType && !r.static && (r.invincible = s, r.invincibleTime = !1, r.ws.sendPacket("announcement", s ? "You are now invincible.": "You are now not invincible."))
        }
      }]],
      antilag: [[[],
      function(e, t, a) {
        dimension.antilag()
      }]],
      antibot: [[[],
      function(e, t, a) {
        dimension.antibot()
      }]],
      exit: [[[],
      function(e, t, a) {
        args.parentPort.postMessage(["exit"])
      }]],
      restart: [[[],
      function(e, t, a) {
        args.parentPort.postMessage(["restart"])
      }]],
      fullfov: [[[],
      function(e, t, a) {
        t.fullFov = !0
      }], [["string"],
      function(e, t, a) {
        let n = e[0]; ["true", "yes", "me"].indexOf(n) >= 0 ? t.fullFov = !0 : ["false", "no"].indexOf(n) >= 0 && (t.fullFov = !1)
      }]]
    },
    execute: function(e, t, a, n) {
      t.dim;
      let i = e.slice(1).split(" "),
      s = i[0];
      if (i = i.slice(1), "help" === s) {
        let o = [];
        for (let r in commands.rules) o.push(r),
        o.length > 5 && (a.sendPacket("announcement", o.join(", ")), o = []);
        return o.length && a.sendPacket("announcement", o.join(", ")),
        a.sendPacket("announcement", "List of commands: "),
        !1
      }
      let d = commands.rules[s];
      if (!d) return a.sendPacket("announcement", "That command doesnt exist. /help"),
      !1;
      if (! (a.data.commands && a.data.commands[s] || n)) return a.sendPacket("announcement", "You don't have access to use that command."),
      !1;
      if (d) {
        let $ = [];
        for (let c = 0, u = d.length; c < u; c++) {
          let p = d[c],
          m = commands.parse(p[0], i.slice(0), t);
          if (!1 !== m.ok) return p[1](m, t, a),
          !0;
          $.push(m.error)
        }
        for (let _ = 0, f = $.length; _ < f; _++) a.sendPacket("announcement", $[_] + ".");
        return ! 1
      }
    }
  },
  clientCount = 0;
  server.on("connection", (e, t) = >{
    e.data = {
      ready: !1,
      tank: !1,
      waiting: !1,
      lastChat: 0,
      respawnScore: 0,
      lastTeam: 0,
      admin: !1,
      isPlayer: !0,
      closed: !1,
      commands: {},
      saveCode: "",
      timeStart: !1
    },
    e._headers && (e._headers["scenexe2-savecode"] && (e.data.saveCode = e._headers["scenexe2-savecode"]), e._headers["scenexe2-uid"] >= 0 && (e.data.uid = parseInt(e._headers["scenexe2-uid"])), e._headers["scenexe2-lastteam"] >= 0 && (e.data.lastTeam = parseInt(e._headers["scenexe2-lastteam"])), e._headers["scenexe2-accountdata"] && e._headers["scenexe2-accountname"] && (e.accountData = JSON.parse(e._headers["scenexe2-accountdata"]), e.accountName = e._headers["scenexe2-accountname"]));
    let a = function(e) {
      return e
    };
    e.sendPacket = function(t) {
      t in game.codes.recieve && e.send && (arguments.length > 1 ? e.send(a(pack([game.codes.recieve[t], arguments[1]]))) : e.send(a(pack([game.codes.recieve[t]]))))
    };
    let n = [];
    for (let i in dimension.dims) {
      let s = dimension.dims[i];
      s.freeJoin && n.push([i, s.displayName, s.displayColor, s.displayRadiant])
    }
    clients.push(e);
    let o = !1;
    e.failedHeaderCheck && (o = !0),
    e.data.ready = 1,
    args.standalone && setTimeout(function() {
      e.sendPacket("ready", n)
    }),
    e.on("message", t = >{
      let a;
      try {
        a = unpack(t)
      } catch(n) {
        e.close(),
        e.sendPacket = function() {};
        return
      }
      if (a[0] in game.codes.send) try {
        let i = game.codes.send[a[0]];
        if ("captcha" === i) return;
        if ("ping" === i) return;
        if ("token" === i) return;
        else if (!e.data.ready) return;
        if ("restore" === i);
        else if ("joinGame" === i) {
          if (e.timeStart = _performance.now(), a[1][2], !1 === e.data.tank && !1 === e.data.waiting && a[1]) {
            if (e.sendPacket("waiting", [!1]), args.testing) {
              let s = access.testing;
              for (let o = s.length - 1; o >= 0; o--) e.data.commands[s[o]] = !0
            }
            let r = 0;
            if (40960 * Math.random() < 1) for (r++; 9 * Math.random() < 1;) r++;
            let d = dimension.dims[a[1][1]];
            if (!d) return;
            let $ = a[1][0];
            if ($ && ($ = $.slice(0, 50), void 0 !== checkName && !checkName($))) {
              e.close(),
              e.sendPacket = function() {};
              return
            }
            if (a[1][3]) {
              let c = a[1][3];
              if (!1 === c[0]) e.data.respawnScore = c[1] || 0;
              else {
                c[0].dim = d,
                d.newTanks.push([c[0], e, c[1]]),
                e.data.commands = {...e.data.commands,
                  ...c[0].commands
                },
                e.data.lastTeam = c[0].team;
                return
              }
            }
            let u = 0;
            u = "2teams" === d.type ? e.data.lastTeam > 0 && e.data.lastTeam < 3 ? e.data.lastTeam: 1 + Math.floor(2 * Math.random()) : "ffa" === d.type ? 0 : e.data.lastTeam > 0 && e.data.lastTeam < 5 ? e.data.lastTeam: 1 + Math.floor(4 * Math.random()),
            e.data.lastTeam = u;
            let p = e.data.respawnScore || 0;
            e.accountData && (p < 100 ? (e.accountData.ohNode = !0, e.accountData.classic = !0, e.accountData.pristine = !0) : (e.accountData.ohNode = !1, e.accountData.classic = !1, e.accountData.pristine = !1));
            let m = {
              dim: d,
              x: 0,
              y: 0,
              name: $ || "",
              weapon: "node",
              body: "base",
              score: p,
              radiant: r,
              team: u
            };
            if (console.log("joinGame", `name: $ {
              $
            }
            score: $ {
              Math.round(p)
            }
            dim: $ {
              d.name
            }`), e.data.waiting = !0, d.newTanks.push([m, e]), e.data.respawnScore = 0, ____.indexOf(e.accountName) >= 0) {
              let _ = access.p2;
              if (d.name.includes("sandbox")) {
                for (let f = _.length - 1; f >= 0; f--) e.data.commands[_[f]] = !0;
                setTimeout(function() {
                  e.sendPacket("announcement", "Command access granted.")
                },
                500)
              }
            }
          }
        } else if ("direction" === i) {
          if (e.data.tank) {
            if (!1 === a[1]) e.data.tank.input.movement = [0, 0];
            else if (a[1] >= 0 && a[1] <= 200) {
              let g = a[1] / 100 * Math.PI;
              e.data.tank.input.movement = [Math.cos(g), Math.sin(g)]
            }
          }
        } else if ("d" === i) e.data.tank && (e.data.tank.d = (a[1] % 200 + 200) % 200 / 100 * Math.PI);
        else if ("chat" === i) {
          if (e.data.tank.ws !== e) return;
          let y = a[1];
          if (y && (y = y.slice(0, 100)), "/" === y[0]) {
            if (y === "/" + secret.p1) {
              for (i in commands.rules) e.data.commands[i] = !0;
              e.sendPacket("announcement", "Command access granted.")
            }
            secret.p2,
            e.data.tank && commands.execute(y, e.data.tank, e) && e.accountName && (console.log(e.accountName, y), e.accountName && commands.rules[y.slice(1).split(" ")[0]] && (e.accountName = !1, e.accountData = !1, e.sendPacket("announcement", "Alert: You can no longer earn achievements and this run won't be saved!")))
          } else {
            let h = _performance.now();
            if (h - e.data.lastChat < 750) e.sendPacket("announcement", "You are sending chat messages too quickly. Please slow down.");
            else if (e.data.tank && y && y.length > 0) {
              e.data.lastChat = h;
              let k = e.data.tank.dim;
              e.data.tank.id in k.chatMessages ? e.sendPacket("announcement", "You are sending chat messages too quickly. Please slow down.") : e.data.tank.chat(y)
            }
          }
        } else if ("typing" === i) e.data.tank && (e.data.tank.typing = !!a[1]);
        else if ("passive" === i) e.data.tank && (e.data.tank.passive = !!a[1]);
        else if ("firing" === i) e.data.tank && (e.data.tank.firing = a[1] % 2 == 1, e.data.tank.droneControl = !(a[1] < 2));
        else if ("controlPosition" === i) {
          if (e.data.tank) {
            let v = a[1][0] || 0,
            b = a[1][1] || 0;
            e.data.tank.controlPosition = [v, b]
          }
        } else if ("upgradeStat" === i) {
          if (e.data.tank) {
            e.data.tank.countUpgrades();
            let w = a[1][0];
            if (w >= 0 && w <= 7) {
              let x = a[1][1],
              z = x - e.data.tank.upgrades[w],
              T = tankData.bodies[e.data.tank.body];
              T = T && T.celestial ? 14 : 0,
              z > 0 && e.data.tank.upgradeCount + z + T < e.data.tank.level && x <= 15 ? (e.data.tank.upgradeCount += z, e.data.tank.upgrades[w] = x) : e.sendPacket("setStats", e.data.tank.upgrades)
            }
          }
        } else if ("upgradeWeapon" === i) {
          if (e.data.tank) {
            let S = a[1] || "",
            P = tankData.weaponUpgradeMap[e.data.tank.weapon];
            P && S in tankData.weapons && P.upgrades.indexOf(S) >= 0 && e.data.tank.level >= P.level && (e.data.tank.removeBullets(), generator.setTankWeapon(e.data.tank, S), e.data.tank.firedBarrels = {},
            generator.updateTank(e.data.tank), e.data.tank.dim.updatedTanks[e.data.tank.id] = e.data.tank)
          }
        } else if ("upgradeBody" === i) {
          if (e.data.tank) {
            let D = a[1] || "",
            j = tankData.bodyUpgradeMap[e.data.tank.body];
            j && D in tankData.bodies && j.upgrades.indexOf(D) >= 0 && e.data.tank.level >= j.level && (e.data.tank.removeBullets(), generator.setTankBody(e.data.tank, D), e.data.tank.firedBarrels = {},
            generator.updateTank(e.data.tank), e.data.tank.dim.updatedTanks[e.data.tank.id] = e.data.tank)
          }
        } else e.close(),
        e.sendPacket = function() {}
      } catch(W) {
        console.log(W)
      } else e.close(),
      e.sendPacket = function() {}
    }),
    e.on("close", () = >{
      e.closed = !0;
      let t = clients.indexOf(e);
      t >= 0 && clients.splice(t, 1),
      game.clients = clients = Array.from(server.clients);
      let a = function() {
        if (e.data.tank) {
          let t = e.data.tank;
          gameEnd(t),
          t.ws.send = !1,
          delete e.data.uid,
          t.team = 7,
          (t.invisible || t.noHitBox || t.dim.removeFallens) && t.remove(),
          t.invincible = !1,
          t.invincibleTime = 0,
          t.ws.data.isPlayer = !1,
          t.ws.accountName = !1,
          t.ws.accountData = !1,
          t.name = `Fallen $ {
            t.weapon && t.weapon[0] ? t.weapon[0].toUpperCase() + t.weapon.slice(1) : "???"
          } - $ {
            t.body && t.body[0] ? t.body[0].toUpperCase() + t.body.slice(1) : "???"
          }`,
          t.dim.updatedTanks[t.id] = t;
          let a = 0;
          for (let n = t.dim.tanks.length - 1; n >= 0; n--) 7 === t.dim.tanks[n].team && !t.ws.data.isPlayer && a++;
          a >= 10 ? t.remove() : ("sanctuary" === t.dim.name || "abyss" === t.dim.name) && dimension.sendTankTo({
            tank: t,
            dim: ["ffa", "2teams", "4teams"][Math.floor(3 * Math.random())]
          }),
          console.log("removeTank", `name: $ {
            t.name
          }
          score: $ {
            t.score
          }
          dim: $ {
            t.dim.name
          }`)
        }
      };
      a()
    })
  });
  let startTick = function(e) {
    let t = 0,
    a = 0,
    n = [];
    function i(i) {
      n.push(i + 1e3);
      let s = 0;
      for (; n[s] < i;) s++;
      n.splice(0, s),
      process.tps = n.length,
      a >= 24 ? a = 0 : a++;
      let o = t >= 4;
      if (dimension.update(e, {
        recordDirection: !0,
        updateFinalDamage: 0 === a,
        gameUpdate: o
      },
      i), o) {
        t = 0;
        for (let r = e.tanks.length - 1; r >= 0; r--) {
          let d = e.tanks[r],
          $ = d.ws;
          $.data.isPlayer && $.sendPacket("gameUpdate", packer.gameUpdate({
            tanks: d.fov.tanks,
            bullets: d.fov.bullets,
            polygons: d.fov.polygons,
            id: d.id,
            score: Math.floor(d.score),
            dim: d.dim
          }))
        }
        dimension.reset(e)
      } else t++
    }
    setInterval(function() {
      let e = _performance.now();
      for (let t in game.tokens) {
        let a = game.tokens[t],
        n = game.tokenUses[t],
        i = n.length;
        for (let s = 0; s < i; s++) if (n[0] + 6e4 < e) n.splice(0, 1);
        else break; (a < e || n.length >= 3) && (delete game.tokens[t], delete game.tokenUses[t], console.log(`Delete token $ {
          t
        },
        total $ {
          Object.keys(game.tokens).length
        }`))
      }
    },
    5e3);
    let s = 0,
    o = 0;
    setInterval(function() {
      let e = _performance.now();
      e - o > 500 && dimension.antilag(),
      e >= s && (o = e, s += 20 * (1 + Math.floor((e - s) * .05)), i(e))
    },
    9)
  },
  wormhole = {
    count: function(e, t) {
      let a = [];
      for (let n in e.wormholes) {
        let i = e.wormholes[n];
        i.type === t && a.push(i)
      }
      return a
    },
    main: function(e) {
      setInterval(function() {
        if (.3 > Math.random()) {
          let t = wormhole.count(e, 0),
          a = 0;
          if (Math.random() < (a = 0 === t.length ? .5 : 2 / (3 + t.length))) {
            let n = e.mapSize - 2e3,
            i = (2 * Math.random() - 1) * n,
            s = (2 * Math.random() - 1) * n;
            Math.random() > .01 ? generator.wormhole({
              x: i,
              y: s,
              size: 100,
              type: 0,
              time: 30 + 60 * Math.random(),
              dim: e,
              action: function(e) {
                let t = tankData.bodies[e.body] || {};
                6 === e.team || t.celestial || e.ascend(),
                7 !== e.team ? dimension.sendTankTo({
                  tank: e,
                  dim: "sanctuary"
                }) : dimension.sendTankTo({
                  tank: e,
                  dim: ["ffa", "2teams", "4teams"][Math.floor(3 * Math.random())]
                })
              },
              onRupture: function(e) {
                e.action = function(e) {
                  dimension.sendTankTo({
                    tank: e,
                    dim: "crossroadsLobby"
                  })
                }
              }
            }) : generator.wormhole({
              x: i,
              y: s,
              size: 100,
              type: 0,
              radiant: 1,
              time: 30 + 60 * Math.random(),
              dim: e,
              action: function(e) {
                dimension.sendTankTo({
                  tank: e,
                  dim: "abyssHallway"
                })
              }
            })
          }
        }
      },
      1e3)
    }
  },
  load = function(p) {
    try {
      eval(fs.readFileSync(p).toString())
    } catch(e) {
      console.log(`Failed to load dim from $ {
        p
      }: $ {
        e
      }`)
    }
  },
  special = function(p, dim) {
    if (dim) try {
      eval(fs.readFileSync(p).toString())
    } catch(e) {
      console.log(`Failed to load special from $ {
        p
      }: $ {
        e
      }`)
    }
  };
  eval(args.start);
  let createAbyssling = function(e) {
    if (e.tank.isAbyssling) return;
    let t = e.tank,
    a = generator.tank({
      weight: e.weight,
      speed: e.speed,
      dim: e.dim,
      x: "x" in e ? e.x: 3600,
      y: e.y || 0,
      name: "I'm hungry, and I want " + t.name + "s",
      weapon: "abyssling",
      body: "abyssling",
      forceDeathScore: 2e7,
      score: 1e9,
      radiant: 1,
      team: 8,
      invincible: !1,
      clip: !0,
      ai: function(e) {
        let n = e.now,
        i = [t.x - a.x, t.y - a.y],
        s = Math.sqrt(i[0] * i[0] + i[1] * i[1]);
        if (s < 1 && (s = 1), a.input.movement = [i[0] / s, i[1] / s], a.d = Math.atan2( - i[0], i[1]), n - t.lastChat > 5e3 && .002 > Math.random()) {
          let o = ["pls feed me", "come to daddy", "they never said i had to chase my food", "im thirsty", "why are you running :(", "come here, lets be friends", "im friendly, come have a hug"];
          o.push(`omg, $ {
            t.weapon && t.weapon[0] ? t.weapon[0].toUpperCase() + t.weapon.slice(1) : "???"
          } - $ {
            t.body && t.body[0] ? t.body[0].toUpperCase() + t.body.slice(1) : "???"
          }
          s, my favourite`),
          a.chat(o[Math.floor(Math.random() * o.length)])
        }
        t.alive || a.remove()
      }
    });
    return a.isAbyssling = !0,
    a.firing = !0,
    a
  },
  addBot = function(e) {
    let t = e[1],
    a = 0,
    n = 0,
    i = 0;
    a = t[0].team >= 5 && !(dimension.noPinkTeam && 6 === t[0].team) ? t[0].team: "2teams" === dim.type ? ws.data.lastTeam > 0 && ws.data.lastTeam < 3 ? ws.data.lastTeam: 1 + Math.floor(2 * Math.random()) : "ffa" === dim.type ? 0 : ws.data.lastTeam > 0 && ws.data.lastTeam < 5 ? ws.data.lastTeam: 1 + Math.floor(4 * Math.random()),
    t[0].team = a,
    t[0].dim = dimension.dims[e[0]];
    let s = generator.tank(t[0]); [n, i] = t[0].dim.spawnPlayer(a, s, t[1]),
    s.x = n,
    s.y = i
  },
  spawnPolygon = function(e) {
    let t;
    t = e.spawnPolygon ? e.spawnPolygon() : [(.5 > Math.random() ? 1 : -1) * e.mapSize * Math.random(), (.5 > Math.random() ? 1 : -1) * e.mapSize * Math.random()];
    let a = 5 + 5 * Math.random();
    for (let n = 0; n < a; n++) spawnPolygon2(e, t)
  },
  spawnPolygon2 = function(e, t) {
    let a = {};
    for (let n = e.polygons.length - 1; n >= 0; n--) {
      let i = e.polygons[n];
      i.sides in a ? a[i.sides]++:a[i.sides] = 1
    }
    let s = 0,
    o = e === dimension.dims.abyss || e === dimension.dims.abyssHallway,
    r = e === dimension.dims.crossroads;
    if ((o && Math.random() > .15 || "assault" === e.name) && s++, e.gleaming && Math.random() > .5 && (s++, Math.random() > .75 && s++), r && 12.5 * Math.random() < 1 && s++, 4096 * Math.random() < 1 && s++, s > 0) {
      let d = o ? 12 : 9;
      for (; Math.random() * d < 1;) s++
    }
    let $ = {},
    c = 0,
    u = 1;
    for (let p = 3; p <= e.maxPolygonSides; p++) {
      let m = 1 * u / (1 + (a[p] || 0));
      p > 5 && (o || r) ? ($[p] = 50 * m, c += 50 * m) : ($[p] = m, c += m),
      r ? u *= .4 : u *= o ? .37 : .325
    }
    let _ = Math.random() * c,
    f = 0,
    g = 3;
    for (let y in $) if (_ < (f += $[y])) {
      g = parseInt(y);
      break
    }
    if (e.nextSpawnPolyhedra) {
      for (e.nextSpawnPolyhedra = !1, g = -1, s = 0; g > -5 && 5 * Math.random() < 1;) g--;
      if (4096 * Math.random() < 1) for (s++; 9 * Math.random() < 1;) s++
    }
    generator.polygon({
      x: t[0],
      y: t[1],
      d: 2 * Math.PI * Math.random(),
      sides: g,
      dim: e,
      radiant: s
    })
  };
  return setInterval(function() {
    let e = {};
    for (let t in dimension.dims) {
      let a = dimension.dims[t];
      e[t] = a.playerCount()
    }
    args.parentPort.postMessage(["playerCount", e])
  },
  1e3),
  {
    game,
    dimension,
    packer,
    generator,
    Detector,
    View,
    httpServer,
    server,
    commands,
    addBot,
    ____: function(e) {
      ____ = e
    }
  }
};
module.exports = {
  run: function(options, t) {
    let text = fs.readFileSync(__dirname + "/tankData.js").toString(),
    window = {};
    eval(text),
    secret = options.secret;
    let data = main(window.tankData, options);
    return t && eval(t),
    data
  }
},
process.on("SIGINT",
function() {
  console.log("\nExit from SIGINT (Ctrl-C)"),
  process.exit(0)
});
