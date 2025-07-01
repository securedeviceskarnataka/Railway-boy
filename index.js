const mineflayer = require('mineflayer');

function createBot() {
const bot = mineflayer.createBot({
host: 'sudana_smp.aternos.me', // SERVER IP
username: 'SUDANA_24X7',     // BOT NAME
port: 53659,                   // SERVER PORT
version: '1.16.5',
});

bot.on('spawn', () => {
bot.chat('/register aagop04');
});

bot.on("move", function () {
bot.setControlState("jump", true);
setTimeout(() => {
bot.setControlState("jump", false);
}, 1000);

setTimeout(() => {  
  bot.setControlState("forward", true);  
  setTimeout(() => {  
    bot.setControlState("forward", false);  
  }, 500);  
}, 1000);  

setTimeout(() => {  
  bot.setControlState("back", true);  
  setTimeout(() => {  
    bot.setControlState("back", false);  
  }, 500);  
}, 2000);  

setTimeout(() => {  
  bot.setControlState("right", true);  
  setTimeout(() => {  
    bot.setControlState("right", false);  
  }, 2000);  
}, 500);  

setTimeout(() => {  
  bot.setControlState("left", true);  
  setTimeout(() => {  
    bot.setControlState("left", false);  
  }, 2000);  
}, 500);

});

bot.on('kicked', console.log);
bot.on('error', console.log);
bot.on('end', createBot);

// Auto-disconnect and reconnect every 3 hours
setInterval(() => {
console.log("Reconnecting bot to avoid Aternos ban...");
bot.quit();

setTimeout(() => {  
  createBot();  
}, 50000 ); // 50sec wait before reconnect

}, 3 * 60 * 60 * 1000); // 3 hours
}

createBot();
