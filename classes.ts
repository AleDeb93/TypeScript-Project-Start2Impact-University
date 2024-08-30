import { ICriterio, IIncentivo, IStartup, ICittadino } from './interfaces';

/*
Implementazione delle Classi dalle Interfacce di cui sopra
*/
export class Startup implements IStartup {
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
export class Criterio implements ICriterio {
    constructor(
        public valoreRiferimento: number | boolean,
        public isUnder: boolean | null,
        public descrizione: string
    ) { }
}
export class Incentivo implements IIncentivo {
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

export class Cittadino implements ICittadino {
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
