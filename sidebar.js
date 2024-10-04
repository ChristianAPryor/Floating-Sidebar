// Global variables for Web Speech API and recognition
let recognition;
let isRecognizing = false;
let scriptBuffer = 'teststring';
document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const transcriptionOutput = document.getElementById('transcription-output');
  const closeBtn = document.getElementById('close-sidebar');
  const copyBtn = document.getElementById('copy-btn');
  const insertBtn = document.getElementById('insert-btn');

  // Initialize Speech Recognition
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      scriptBuffer += finalTranscript;
      transcriptionOutput.innerHTML += `<p>${finalTranscript}</p>`;
      transcriptionOutput.scrollTop = transcriptionOutput.scrollHeight;  // Scroll to bottom
    };

    recognition.onerror = function (event) {
      console.error('Speech recognition error:', event);
    };
  } else {
    console.log('Speech recognition not supported in this browser.');

  }

  // Start Transcription
  startBtn.addEventListener('click', function () {
    if (!isRecognizing && recognition) {
      recognition.start();
      isRecognizing = true;
      startBtn.style.display = 'none';
      stopBtn.style.display = 'inline-block';
    }
  });

  // Stop Transcription
  stopBtn.addEventListener('click', function () {
    if (isRecognizing && recognition) {
      recognition.stop();
      isRecognizing = false;
      startBtn.style.display = 'inline-block';
      stopBtn.style.display = 'none';
    }
  });

  const copyTextToClipbard = (condition) => {
    navigator.clipboard.writeText(scriptBuffer).then(() => {
      console.log("Text copied to clipboard!");
      if (condition === 'insert') {
        chatInput.value = scriptBuffer;
        sendBtn.click();
        scriptBuffer = '';
      }
    }).catch(err => {
      console.error("Error copying text: ", err);
    });
  }
  copyBtn.addEventListener('click', function () {
    copyTextToClipbard('copy');
  });

  insertBtn.addEventListener('click', function () {
    copyTextToClipbard('insert');
  });

  // ChatGPT functionality
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const chatOutput = document.getElementById('chat-output');

  sendBtn.addEventListener('click', async function () {
    console.log("jongtestes");
    const userInput = chatInput.value.trim();
    if (userInput === '') return;

    // Display user message in chat
    chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    chatInput.value = '';

    // Fetch response from OpenAI API (replace with your API key)
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: userInput,
          max_tokens: 150
        })
      });

      const data = await response.json();
      const reply = data.choices[0].text.trim();

      // Display GPT-3 response
      chatOutput.innerHTML += `<p><strong>GPT:</strong> ${reply}</p>`;
      chatOutput.scrollTop = chatOutput.scrollHeight;  // Scroll to bottom
    } catch (error) {
      console.error('Error with ChatGPT API:', error);
      chatOutput.innerHTML += `<p><strong>Error:</strong> Something went wrong. Please try again later.</p>`;
    }
  });


  // Add event listener to the close button
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      // Send a message to the parent window to close the sidebar
      parent.postMessage({ action: 'close-sidebar' }, '*');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {

});