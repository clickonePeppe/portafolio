// Lavoro per il corso di Javascript di Giuseppe Esposito
// 2026

let GROQ_API_KEY = "";
let isLoading = false;

// Elementi DOM
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const loadingStatus = document.getElementById('loadingStatus');

// Funzione per chiedere la chiave API
function askForApiKey() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'modal-terminal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content-terminal';
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>🔐 GROQ API CONFIGURATION</h2>
            </div>
            <div class="modal-body">
                <div class="terminal-text">
                    ⚡ <strong>ACCESSO RICHIESTO</strong><br>
                    Per utilizzare questo chatbot, è necessario inserire la tua API Key di Groq.<br>
                    <br>
                    📦 <strong>Ottieni una chiave gratuita:</strong><br>
                    <a href="https://console.groq.com/keys" target="_blank">console.groq.com/keys</a>
                </div>
                
                <div class="input-group-terminal">
                    <label>GROQ_API_KEY</label>
                    <input type="password" id="apiKeyInput" class="terminal-input" placeholder="gsk_your_api_key_here..." autocomplete="off">
                </div>
                
                <div class="terminal-note">
                    💡 La chiave verrà salvata solo per questa sessione
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-terminal btn-terminal-secondary" id="cancelBtn">✖ ANNULLA</button>
                <button class="btn-terminal btn-terminal-primary" id="saveApiKeyBtn">✓ SALVA & CONTINUA</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const saveBtn = modalContent.querySelector('#saveApiKeyBtn');
        const cancelBtn = modalContent.querySelector('#cancelBtn');
        const apiKeyInput = modalContent.querySelector('#apiKeyInput');
        
        saveBtn.onclick = () => {
            const apiKey = apiKeyInput.value.trim();
            if (apiKey) {
                GROQ_API_KEY = apiKey;
                modal.remove();
                resolve(true);
                initChat();
            } else {
                apiKeyInput.style.borderColor = '#fc4a4a';
                setTimeout(() => {
                    apiKeyInput.style.borderColor = '';
                }, 2000);
            }
        };
        
        cancelBtn.onclick = () => {
            if(confirm('Vuoi davvero uscire? La chat non funzionerà senza una chiave API valida.')) {
                modal.remove();
                loadingStatus.textContent = "⚠️ API Key mancante!";
                loadingStatus.style.color = "#fc4a4a";
                addBotMessage("⚠️ Per utilizzare questo chatbot, devi fornire una chiave API Groq valida. Ricarica la pagina per inserirla.");
                resolve(false);
            }
        };
        
        apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveBtn.click();
        });
        
        apiKeyInput.focus();
    });
}

// Funzione per inizializzare la chat dopo aver ottenuto la chiave
function initChat() {
    loadingStatus.textContent = "✅ API Groq pronta!";
    loadingStatus.style.color = "#2f855a";
    addBotMessage("🇮🇹 Ciao! Sono un chatbot AI che parla italiano! Fammi qualsiasi domanda!");
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `<div class="avatar">👤</div><div class="text">${escapeHtml(text)}</div>`;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `<div class="avatar">🤖</div><div class="text">${escapeHtml(text)}</div>`;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    let typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) return;
    
    typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `<div class="avatar">🤖</div><div class="text">✍️ Sta scrivendo...</div>`;
    chatBox.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Genera risposta usando Groq API
async function generateAIResponse(userMessage) {
    if (!GROQ_API_KEY) {
        return "⚠️ Chiave API mancante. Ricarica la pagina per inserirla.";
    }
    
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'Sei un assistente AI amichevole. Rispondi in italiano in modo chiaro e completo.'
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                max_tokens: 500,
                temperature: 0.7,
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Errore API:', errorData);
            
            if (response.status === 401) {
                throw new Error('Chiave API non valida. Verifica di averla copiata correttamente.');
            } else {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
        }
        
        const data = await response.json();
        const reply = data.choices[0].message.content;
        return reply;
        
    } catch (error) {
        console.error("Errore:", error);
        return `⚠️ ${error.message}`;
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    if (isLoading) {
        addBotMessage("Attendi, sto già rispondendo...");
        return;
    }
    
    isLoading = true;
    sendBtn.disabled = true;
    userInput.disabled = true;
    
    addUserMessage(message);
    userInput.value = '';
    
    showTypingIndicator();
    loadingStatus.textContent = "💭 Generando risposta...";
    
    const botReply = await generateAIResponse(message);
    
    removeTypingIndicator();
    addBotMessage(botReply);
    
    loadingStatus.textContent = "✅ Pronto!";
    isLoading = false;
    sendBtn.disabled = false;
    userInput.disabled = false;
    userInput.focus();
}

function clearChat() {
    chatBox.innerHTML = '';
    addBotMessage("💬 Chat cancellata! Come posso aiutarti?");
    loadingStatus.textContent = "✅ Chat pulita!";
}

// Avvio dell'applicazione
askForApiKey().then((hasKey) => {
    if (hasKey) {
        sendBtn.addEventListener('click', sendMessage);
        clearBtn.addEventListener('click', clearChat);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});