import fetch from 'node-fetch';

const testChatbot = async () => {
  const apiUrl = 'http://localhost:3000/api/chat';
  const userMessage = '안녕, ChatGPT냥! 오늘 기분이 어떠냐냥?';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chatbot Response:', data.response);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testChatbot();
