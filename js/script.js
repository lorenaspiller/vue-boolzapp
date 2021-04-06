/*
MILESTONE 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
dall’interlocutore (bianco) assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
nome e immagine di ogni contatto
MILESTONE 2
● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
messaggi relativi al contatto attivo all’interno del pannello della conversazione
● Click sul contatto mostra la conversazione del contatto cliccato
MILESTONE 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.
MILESTONE 4
● Ricerca nei contatti tramite input
*/

var app = new Vue({
  el: '#main-container',
  data: {
    newMessage: "",
    contactIndex: 0,
    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
    searchContact: "",
    contacts: [
        {
            name: 'Michele',
            avatar: '_1',
            visible: true,
            messages: [{
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            messages: [{
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            messages: [{
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Luisa',
            avatar: '_6',
            visible: true,
            messages: [{
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ],
        },
    ],

  },
  methods: {
    addMessage: function() {
      if (this.newMessage != "") {
        this.dynamicMessage(this.newMessage, 'sent');
        setTimeout(() => {
          this.dynamicMessage('Ok!', 'received');
        }, 1000);
        this.newMessage="";
      }
    },
    dynamicMessage: function(messageValue, statusValue) {
      this.filteredContacts[this.contactIndex].messages.push({
        date: this.date,
        message: messageValue,
        status: statusValue
      });
    },
    ////versione con forEach() - devi aggiungere @input="filteredContacts" all'interno dell'input del search nel DOM, per rimanere in ascolto.
    //
    // filteredContacts: function() {
    //   this.contacts.forEach((contact) => {
    //     if (this.searchContact != "") {
    //       if (contact.name.toLowerCase().includes(this.searchContact.toLowerCase())) {
    //         contact.visible = true;
    //       } else {
    //         contact.visible = false;
    //       }
    //     } else {
    //       contact.visible = true;
    //     }
    //   });
    // }
  },

  /* versione con filter - devo sostituire contacts con filteredContacts perchè filter mi restituisce un array e devo ciclare sul nuovo array filtrato - uso filter nei computed perchè restituisco un nuovo array da uno già esistente (contacts) - cambierò:

  ● il ciclo del <li> dei contatti in v-for="(contact, index) in filteredContacts",
  ● l'indirizzo dell'immagine del contatto nella chat :src="'img/avatar' + filteredContacts[contactIndex].avatar + '.jpg'",
  ● il p con il nome del contatto {{filteredContacts[contactIndex].name}},
  ● il ciclo nel <li> che stampa il messaggio v-for="message in filteredContacts[contactIndex].messages"
  ● nei methods, la funzione dynamicMessage() diventerà:
  dynamicMessage: function(messageValue, statusValue) {
    this.filteredContacts[this.contactIndex].messages.push({
      date: this.date,
      message: messageValue,
      status: statusValue
    });
  */


  computed: {
    filteredContacts: function() {
      return this.contacts.filter((contact) => {
        return contact.name.toLowerCase().match(this.searchContact.toLowerCase());
      });
    }
  }
});
