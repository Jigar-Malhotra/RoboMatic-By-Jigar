const url = "https://robomatic-ai.p.rapidapi.com/api";
const send = document.querySelector("#send");
let ihtml = "";
let loading = document.querySelector("#Loading");
const clearchat = document.querySelector("#clearChat");
let speech = new SpeechSynthesisUtterance();
let speak = true;
const voice = document.querySelector("#voice")

voice.addEventListener("click", () => {
	if(speak == true){
		speak = false;
		voice.innerHTML = "Turn On Voice"
	}
	else{
		speak=true;
		voice.innerHTML = "Turn Off Voice"
	}
	
})

function give(query) {
  ihtml += `<div class="card user">
	<div class="card-body">
${query}	</div>
  </div>`;

  document.querySelector("#chats").innerHTML = ihtml;
}

async function bring(query) {
  loading.classList.remove("hide");

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "8b9bcdd25bmshead520699e42ec4p1266cbjsn8405df2aa75a",
      "X-RapidAPI-Host": "robomatic-ai.p.rapidapi.com",
    },
    body: new URLSearchParams({
      in: `${query}`,
      op: "in",
      cbot: "1",
      SessionID: "RapidAPI1",
      cbid: "1",
      key: "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP",
      ChatSource: "RapidAPI",
      duration: "1",
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const x = JSON.parse(result);

    ihtml += ` <div class="bot">
	<div class="card botchat">
	  <div class="card-body">
${x.out}	  </div>
	</div></div>`;

    if (speak == true) {
      speech.text = x.out;
      window.speechSynthesis.speak(speech);
    }
    // console.log(result);
  } catch (error) {
    console.error(error);
  }

  document.querySelector("#chats").innerHTML = ihtml;
  loading.classList.add("hide");
}

send.addEventListener("click", () => {
  let query = document.querySelector("#query");

  give(query.value);
  // console.log(query.value)
  bring(query.value);
});

clearchat.addEventListener("click", () => {
  ihtml = "";
  document.querySelector("#chats").innerHTML = ihtml;
});
