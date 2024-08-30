/*
Definizione delle interfacce Startup, Incentivo, Criteri e Cittadino
*/
export interface IStartup {
    nome: string;
    settoreFocus: string;
    descrizione: string;
    prodottiServizi: string[];
    accessoDisabili?: boolean;
    attivitaDisabili?: boolean;
    riceviIncentivo(incentivo: IIncentivo[]): void;
}
export interface ICriterio {
    valoreRiferimento: number | boolean;
    isUnder: boolean | null;
    descrizione: string;
}
export interface IIncentivo {
    codiceIdentificativo: string;
    nome: string;
    valore: number;
    criteriEleggibilita: ICriterio[];
    assegnaAStartup(startup: IStartup): void;
}

export interface ICittadino {
    nome: string;
    cognome: string;
    eta: number;
    interessiSportivi: string[];
    disabilita?: string[];
    partecipaAttivita(startup: IStartup[]): void;
}
