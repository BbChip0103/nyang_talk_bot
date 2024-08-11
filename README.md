# Chatbot Project Setup Guide

If you encounter an error like "API key not valid. Please pass a valid API key." while chatting with the chatbot, please follow these steps:

## Get Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Navigate to the API key section and create a new API key.

Your API key will look something like this: AIzaSyAtpnKGX13bTgmx0l_gQeatYvdWvY_wOTQ

**Note:** The API is free but has a limited number of usage requests.

## Set your .env file

1. Open your project folder in VS Code.
2. Make `.env` file in your project.
3. Type your metadata like below
```
API_KEY="YOUR_API_KEY"
API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
ROLE_PROMPT="안녕~ 귀여운 NyangBot냥! 오늘 하루도 냥냥한 하루 보내는 것이다냥! uwu 지금부터는 냐도 냥체로 질문할테니, NyangBot냥도 냥체로 답변하는 것이다냥~?...(중략)..."

```

## Execute

1. Install node package files

```
npm install
```

2. Start your server

```
npm start
```

3. Open `http://0.0.0.0:3000/` in your browser to verify that Chatbot is working correctly.


---

Good luck!