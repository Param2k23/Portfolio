# Pulse Chatbot Setup Guide

## What's New
Your portfolio now includes **Pulse**, an AI chatbot powered by Google Gemini that answers questions about your experience, skills, and projects directly from your resume.

## Setup Steps

### 1. Get Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key" → "Create API key in new project"
3. Copy the generated API key

### 2. Create `.env` File
In the `c:\VS\Portfolio\` directory, create a `.env` file:
```env
GEMINI_API_KEY=paste_your_api_key_here
PORT=5000
```

### 3. Install Dependencies
Run this in the `c:\VS\Portfolio\` directory:
```bash
npm install
```

This will install the Express backend and Google Generative AI SDK.

### 4. Start the Portfolio
Run both frontend and backend servers:
```bash
npm run dev
```

This will start:
- **React frontend** on [localhost:3000](http://localhost:3000) (automatically opens)
- **Express backend** on [localhost:5000](http://localhost:5000)

### 5. Test the Chatbot
- Look for the orange **Pulse** button in the bottom-right corner
- Click to open the chat widget
- Try asking: "What are your main skills?" or "Tell me about your experience at Arch MI"
- Pulse will respond based on your resume context

## How It Works
- **Frontend:** React component with floating widget UI (bottom-right of page)
- **Backend:** Express server proxies messages to Google Gemini API
- **Context:** Resume data (education, experience, skills, projects) embedded in server
- **Security:** API key stored server-side (not exposed to browser)

## Troubleshooting

### "Failed to connect to backend"
- Ensure `npm run dev` is running (starts both servers)
- Check that port 5000 is not in use
- Verify `.env` file exists with valid API key

### "Failed to get response"
- Check that `GEMINI_API_KEY` in `.env` is valid
- Look at terminal output for API errors
- Ensure you have Google AI Studio API quota available (free tier)

### Port Already in Use
- Frontend: Change via `PORT=3001 npm start`
- Backend: Change `PORT=5001` in `.env`, update frontend API call to match

## File Structure
- `server.js` - Express backend with Gemini integration
- `src/components/PulseChatbot.js` - React chatbot widget component
- `.env` - Environment variables (create this with your API key)
- `.env.example` - Template (reference only)

## Tips
- **Customize the bot:** Edit resume context in `server.js` to change what Pulse knows about you
- **Style the widget:** Modify colors/styling in `PulseChatbot.js` component
- **Multi-turn conversation:** Pulse maintains chat history, so follow-up questions work naturally
