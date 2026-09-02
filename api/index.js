const Express = require("express");
const app = Express();

app.use(Express.json());

const BOT_TOKEN = process.env.BOT_TOKEN || "8675993475:AAHSrIFZrfSXVHVA7LXDdJX1R-enDs7Qh1k";
const CHANNEL_LINK = "https://t.me/+IRoC27Xdw_k4ODA0"; // Apna link yahan badlein

// Telegram Message Sending Helper Function
async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });
    const data = await response.json();
    console.log("Telegram Response:", data);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

// Vercel Webhook Endpoint
app.post("/api/index", async (req, res) => {
  const update = req.body;

  // 1. Handle /start command
  if (update.message && update.message.text === "/start") {
    const chatId = update.message.chat.id;
    const text = `Welcome! Join our official channel here:\n${CHANNEL_LINK}`;
    await sendMessage(chatId, text);
  }

  // 2. Handle Chat Join Request
  if (update.chat_join_request) {
    const userId = update.chat_join_request.from.id;
    const text = `Welcome! Join our official channel here:\n${CHANNEL_LINK}`;
    await sendMessage(userId, text);
  }

  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Bot status: Active");
});

module.exports = app;
