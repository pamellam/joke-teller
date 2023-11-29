const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  // VoiceRRS Speech Parameters
  VoiceRSS.speech({
    key: '0bb0a7e7ee1b46718b9cfd760a3c2701',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';

  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    // Catch errors here
    console.log('error', error);
  }
}


// Event Listeners
button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton)
