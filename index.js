 const mineflayer = require('mineflayer') const { pathfinder, Movements, goals } = require('mineflayer-pathfinder') const Vec3 = require('vec3') const mcData = require('minecraft-data')

const usernames = ['BotMaster', 'BotMaster_', 'BotMasterX', 'BotMaster123'] let usernameIndex = 0 let reconnectTimeout = null

function startBot() { const bot = mineflayer.createBot({ host: 'sudana_smp.aternos.me', port: 30926, username: usernames[usernameIndex], version: false })

bot.loadPlugin(pathfinder)

let data bot.once('spawn', () => { data = mcData(bot.version) const defaultMove = new Movements(bot, data) bot.pathfinder.setMovements(defaultMove) bot.chat('/spawn') bot.look(0, 0) bot.setControlState('sneak', false)

// Move to spawn coordinates
bot.pathfinder.setGoal(new goals.GoalBlock(-247, 200, 62))

startIdleMessages()
startRandomActions()

})

bot.on('chat', (username, message) => { if (username === bot.username) return if (username === 'A1111318' || username === '.A1111318') { bot.chat(🙏 Welcome back, OP ${username}! The world bends to your command.) } else { bot.chat(👋 Welcome ${username}! Stay safe and don't punch creepers! 💥) } })

bot.on('kicked', async () => { usernameIndex = (usernameIndex + 1) % usernames.length console.log('Kicked. Reconnecting with another username...') reconnect() })

bot.on('end', () => { console.log('Bot disconnected. Reconnecting...') reconnect() })

function reconnect() { if (reconnectTimeout) clearTimeout(reconnectTimeout) const delay = 60000 + Math.random() * 60000 // 1–2 min reconnectTimeout = setTimeout(() => { startBot() }, delay) }

function startIdleMessages() { const messages = [ 'I am not a bot, trust me. 😅', 'Who stole my diamonds? 🧐', 'I think the creeper is watching me... 💣', 'Why is everyone punching trees?! 🌳', 'This is fine. 🔥' ] setInterval(() => { const msg = messages[Math.floor(Math.random() * messages.length)] bot.chat(msg) }, 600000 + Math.random() * 300000) // 10–15 min }

function startRandomActions() { setInterval(() => { const actions = ['jump', 'sneak', 'forward', 'back', 'left', 'right'] const action = actions[Math.floor(Math.random() * actions.length)] bot.setControlState(action, true) setTimeout(() => bot.setControlState(action, false), 1000 + Math.random() * 2000)

// Look at nearby players
  const player = Object.values(bot.players).find(p => p.entity)
  if (player) bot.lookAt(player.entity.position.offset(0, 1.6, 0))

  // Randomly dig
  const block = bot.blockAt(bot.entity.position.offset(0, -1, 0))
  if (block && bot.canDigBlock(block)) {
    bot.dig(block).catch(() => {})
  }

  // Randomly attack mobs
  const entity = bot.nearestEntity(e => e.type === 'mob')
  if (entity) bot.attack(entity)
}, 15000 + Math.random() * 15000) // every 15–30 sec

} }

startBot()

