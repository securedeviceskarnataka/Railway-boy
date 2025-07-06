const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const { Vec3 } = require('vec3');

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
  "Zombie: *sees Akshath* — ‘Nah, I’m out.’",
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
  "Redstone ka engineer banna tha… ab bell bhi nahi bajti!",
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

// === BOT CONFIG ===
const serverHost = 'sudana_smp.aternos.me';
const serverPort = 30926;
const ORIGINAL_USERNAME = 'exe_akshath';
let currentUsername = ORIGINAL_USERNAME;
let reconnecting = false;
let wasBaseBanned = false;

function createBot(username) {
  const bot = mineflayer.createBot({
    host: sudana_smp.aternos.me,
    port: 53659,
    username: SUDANA_boii,
    auth: 'offline',
    version: false
  });

  bot.loadPlugin(pathfinder);

  bot.on('login', () => {
    console.log(`[Bot] Logged in as ${username}`);
    wasBaseBanned = false;
  });

  bot.on('end', () => {
    if (!reconnecting) {
      reconnecting = true;
      const delay = 30000 + Math.floor(Math.random() * 60000);
      console.log(`[Bot] Disconnected. Reconnecting in ${delay / 1000}s...`);

      setTimeout(() => {
        reconnecting = false;
        if (wasBaseBanned) {
          currentUsername = `${ORIGINAL_USERNAME}${Math.floor(Math.random() * 10000)}`;
        }
        createBot(currentUsername);
      }, delay);
    }
  });

  bot.on('kicked', reason => {
    console.log(`[Bot] Kicked: ${reason}`);
    if (reason.toLowerCase().includes('ban') || reason.toLowerCase().includes('not white-listed')) {
      wasBaseBanned = true;
    }
  });

  bot.on('error', err => {
    console.log(`[Bot] Error: ${err.message}`);
  });

  // === CUSTOM WELCOME MESSAGES ===
  bot.on('playerJoined', (player) => {
    if (player.username === bot.username) return;

    let message;
    if (player.username.toLowerCase() === 'a1111318' || player.username.toLowerCase() === '.a1111318') {
      message = respectedMessages[Math.floor(Math.random() * respectedMessages.length)];
    } else {
      message = generalWelcomeMessages[Math.floor(Math.random() * generalWelcomeMessages.length)];
    }

    setTimeout(() => {
      bot.chat(message);
    }, 3000 + Math.random() * 3000);
  });

  // === FUNNY RANDOM MESSAGES ===
  setInterval(() => {
    const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    bot.chat(msg);
  }, 30000 + Math.random() * 30000);

  // === RANDOM HUMAN-LIKE ACTIONS ===
  const actions = ['jump', 'sneak', 'move_left', 'move_right', 'look_random'];
  function doRandomAction() {
    const action = actions[Math.floor(Math.random() * actions.length)];
    switch (action) {
      case 'jump':
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500 + Math.random() * 500);
        break;
      case 'sneak':
        bot.setControlState('sneak', true);
        setTimeout(() => bot.setControlState('sneak', false), 1000 + Math.random() * 1000);
        break;
      case 'move_left':
        bot.setControlState('left', true);
        setTimeout(() => bot.setControlState('left', false), 800 + Math.random() * 1200);
        break;
      case 'move_right':
        bot.setControlState('right', true);
        setTimeout(() => bot.setControlState('right', false), 800 + Math.random() * 1200);
        break;
      case 'look_random':
        bot.look(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, true);
        break;
    }
  }
  setInterval(doRandomAction, 7000 + Math.random() * 8000);
}

createBot(currentUsername);
