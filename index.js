// index.js
const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot fleet running"));
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

const BOT_COUNT = 10;
let currentIndex = 0;
const bots = Array(BOT_COUNT).fill(null);
const banned = Array(BOT_COUNT).fill(false);
let switching = false;

const baseName = 'SUDANA_boii';
const operatorUsernames = ['.A1111318', 'A1111318'];

const respectedMessages = [
  "Warning: Akshath's presence may cause sudden intelligence spikes.",
  "The server's coolness level just hit max — thanks to Akshath.",
  "Akshath logged in, and now mobs are too scared to spawn.",
  "Akshath's aura just turned cobblestone into diamonds!",
  "Server speed increased by 200% — must be an Akshath thing.",
  "Even Endermen won’t teleport now — they wanna stay near Akshath.",
  "Akshath's energy just made the sun shine brighter in Minecraft.",
  "Villagers are trading better deals — Akshath magic at work!",
  "The grass just got greener. Coincidence? Nope, it’s Akshath.",
  "Akshath joined and even the creepers stopped creeping.",
  "Redstone circuits run smoother when Akshath's online.",
  "Akshath's presence just enchanted the whole server... without a table!",
  "Zombie: sees Akshath — ‘Nah, I’m out.’",
  "Even Herobrine took a break — Akshath's handling things now.",
  "The server went from survival to legendary — welcome, Akshath!",
  "Bow down mortals, the Operator has arrived!",
  "A salute to our lord and savior Akshath!",
  "The server just leveled up. Welcome, Operator!",
  "A wild King Akshath appeared with god-tier vibes!"
];

const generalWelcomeMessages = [
  "Yo! Welcome to the server, champ 🎮",
  "Look who just joined the fun! Welcome aboard 😎",
  "Hey hey! The squad just got cooler. Welcome!",
  "Welcome! May your pickaxe be strong and your adventures epic 🗺️",
  "The vibes just got better — glad you’re here!",
  "Server’s shining brighter now. Welcome in ✨",
  "Another legend has entered the realm. Let’s gooo!",
  "Eyyo! Ready for some blocky adventures? Welcome!",
  "Woot woot! Welcome to the block party 🎉",
  "New player alert! Time to make some awesome memories!",
  "Glad you made it! Let’s build something amazing together 🧱",
  "Adventure awaits! Welcome to your Minecraft journey 🚀",
  "Our team just leveled up — welcome!",
  "Welcome! May your creepers be few and your diamonds plenty 💎",
  "Ahoy! Time to sail through some fun. Welcome matey ⛵",
  "Knock knock. Who's there? Only the coolest player in town — welcome!",
  "The game's better with you in it. Welcome aboard!",
  "Welcome! Hope you brought your mining spirit and good vibes 😊",
  "It’s not just a server anymore — it’s YOUR server now!",
  "Peace, blocks, and good times! Welcome to the crew."
];

const funnyMessages = [
  "Main toh sirf spawn hone aaya tha… server ne thappad se welcome kiya!",
  "Nether gaya tha blaze marne… blaze ne mujhe hi fry kar diya!",
  "Villager trade de raha tha… par aankhon mein toh EMI ka dard tha!",
  "Skeleton aur I ka rishta deep hai… har roz gift deta hai, arrow ka!",
  "Main toh chill kar raha tha… creeper ne surprise birthday diya!",
  "Zombie mujhe dekhta hai jaise main uska bhatija hoon jo chappal le gaya tha!",
  "Pickaxe tut gaya… aur mood bhi!",
  "Main jump kar raha tha… gravity serious le liya bhai!",
  "Warden aaya toh laga DJ aaya… next moment: RIP headphones!",
  "Abhi toh mining shuru ki thi… bedrock ne bol diya: aur kitna neeche jaega re?",
  "Phir se ghar bhool gaya… GPS toh kisi witch ne le liya hoga!",
  "Ender dragon ne toh aise maara… jaise main uska rent nahi diya ho!",
  "Lag aaya, creeper gaya… main bhi gaya!",
  "Jab creeper nazar milaaye… tabhi game over samjho!",
  "Nether portal khula… par back ticket book nahi kiya tha!",
  "Redstone ka engineer banna tha… par bell bhi nahi bajti!",
  "Diamond dhoondhne gaya tha… coal ne hi gali de di!",
  "Aaj tak sirf ek fight jeeta… wo bhi AFK player se!",
  "Server me join kiya tha style se… exit hua sadness se!",
  "Mujhe laga main pro hoon… server bola 'Noob of the Year' 😂",
  "Skeleton ne aaj fir headshot mara... helmet sirf design ke liye tha kya?",
  "Creeper ke saath bonding kar raha tha... ab respawn pe milte hain.",
  "Beech mine mein tha, aur net gaya... ab toh gravel hi gravel hai.",
  "Villager mujhe aise ghoor raha tha jaise loan ka due date ho aaj!",
  "Main toh potion peeke aaya tha... server ne mujhe hi invis kar diya!",
  "Bed lagaya tha aaram ke liye... ab wahi respawn point ban gaya!",
  "Enderman se aankh mil gayi... ab toh family photo bhi nahi bachi.",
  "Pickaxe tut gaya aur diamond mila nahi... bas aansu hi mile!",
  "Server bola: You died. Main bola: Tu kaun hota hai bolne wala?",
  "Jab maine fight jeeti thi... tab creative mode on tha 😎",
  "Zombie aaya, sword nikala... par galti se fishing rod pakad li!",
  "Mujhe laga enchant karne gaya hoon... saara XP gaya tel lene!",
  "Main redstone ka engineer hoon... par gate khulta hi nahi bhai!",
  "Bow liya tha power 5 wala... par arrows ghar pe bhool aaya!",
  "Server me join kiya aur laga sab theek hai... phir creeper aaya 😂"
];

// Immediately start the first bot
createBot(currentIndex);
scheduleNext();

function scheduleNext() {
  if (switching) return;
  switching = true;

  const delayMs = (60 + Math.random() * 60) * 60 * 1000;
  console.log(`Scheduling next switch in ${(delayMs / 60000).toFixed(2)} minutes.`);
  setTimeout(() => {
    rotateBots();
    switching = false;
    scheduleNext();
  }, delayMs);
}

function rotateBots() {
  const oldIndex = currentIndex;
  const oldBot = bots[oldIndex];
  if (oldBot) {
    console.log(`Logging out bot: ${getBotName(oldIndex)}`);
    oldBot.quit();
    bots[oldIndex] = null;
  }
  currentIndex = getNextIndex(oldIndex);
  console.log(`Starting bot: ${getBotName(currentIndex)}`);
  createBot(currentIndex);
}

function getNextIndex(start) {
  let next = (start + 1) % BOT_COUNT;
  for (let i = 0; i < BOT_COUNT; i++) {
    if (!banned[next]) return next;
    next = (next + 1) % BOT_COUNT;
  }
  console.log('⚠️ All bots banned! Resetting bans.');
  banned.fill(false);
  return 0;
}

function getBotName(i) {
  return i === 0 ? baseName : baseName + (i + 1);
}

function createBot(index) {
  const username = getBotName(index);
  console.log(`Creating bot ${username}`);
  const bot = mineflayer.createBot({
    host: 'sudana_smp.aternos.me',
    port: 53659,
    username,
    version: '1.16.5'
  });
  bots[index] = bot;

  bot.on('spawn', () => {
    bot.chat('/register aagop04');
    setTimeout(() => bot.chat('/login aagop04'), 1000);
    startHumanLikeBehavior(bot);
    scheduleFunnyMessage(bot);
  });

  bot.on('message', jsonMsg => {
    const msg = jsonMsg.toString();
    const m = msg.match(/^(.+?) joined the game$/);
    if (m) {
      const user = m[1];
      if (user !== bot.username) {
        const reply = operatorUsernames.includes(user)
          ? respectedMessages[Math.floor(Math.random() * respectedMessages.length)]
          : generalWelcomeMessages[Math.floor(Math.random() * generalWelcomeMessages.length)];
        bot.chat(reply);
      }
    }
  });

  bot.on('kicked', reason => handleBan(index, reason));
  bot.on('end', reason => handleBan(index, reason || 'disconnected'));
  bot.on('error', err => console.log(`Bot ${username} error:`, err));
}

function handleBan(index, reason) {
  const username = getBotName(index);
  console.log(`Bot ${username} kicked/ended: ${reason}`);
  if (/ban/i.test(String(reason))) {
    banned[index] = true;
    console.log(`✅ Marked ${username} as banned.`);
  }
  bots[index]?.quit();
  bots[index] = null;

  if (!switching) {
    switching = true;
    const next = getNextIndex(index);
    currentIndex = next;
    console.log(`Immediate switch to ${getBotName(next)}`);
    createBot(next);
    switching = false;
  }
}

function startHumanLikeBehavior(bot) {
  const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];
  function move() {
    const act = actions[Math.floor(Math.random() * actions.length)];
    bot.setControlState(act, true);
    setTimeout(() => {
      bot.setControlState(act, false);
      setTimeout(move, 1000 + Math.random() * 6000);
    }, 300 + Math.random() * 1000);
  }
  move();
}

function scheduleFunnyMessage(bot) {
  function sendMsg() {
    const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    bot.chat(msg);
    setTimeout(sendMsg, (10 + Math.random() * 5) * 60 * 1000);
  }
  sendMsg();
      }
