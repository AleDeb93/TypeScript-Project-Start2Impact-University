import { Startup, Cittadino } from './classes';
import { startupList } from './data';

/*
Logica sul controllo di valori nulli o errori per il Parse da string a number usata in seguito
*/
export function checkValue(x) {
    if (x === null)
        throw new Error("Il campo non puo essere vuoto")
    if (x === "0")
        throw new Error("Il campo non puo essere 0")
}
export function checkNum(x) {
    if (isNaN(x))
        throw new Error("Il valore inserito non è valido")
}

/*
Logica per l'inserimento dei dati a sistama, la function verifica in prima battuta se siamo una Startup o un cittadino, in seguito, richiede le informazioni pertinenti
*/
export function inserisciDati(): Cittadino | Startup | undefined {
    const value: string | null = prompt("Sei una startup o un cittadino? Inserisci 'S' per Startup, 'C' per Cittadino");
    /*
    Se sono un cittadino
    */
    if (value?.toLowerCase() === "c") {
        const nome: string | null = prompt("Inserisci il tuo nome:");
        checkValue(nome);

        const cognome: string | null = prompt("Inserisci il tuo cognome:");
        checkValue(cognome)

        const etaInput: string | null = prompt("Inserisci la tua età:");
        checkValue(etaInput);
        const eta: number = Number(etaInput);
        checkNum(eta);

        const interessi: string | null = prompt("Inserisci i tuoi interessi sportivi (separati da virgola):");
        let interessiSportivi: string[];
        checkValue(interessi);
        if (interessi != null)
            interessiSportivi = interessi.split(",").map((interesse: string) => interesse.trim());

        const disabilitaInput: string | null = prompt("Hai delle disabilità? Se sì, elencale separandole da virgola:");
        const disabilita: string[] = disabilitaInput ? disabilitaInput.split(",").map((disabilita: string) => disabilita.trim()) : [];

        return new Cittadino(nome!, cognome!, eta, interessiSportivi!, disabilita);
    }
    /*
    Se sono una startup
    */
    else if (value?.toLocaleLowerCase() === "s") {
        const nome: string | null = prompt("Inserisci il nome della startup:");
        if (nome === null) {
            throw new Error("Il nome non può essere vuoto");
        }

        const settoreFocus: string | null = prompt("Inserisci il settore di focus della startup:");
        if (settoreFocus === null) {
            throw new Error("Il settore di focus non può essere vuoto");
        }

        const descrizione: string | null = prompt("Inserisci una descrizione della startup:");
        if (descrizione === null) {
            throw new Error("La descrizione non può essere vuota");
        }

        const prodottiServizi: string | null = prompt("Inserisci i prodotti/servizi offerti (separati da virgola):");
        if (prodottiServizi === null) {
            throw new Error("Devi inserire almeno un prodotto o servizio!");
        }
        const prodottiServiziArray: string[] = prodottiServizi.split(",").map((item: string) => item.trim());

        const accessoDisabiliInput: string | null = prompt("La tua startup ha accessibilità per disabili? (Sì/No)");
        const accessoDisabili: boolean = accessoDisabiliInput !== null && accessoDisabiliInput.toLowerCase() === 'si';

        const attivitaDisabiliInput: string | null = prompt("La tua startup offre attività dedicate per disabili? (Sì/No)");
        const attivitaDisabili: boolean = attivitaDisabiliInput !== null && attivitaDisabiliInput.toLowerCase() === 'si';
        /*
        Logiche per accesso agli incentivi, dove richiedo Fatturato e investimenti previsti o effettuati
        */
        const fatturatoInput: string | null = prompt("Inserisci il fatturato 2023");
        let fatturato: number;
        if (fatturatoInput === null) {
            throw new Error("Per accedere alla lista degli incentivi dobbiamo conoscere il vostro fatturato!");
        } else {
            fatturato = Number(fatturatoInput)
            checkNum(fatturato);
        }

        const investimentiInput: string | null = prompt("Inserisci gli investimenti gia effettuati o in programma in ambito sostenibilita (ES: Energie rinnovabili o promozione diete sostenibili)");
        let investimentiSostenibilita: number;
        if (investimentiInput === null || investimentiInput.trim() === "0") {
            investimentiSostenibilita = 0;
        } else {
            investimentiSostenibilita = Number(investimentiInput);
            checkNum(investimentiSostenibilita);
        }

        const mwInput: string | null = prompt("Inserisci gli investimenti gia effettuati o in programma in ambito Mental Wellness (ES: Psicologo sportivo, Mental Coach)");
        let mentalWellness: number;
        if (mwInput === null || mwInput.trim() === "0") {
            mentalWellness = 0;
        } else {
            mentalWellness = Number(mwInput);
            checkNum(mentalWellness);
        }

        const nuovaStartup = new Startup(nome, settoreFocus, descrizione, prodottiServiziArray, accessoDisabili, attivitaDisabili, fatturato, investimentiSostenibilita, mentalWellness);
        startupList.push(nuovaStartup);
        return nuovaStartup;
    }
    // Errore in caso di promt non coerente 
    else {
        throw new Error("Tipo di utente non valido. Deve essere 'cittadino' o 'startup'.");
    }
}
