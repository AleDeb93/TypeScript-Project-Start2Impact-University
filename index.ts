import { Startup, Cittadino } from './classes';
import { listaIncentivi, startupList, listaCriteri } from './data';
import { inserisciDati } from './functions';

/*
Richiamo la function per l'inserimento dei dati a sistema
*/
const entita = inserisciDati();
if (entita instanceof Cittadino) {
    console.log(`Cittadino: ${entita.nome} ${entita.cognome}`);
    if (entita.disabilita && entita.disabilita.length > 0) {
        console.log(`Disabilità: ${entita.disabilita.join(", ")}`);
    } else {
        console.log("Nessuna disabilità dichiarata.");
    }
    entita.partecipaAttivita(startupList);
} else if (entita instanceof Startup) {
    console.log(`Startup: ${entita.nome}`);
    console.log(`Accessibilità per disabili: ${entita.accessoDisabili ? "Si" : "No"}`);
    console.log(`Attività dedicate per disabili: ${entita.attivitaDisabili ? "Si" : "No"}`);
    console.log(entita);
    entita.riceviIncentivo(listaIncentivi);
}
