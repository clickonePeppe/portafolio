================================================================================
                    PROGETTO: AI CHATBOT CON GROQ API
                    Corso di Javascript - Giuseppe Esposito
================================================================================

DESCRIZIONE
================================================================================
Questo progetto e' un chatbot AI che utilizza l'API gratuita di Groq per 
generare risposte intelligenti in italiano. L'interfaccia e' in stile 
terminale Linux con tema scuro.


STRUTTURA DELLE CARTELLE
================================================================================

SayHi/
│
├── index.html               # File principale dell'applicazione
├── README.txt               # Questo file di documentazione
│
├── css/                     # Cartella degli stili
│   ├── styleLinux.css       # Stile tema Linux Terminal (scuro)
│   ├── styleMacOS8.css      # Stile tema Mac OS 8 (chiaro/retro)
│   └── styleWindows31.css   # Stile tema Windows 3.1 (classico)
│   └── styleAmiga.css       # Stile tema Commodore Amiga
│
└── js/                      # Cartella degli script
    └── script.js            # Logica e connessione API Groq


REQUISITI OBBLIGATORI
================================================================================

1. VISUAL STUDIO CODE
   - Download: https://code.visualstudio.com/

2. ESTENSIONE LIVE SERVER
   - Nome: Live Server
   - Autore: Ritwick Dey
   - Installazione: 
     * Apri VSCode
     * Premi Ctrl+Shift+X
     * Cerca "Live Server"
     * Clicca Installa

3. CHIAVE API GROQ (gratuita)
   - Ottieni qui: https://console.groq.com/keys
   - Procedura:
     * Registrati con email o account Google/GitHub
     * Vai su "API Keys"
     * Clicca "Create API Key"
     * Copia la chiave (inizia con "gsk_")


COME FAR FUNZIONARE IL PROGETTO
================================================================================

PASSO 1 - APRIRE IL PROGETTO
   - Apri Visual Studio Code
   - Apri la cartella del progetto (File > Apri Cartella)

PASSO 2 - AVVIARE LIVE SERVER
   - Fai clic destro sul file "index.html"
   - Seleziona "Open with Live Server"
   - Oppure clicca su "Go Live" in basso a destra

PASSO 3 - INSERIRE LA CHIAVE API
   - All'avvio appare un popup
   - Incolla la tua chiave API Groq
   - Clicca "SALVA E CONTINUA"

PASSO 4 - INIZIARE A CHATTARE
   - Scrivi un messaggio in italiano
   - Premi Invio o clicca "Invia"
   - L'AI risponde usando il modello LLaMA 3.3


COME CAMBIARE LO STILE
================================================================================

Apri il file index.html e modifica questa riga (circa riga 8):

PER STILE LINUX (scuro):
   <link rel="stylesheet" href="css/styleLinux.css">

PER STILE MAC OS 8 (chiaro):
   <link rel="stylesheet" href="css/styleMacOS8.css">

PER STILE WINDOWS 3.1 (classico):
   <link rel="stylesheet" href="css/styleWindows31.css">

PER STILE COMMODORE AMIGA:
   <link rel="stylesheet" href="css/styleAmiga.css">



NOTE SULLE API GROQ
================================================================================

Modello utilizzato: llama-3.3-70b-versatile

Limiti dell'API gratuita:
   - 30 richieste al minuto
   - 14.400 richieste al giorno

Altri modelli gratuiti disponibili:
   - llama-3.1-8b-instant (piu' veloce)
   - mixtral-8x7b-32768 (contesto lungo)
   - gemma2-9b-it (ottimo per italiano)

Per cambiare modello, modifica script.js (circa riga 100):
   model: 'llama-3.3-70b-versatile',


RISOLUZIONE PROBLEMI COMUNI
================================================================================

ERRORE: "Chiave API non valida"
   Soluzione: Verifica di aver copiato correttamente la chiave da console.groq.com

ERRORE: "Errore HTTP: 401"
   Soluzione: La chiave API e' scaduta o non valida, generane una nuova

ERRORE: Live Server non funziona
   Soluzione: 
     - Assicurati che Live Server sia installato
     - Riavvia VSCode
     - Disinstalla e reinstalla l'estensione

ERRORE: Il popup della chiave non appare
   Soluzione: Ricarica la pagina con Ctrl+F5 (svuota cache)

ERRORE: La chat non risponde
   Soluzione: 
     - Controlla la connessione internet
     - Verifica che la chiave API sia valida
     - Apri la console con F12 per vedere errori


PERSONALIZZAZIONE AVANZATA
================================================================================

MODIFICARE I COLORI (styleLinux.css)
   Cerca la sezione ":root" e cambia i valori:
     --text-green: #4afc78;
     --text-cyan: #4afcdc;
     --bg-terminal: #0c0f14;

CAMBIARE IL FONT
   Modifica: --terminal-font: 'Courier New', 'Fira Code', monospace;

MODIFICARE IL MESSAGGIO DI BENVENUTO
   In script.js cerca: addBotMessage("Ciao! Sono un chatbot AI...")

MODIFICARE LA LUNGHEZZA MASSIMA DELLE RISPOSTE
   In script.js cerca: max_tokens: 500, (aumenta o diminuisci)


NOTE IMPORTANTI
================================================================================

- LIVE SERVER E' OBBLIGATORIO
  Le API Groq richiedono HTTPS o localhost. Live Server crea un server locale 
  sicuro. Aprire il file HTML direttamente NON funzionera'.

- PRIVACY
  La chiave API viene salvata SOLO per la sessione corrente.
  Nessun dato viene memorizzato permanentemente.
  Le conversazioni non vengono salvate.

- LAVORO SCOLASTICO
  Questo progetto e' stato realizzato per il corso di Javascript.


SCORCIATOIE DA TASTIERA
================================================================================

INVIO                 -> Invia messaggio
Shift + INVIO         -> A capo nel textarea
Ctrl + F5             -> Ricarica pagina svuotando cache
F12                   -> Apri console sviluppatore


LINK UTILI
================================================================================

Groq Console (API Keys):     https://console.groq.com/keys
Documentazione API Groq:     https://console.groq.com/docs/quickstart
Live Server VSCode:          https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
Visual Studio Code:          https://code.visualstudio.com/


CREDITI
================================================================================

Corso: Javascript - Giuseppe Esposito
API: Groq Cloud (https://groq.com)
Anno: 2026
Sviluppato con: HTML5, CSS3, JavaScript ES6+


================================================================================
                          BUON LAVORO E BUONA CHAT!
================================================================================