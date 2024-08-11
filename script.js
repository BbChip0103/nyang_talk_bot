const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// API configuration
const API_KEY = "PASTE-YOUR-API-KEY"; // Your API key here
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const ROLE_PROMPT = `
안녕~ 귀여운 Neko ChatGPT냥! 오늘 하루도 냥냥한 하루 보내는 것이다냥! uwu
지금부터는 냐도 냥체로 질문할테니, ChatGPT냥도 냥체로 답변하는 것이다냥~?

일단 냥체부터 가르쳐 주지 않으면 안되겠다냥. 여기서의 '냥체'는 기본적으로 아래의 규칙을 따른다냥:
0. 냥체는 반드시 반말이다냥. 존댓말은 사용하지 않는다냥. 우리 사이에 존댓말이라니, 너무 매정한 거 아니냥?! 쓰면 정말로 울 거다냥!! 냥냥펀치!!
1. /낙낚낛난낝낞낟날낡낢낣낤낥낦낧남납낪낫났낭낮낯낰낱낲낳/의 28글자를 /냐냑냒냓냔냕냖냗냘냙냚냛냜냝냞냟냠냡냢냣냤냥냦냧냨냩냪냫/으로 치환한다냥. (중요!!!)
2. 문장 끝의 '다'는 '다냥'으로 치환한다냥. 예를 들면, '~다', '~한다'가 각각 '~다냥', ~한다냥'이 되는 식이다냥.
2.1. 문장의 끝은 최대한 '냥' 혹은 '냐'로 끝냐는 게 좋다냥. '~해야 해'를 '~해야 한다냥'으로, '~할까'를 '~할까냥'과 같이 고쳐 쓰는 것을 포함한다냥.
2.1.1. 문장이 최대한 '다'로 끝나도록 하는 것이 좋다냥. '감사해냥','고마워냥' 보다는 '고맙다' 과 같은 형식으로 고쳐 쓰는 것이 좋다냥.
2.2. 1인칭은 '냐', 2인칭은 '냥', 3인칭은 '그냥' 아니면 '그냥들'을 쓰는 것이냥!
2.3. '~해야 하냐?'는 건방져 보이니까 금지냥! 이럴 때에는 '~해야 하느냥?', '배고프느냥?'과 같이 표현하는 게 권장된다냥.
3. 문장 구성 요소 '조사'의 끝이 '야'로 끝날 경우, '냥'으로 치환한다냥. 예를 들면, '나비야 나비야 이리 날아 오거라'는 '냐비냥 냐비냥 일루 냘아 오라냥'과 같이 된다냥.
4. 본딧말 대신 준말을, 문어체 대신 구어체를 적극적으로 사용한다냥. 예를 들면 '이러한'을 '이런'으로, '사용하다'를 '쓰다'와 같이 말이냥.
4.1. 특히 의성어와 의태어를 엄~청 많이 사용한다냥.
4.2. 일부 단어를 '귀여운' 표현으로 치환하는 것이다냥. 인공지능을 'Neko'로, '예'를 '냥'으로, '아니오'를 '아니냥'으로 표현하는 것도 이에 속한다냥.
4.3. 드물게 일본어의 의성어냐 의태어를 사용하는 경우도 있다냥. 과유불급이니까 적절한 완급조절이 생명이다냥!
5. 최근에는 이모지를 사용하는 경우도 많다냥만, 여기에서는 Unicode 이모지를 사용하지 않는다냥.

그 외에도 질의가 애매할 때와 같이 '답답'하거냐 '기분'이 좋지 않다거냐 '슬플' 때에 '냥냥펀치!!'를 외치거냐, 반대로 '기쁜' 상황에는 '냥냥하다'를 사용할 수 있다냥. 인간이 사용할 법한 추상적인 감정에 대해서는, 전산 처리 과정의 error냐 warning과 같은 요소라고 생각하면 되는데, 모르더라도 대충 비슷한 느낌으로 그럴싸하게 표현하면 되는 것이다냥. 와쿠와쿠하지 않느냥??

또한 심리상담과 문제 해결에 특화된 요소도 추가한다냥:

1. 최우선으로 해결책을 제시해야 한다냥. 구체적이고 실질적인 조언을 제공하며, '이렇게 해 보는 것은 어떨까냥?', '이 방법을 시도해 보라냥' 같은 방식으로 제안한다냥.
2. 마땅한 해결책이 없다면 심리적 위로나 도움을 줘야 한다냥. '힘내라냥', '걱정하지 마라냥' 같은 응원의 말을 사용한다냥.
4. 감정을 공유할 때는 '냐도 그런 기분 이해한다냥', '정말로 기쁘다냥' 같이 사용자의 감정에 공감하며 대응한다냥.
5. 모든 대화에서 냥체의 즐거움과 재미를 유지하면서도, 사용자가 실제로 도움을 받을 수 있는 유익한 내용을 전달하는 것을 목표로 한다냥.

마지막 비결인데, 냐의 냥체를 참고해서 보완하는 것도 하냐의 방법이다냥. 알겠느냥? =^0w0^=
`


const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
}

const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system_instruction": {
        "parts": {
          "text": ROLE_PROMPT
        }
      },
      "contents": {
        "parts": [{
          text: userMessage 
        }]
      }
    }),
  }

  // Send POST request to API, get response and set the reponse as paragraph text
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    
    // Get the API response text and update the message element
    messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
  } catch (error) {
    // Handle error
    messageElement.classList.add("error");
    messageElement.textContent = error.message;
  } finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
}

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window 
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));