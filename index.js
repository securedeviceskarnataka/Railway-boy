const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is running"));
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'sudanasmp.aternos.me',
    port: 27059,
    username: 'SUDANA_boii',
    version: '1.16.5',
  });

  const operatorUsernames = ['.A1111318', 'A1111318'];
  const respectedMessages = [
    "Bow down mortals, the Operator has arrived!",
    "A salute to our lord and savior Akshath!",
    "The server just leveled up. Welcome, Operator Akshath!",
    "A wild King Akshath appeared with god-tier vibes!",
    "shhh maintain silence ! Akshath is here !!"
  ];

  const generalWelcomeMessages = [
    "Ey yo! Another noob joins the chaos!",
    "Hide your diamonds, someone's here! joining the server.",
    "Did someone order a creeper magnet?welcome",
    "Server's now 1% cooler. Welcome!",
    "Hope you brought snacks, it's wild here!",
    "And they said legends never join. Welp!",
    "Yo! Another Steve tryna beat the Ender Dragon?",
    "Quick! Someone give them dirt armor!",
    "New challenger approaches... probably laggy tho.",
    "Please welcome the person who might rage quit in 10 mins!",
    "Brace yourself! New player detected!",
    "Welcome! Don’t dig straight down... or do, lol.",
    "Hello there! Don’t worry, we only bite sometimes.",
    "Nice skin. Just kidding, default gang forever.",
    "You spawn, you punch tree, you survive. Good luck!",
    "Welcome! You’re now in the best (worst) server ever!",
    "Ah, fresh meat! JK... or am I?",
    "Look busy! Someone just joined!",
    "The server got 5% more unpredictable. Welcome!",
    "Remember: The creepers are faster than your WiFi!"
  ];

  const funnyMessages = [
    "Anyone got food? I ate my keyboard.",
    "I tried hugging a creeper... didn’t end well.",
    "Day 47: Still pretending to be human.",
    "Cows give milk, I give lag.",
    "The floor is lava! Just kidding. Or not?",
    "Why punch trees when you can punch your luck?",
    "Mining straight down for science!",
    "Lag is just my way of saying hi!",
    "I once won a fight... in creative mode.",
    "Is water wet or just lazy ice?",
    "Bees are just angry flying potatoes.",
    "Who needs diamonds when you have friendship? lol gimme diamonds.",
    "Oops, I crafted 64 torches again.",
    "I’d help, but I’m morally AFK.",
    "Let’s all pretend we know what we’re doing.",
    "Breaking news: Bot found to be cooler than players.",
    "Currently running on 3 brain cells and redstone.",
    "Built a dirt house, feeling rich.",
    "Don’t worry, I only grief emotionally.",
    "Powered by memes and potatoes.",
    "i saw herobrine ahh its real !!"
  
 ];

  bot.on('spawn', () => {
    bot.chat('/register aagop04');
    setTimeout(() => bot.chat('/login aagop04'), 1000);

    startHumanLikeBehavior();
    scheduleRandomMessage();
    scheduleRandomDisconnect();
  });

  // ✅ Chat-based join detection — greets EVERY time
  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString();
    const joinMatch = message.match(/^(.+?) joined the game$/);

    if (joinMatch) {
      const username = joinMatch[1];
      if (username === bot.username) return;

      const isOperator = operatorUsernames.includes(username);
      const msg = isOperator
        ? respectedMessages[Math.floor(Math.random() * respectedMessages.length)]
        : generalWelcomeMessages[Math.floor(Math.random() * generalWelcomeMessages.length)];

      bot.chat(msg);
    }
  });

  function startHumanLikeBehavior() {
    setInterval(() => {
      const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];
      const action = actions[Math.floor(Math.random() * actions.length)];
      bot.setControlState(action, true);
      setTimeout(() => bot.setControlState(action, false), 500 + Math.random() * 1500);
      bot.look(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
    }, 7000);
  }

  function scheduleRandomMessage() {
    const delay = Math.floor(Math.random() * (6 - 3 + 1) + 3) * 60 * 1000;
    setTimeout(() => {
      const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      bot.chat(msg);
      scheduleRandomMessage();
    }, delay);
  }

  function scheduleRandomDisconnect() {
    const minutes = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
    console.log(`Next disconnect scheduled in ${minutes} minutes.`);
    setTimeout(() => {
      console.log("Random disconnecting...");
      bot.quit();
    }, minutes * 60 * 1000);
  }

  bot.on('kicked', console.log);
  bot.on('error', console.log);
  bot.on('end', () => {
    console.log("Bot disconnected. Reconnecting in 50 seconds...");
    setTimeout(createBot, 30000);
  });
}

createBot();
