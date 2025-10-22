// URL de ton webhook n8n (production)
const N8N_WEBHOOK_URL = "https://n8n.srv846378.hstgr.cloud/webhook/77a6a624-93e6-463e-a1f4-5185239570e2";

// Sélection des éléments du DOM
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Fonction d'affichage d'un message
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Envoi du message vers n8n
async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  try {
    console.log("Envoi vers N8N :", N8N_WEBHOOK_URL, { message });

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }) // <-- point clé : format JSON correct
    });

    // Lecture texte brut pour éviter les erreurs de parsing
    const text = await response.text();
    console.log("Réponse brute N8N :", text);

    // Essai de conversion en JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { reply: text };
    }

    addMessage(data.reply || "Pas de réponse reçue", "bot");

  } catch (error) {
    console.error("Erreur de connexion :", error);
    addMessage("Erreur de connexion au serveur.", "bot");
  }
}

// Événements sur bouton et touche Entrée
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
