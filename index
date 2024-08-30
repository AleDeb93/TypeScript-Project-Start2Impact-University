/*
Definizione delle interfacce Startup, Incentivo, Criteri e Cittadino
*/
interface IStartup {
    nome: string;
    settoreFocus: string;
    descrizione: string;
    prodottiServizi: string[];
    accessoDisabili?: boolean;
    attivitaDisabili?: boolean;
    riceviIncentivo(incentivo: Incentivo[]): void;
}
interface ICriterio {
    valoreRiferimento: number | boolean;
    isUnder: boolean | null;
    descrizione: string;
}
interface IIncentivo {
    codiceIdentificativo: string;
    nome: string;
    valore: number;
    criteriEleggibilita: ICriterio[];
    assegnaAStartup(startup: Startup): void;
}

interface ICittadino {
    nome: string;
    cognome: string;
    eta: number;
    interessiSportivi: string[];
    disabilita?: string[];
    partecipaAttivita(startup: Startup[]): void;
}

/*
Implementazione delle Classi dalle Interfacce di cui sopra
*/
class Startup implements IStartup {
    constructor(
        public nome: string,
        public settoreFocus: string,
        public descrizione: string,
        public prodottiServizi: string[],
        public accessoDisabili: boolean,
        public attivitaDisabili: boolean,
        //public nuoveProposte?: string[]
        public fatturato: number,
        public investimentiSostenibilita: number,
        public mentalWellness: number
    ) { }

    riceviIncentivo(listaIncentivi: Incentivo[]): void {
        let accessoIncentivo = false;
        listaIncentivi.forEach(incentivo => {
            let criteriSoddisfatti = true;

            for (const criterio of incentivo.criteriEleggibilita)
            {
                if(typeof criterio.valoreRiferimento === "number"){
                    if(criterio.isUnder){
                        if(this.fatturato > criterio.valoreRiferimento)
                            criteriSoddisfatti = false;
                        break;
                    } else {
                        if(this.investimentiSostenibilita < criterio.valoreRiferimento && this.mentalWellness < criterio.valoreRiferimento)
                            criteriSoddisfatti = false;
                        break;
                    }
                } else if (typeof criterio.valoreRiferimento === "boolean"){
                    if(this.attivitaDisabili != true){
                        criteriSoddisfatti = false;
                        break;
                    }
                    else if (this.investimentiSostenibilita <= 0){
                        criteriSoddisfatti = false;
                        break;
                    }
                }
            };
            if(criteriSoddisfatti){
                console.log(`La tua Startup soddisfa i criteri per l'accesso all'incentivo: ${incentivo.nome} ${incentivo.descrizione} cod. identificativo ${incentivo.codiceIdentificativo}`);
                accessoIncentivo = true;
            }
        });
        if(!accessoIncentivo)
            console.log("La tua Startup al momento non soddisfa i requisiti per gli incentivi disponibili")
    }
}
class Criterio implements ICriterio {
    constructor(
        public valoreRiferimento: number | boolean,
        public isUnder: boolean | null,
        public descrizione: string
    ) { }
}
class Incentivo implements IIncentivo {
    constructor(
        public codiceIdentificativo: string,
        public nome: string,
        public valore: number,
        public criteriEleggibilita: Criterio[],
        public descrizione: string
    ) { }

    assegnaAStartup(startup: IStartup): void {
        console.log(`L'incentivo ${this.nome} è stato assegnato a ${startup.nome}`);
    }
}

class Cittadino implements ICittadino {
    constructor(
        public nome: string,
        public cognome: string,
        public eta: number,
        public interessiSportivi: string[],
        public disabilita?: string[]
    ) { }
    /*
    La logca prevede il controllo degli interessi sportivi del cittadino e tiene conto di eventuali disabilita per accedere alla lista di Startup compatibili
    */
    partecipaAttivita(startupList: IStartup[]): void {
        const startupCompatibili = startupList.filter(startup =>
            this.interessiSportivi.some(interesse =>
                startup.prodottiServizi.some(servizio =>
                    servizio.toLowerCase() === interesse.toLowerCase()
                )
            )
        );

        if (startupCompatibili.length > 0) {
            console.log(`${this.nome} ${this.cognome}, puoi partecipare alle attività offerte dalle seguenti startup:`);
            startupCompatibili.forEach(startup => {
                // Verifica se il cittadino ha disabilità dichiarate
                const haDisabilita = this.disabilita && this.disabilita.length > 0;

                // Verifica se la startup offre attività per disabili
                const offreAttivitaDisabili = startup.attivitaDisabili === true;

                // Se il cittadino ha disabilità e la startup non offre attività per disabili, salta questa startup
                if (haDisabilita && !offreAttivitaDisabili) {
                    return;
                }

                const attivitaCompatibili = this.interessiSportivi.filter(interesse =>
                    startup.prodottiServizi.some(servizio =>
                        servizio.toLowerCase() === interesse.toLowerCase()
                    )
                );
                console.log(`- ${startup.nome}: ${attivitaCompatibili.join(", ")}`);
            });
        } else {
            console.log(`${this.nome} ${this.cognome}, non ci sono startup con attività compatibili con i tuoi interessi sportivi.`);
        }
    }
}
/*
Logica sul controllo di valori nulli o errori per il Parse da string a number usata in seguito
*/
function checkValue(x) {
    if (x === null)
        throw new Error("Il campo non puo essere vuoto")
    if (x === "0")
        throw new Error("Il campo non puo essere 0")
}
function checkNum(x) {
    if (isNaN(x))
        throw new Error("Il valore inserito non è valido")
}
/*
Logica per l'inserimento dei dati a sistama, la function verifica in prima battuta se siamo una Startup o un cittadino, in seguito, richiede le informazioni pertinenti
*/
function inserisciDati(): Cittadino | Startup | undefined {
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

/*
Array di oggetti gia istanziati
*/
const listaCriteri: Criterio[] = [
    new Criterio(200000, true, "Fatturato anno precedente inferiore a 200.000€"),
    new Criterio(true, null, "Attività per disabili"),
    new Criterio(40000, false, "Investimento effettuato o previsto di almeno 40.000€ per l'assunzione di uno psicologo sportivo"),
    new Criterio(20000, false, "Investimento effettuato o previsto di almeno 20.000€ per l'assunzione di un nutrizionista qualificato"),
    new Criterio(true, null, "Agevolazioni per aziende sostenibili")
]
const listaIncentivi: Incentivo[] = [
    new Incentivo("1298", "Bando Para-Sport 2024", 35000, [listaCriteri[0], listaCriteri[1]], "35.000€ a fondo perduto per azinede che hanno abbattuto le barriere architettoniche e hanno fatturato inferiore a 200.000€"),
    new Incentivo("9832", "Bando AgevolaCredito 2024", 20000, [listaCriteri[0]], "20.000€ a fondo perduto per aziende con fatturato inferiore a 200.000€"),
    new Incentivo("1278", "Bando Benessere", 15000, [listaCriteri[2]], "15.000€ a fondo perduto per aziende che hanno investito o investiranno almeno 40.000€ per assumere uno psicologo professionista"),
    new Incentivo("8721", "Bando Nutrizione Sostenibile", 5000, [listaCriteri[3]], "5.000€ di rimborsi per aziende che promuovono un corretto regime alimentare con investimenti riconosciuti"),
    new Incentivo("4567", "Bando Nuove Energie", 8000, [listaCriteri[4]], "8.000€ di rimborsi per aziende che puntano al sostenibile con investimenti riconosciuti")
];
const startupList: Startup[] = [
    new Startup("FitLife", "Salute e Benessere", "Palestra e corsi di fitness", ["Yoga", "Pilates", "CrossFit"], true, true, 0, 0, 0),
    new Startup("RunClub", "Salute e Benessere", "Gruppi di corsa e allenamento", ["Running", "Trail Running"], false, false, 0, 0, 0),
    new Startup("AquaGym", "Salute e Benessere", "Corsi di ginnastica in acqua", ["Aqua Gym", "Nuoto"], true, true, 0, 0, 0),
    new Startup("BikeLovers", "Salute e Benessere", "Club per gli appassionati di ciclismo", ["Ciclismo", "Mountain Bike"], true, false, 0, 0, 0),
    new Startup("HealthyMind", "Salute e Benessere", "Corsi di meditazione e mindfulness", ["Meditazione", "Mindfulness"], true, true, 0, 0, 0),
    new Startup("DanceFit", "Salute e Benessere", "Corsi di danza fitness", ["Zumba", "Hip Hop", "Salsa"], false, false, 0, 0, 0),
    new Startup("ClimbUp", "Salute e Benessere", "Palestra di arrampicata", ["Arrampicata", "Boulder"], false, false, 0, 0, 0),
    new Startup("MartialArts", "Salute e Benessere", "Corsi di arti marziali", ["Karate", "Judo", "Taekwondo"], false, false, 0, 0, 0),
    new Startup("WellnessRetreat", "Salute e Benessere", "Ritiri di benessere", ["Yoga", "Meditazione", "Detox"], true, true, 0, 0, 0),
    new Startup("TennisPro", "Salute e Benessere", "Corsi di tennis", ["Tennis", "Padel"], true, true, 0, 0, 0)
];

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
