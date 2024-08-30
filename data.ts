import { Criterio, Incentivo, Startup } from './classes';

export const listaCriteri: Criterio[] = [
    new Criterio(200000, true, "Fatturato anno precedente inferiore a 200.000€"),
    new Criterio(true, null, "Attività per disabili"),
    new Criterio(40000, false, "Investimento effettuato o previsto di almeno 40.000€ per l'assunzione di uno psicologo sportivo"),
    new Criterio(20000, false, "Investimento effettuato o previsto di almeno 20.000€ per l'assunzione di un nutrizionista qualificato"),
    new Criterio(true, null, "Agevolazioni per aziende sostenibili")
];

export const listaIncentivi: Incentivo[] = [
    new Incentivo("1298", "Bando Para-Sport 2024", 35000, [listaCriteri[0], listaCriteri[1]], "35.000€ a fondo perduto per aziende che hanno abbattuto le barriere architettoniche e hanno fatturato inferiore a 200.000€"),
    new Incentivo("9832", "Bando AgevolaCredito 2024", 20000, [listaCriteri[0]], "20.000€ a fondo perduto per aziende con fatturato inferiore a 200.000€"),
    new Incentivo("1278", "Bando Benessere", 15000, [listaCriteri[2]], "15.000€ a fondo perduto per aziende che hanno investito o investiranno almeno 40.000€ per assumere uno psicologo professionista"),
    new Incentivo("8721", "Bando Nutrizione Sostenibile", 5000, [listaCriteri[3]], "5.000€ di rimborsi per aziende che promuovono un corretto regime alimentare con investimenti riconosciuti"),
    new Incentivo("4567", "Bando Nuove Energie", 8000, [listaCriteri[4]], "8.000€ di rimborsi per aziende che puntano al sostenibile con investimenti riconosciuti")
]; 

export const startupList: Startup[] = [
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
