const mineflayer = require('mineflayer'); const { pathfinder, Movements, goals } = require('mineflayer-pathfinder'); const Vec3 = require('vec3'); const mcData = require('minecraft-data'); const { GoalNear } = goals; const { mineflayer: mineflayerViewer } = require('prismarine-viewer'); const fs = require('fs'); const random = require('lodash.random');

const USERNAME = process.env.BOT_USERNAME || 'RailwayBot'; const HOST = process.env.SERVER_HOST || 'sudana_smp.aternos.me'; const PORT = parseInt(process.env.SERVER_PORT || '30926'); const SPAWN_POINT = new Vec3(-247, 200, 62); const OPERATORS = ['A1111318', '.A1111318'];

let bot;

function createBot() { bot = mineflayer.createBot({ host: HOST, port: PORT, username: USERNAME });

bot.loadPlugin(pathfinder);

bot.once('spawn', () => { bot.chat('Bot is online! 🤖'); bot.pathfinder.setMovements(new Movements(bot, mcData(bot.version))); bot.pathfinder.setGoal(new GoalNear(SPAWN_POINT.x, SPAWN_POINT.y, SPAWN_POINT.z, 1));

setInterval(randomIdleChat, random(10 * 60 * 1000, 15 * 60 * 1000));
setInterval(doRandomMovement, random(10 * 1000, 30 * 1000));
setInterval(lookAtPlayers, 15000);
setInterval(tryDigBlock, 30000);
setInterval(attackNearbyMobs, 30000);

});

bot.on('playerJoined', (player) => { if (player.username === bot.username) return; if (OPERATORS.includes(player.username)) { bot.chat(🎉 Welcome back, mighty operator ${player.username}!); } else { const messages = [ Hey ${player.username}! Welcome to the chaos! 😂, ${player.username} joined... Let the games begin! 😈, Welcome ${player.username}, may the creepers spare you today. 🧨 ]; bot.chat(messages[random(0, messages.length - 1)]); } });

bot.on('end', () => { const delay = random(60 * 1000, 120 * 1000); console.log(Bot disconnected. Rejoining in ${delay / 1000} seconds...); setTimeout(createBot, delay); });

bot.on('error', (err) => console.log('Bot error:', err)); }

function randomIdleChat() { const messages = [ "Why did the chicken cross the Nether? To get to the blaze rods! 🐔", "Anyone seen my diamonds? Oh wait, I'm broke... 💎", "Creeper? Aww man... 💥", "Did someone say mining party? Let's go! ⛏️", "I'm 100% real player. Totally. Absolutely." ]; bot.chat(messages[random(0, messages.length - 1)]); }

function doRandomMovement() { const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak']; const action = actions[random(0, actions.length - 1)];

bot.setControlState(action, true); setTimeout(() => bot.setControlState(action, false), random(500, 1500)); }

function lookAtPlayers() { const players = Object.values(bot.players).filter(p => p.entity); if (players.length === 0) return; const target = players[random(0, players.length - 1)].entity.position; bot.lookAt(target.offset(0, 1.6, 0)); }

function tryDigBlock() { const block = bot.blockAt(bot.entity.position.offset(1, -1, 0)); if (block && bot.canDigBlock(block)) { bot.dig(block).catch(() => {}); } }

function attackNearbyMobs() { const mob = bot.nearestEntity(e => e.type === 'mob' && e.mobType !== 'Armor Stand'); if (mob) bot.attack(mob); }

createBot();

