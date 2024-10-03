let transcript = []; // Initialize as an empty array if it's supposed to be one
let recognition;
const transcriptDiv = document.getElementById('transcript');

document.getElementById('start').addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    transcriptDiv.innerText = transcript; // Display transcription
  };

  recognition.start();
});

document.getElementById('stop').addEventListener('click', () => {
  if (recognition) {
    recognition.stop();
  }
});
