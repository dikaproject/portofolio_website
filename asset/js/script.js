const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const API_KEY = "sk-V0BCtDOuDu9ZKbca5Wz9ZljmVj9hDARnCpPMB0SuyB5erFE9";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Opps, Fitur sedang tahap pengembangan. Untuk lebih lanjut silahkan hubungi admin.";
        const adminWhatsAppLink = "https://wa.me/6281227848422"; // Replace with the admin's WhatsApp number
        const adminContactLink = document.createElement("a");
        adminContactLink.href = adminWhatsAppLink;
        adminContactLink.textContent = "Hubungi Admin";
        chatbox.appendChild(adminContactLink);
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Animated text
const txts=document.querySelector(".animate-text").children,
        txtsLen=txts.length;
    let index=0;
   const textInTimer=3000,
         textOutTimer=2800;

  function animateText() {
     for(let i=0; i<txtsLen; i++){
       txts[i].classList.remove("text-in","text-out");  
     }
     txts[index].classList.add("text-in");

     setTimeout(function(){
         txts[index].classList.add("text-out");              
     },textOutTimer)

     setTimeout(function(){

       if(index == txtsLen-1){
           index=0;
         }
        else{
            index++;
          }
         animateText();
     },textInTimer); 
  }
  
  window.onload=animateText;

// AOS 
AOS.init();

// Navbar blur
$(document).ready(function () {
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 100) {
        $('.navbar').css('backdrop-filter', 'blur(50px)');
      } else {
        $('.navbar').css('backdrop-filter', 'blur(0)');
      }
    });
  });