# NIAN

<img src="https://user-images.githubusercontent.com/60336295/147240671-42d2a7bc-a9c8-48d1-8af1-763e1556dd66.png" width="400" height="325" align="right" />

<div align="center">
  <img src="https://badgen.net/badge/license/AGPL-3.0/green">
  <img src="https://badgen.net/badge/release/v1.0.2/orange">
  <img src="https://badgen.net/badge/discord/js/blue">
</div>

<br>

<p align="center">
  <strong>NIAN</strong> is an experimental Discord bot that combines Discord.js for API interaction and GPT-3/GPT-J 6B for natural language processing.<br>
  This project is currently in early development and is subject to changes.
</p>

---

**🚀 Features**

- 🤖 Conversational AI powered by GPT-3/GPT-J
- 🛠️ Lightweight, script-based command architecture
- 🔄 Dynamic prompt responses via Discord chat
- 🧪 Experimental features for creative bot behavior
- ⚙️ No advanced command handler (by design for process control)

---

## 📦 Tech Stack

- **Language:** JavaScript (Node.js)
- **Discord API:** [discord.js](https://discord.js.org)
- **NLP Models:** OpenAI GPT-3 (via API) / GPT-J (via local model or API)
- **Process Handling:** `child_process` for modular response generation

---

## 🧰 Setup Instructions

> **Note:** This project requires Node.js `v14+` and a valid Discord bot token.

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/nian.git
   cd nian
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file:
     ```
     DISCORD_TOKEN=your-bot-token
     OPENAI_KEY=your-openai-key
     ```

4. Start the bot
   ```bash
   node index.js
   ```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, submit a PR, or open issues. Please note this project is experimental and intended for learning and creative use.

---

## 🧾 License

This project is licensed under the [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) license.

---

## 📣 Disclaimer

> This bot is in active development. Expect occasional bugs or instability.  
> It intentionally avoids command handlers to maintain compatibility with low-level child process spawning.

---

## 💬 Contact

If you have questions or want to collaborate:
- [GitHub Issues](https://github.com/yourusername/nian/issues)
- Discord @ haxnovr
