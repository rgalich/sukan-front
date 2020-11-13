export class Sport {
    id: number;
    libelle: string;
    date: string;
    eventNumber: number;

    static fromData(data) {
        const sport = new Sport();
        sport.id = data.id;
        sport.libelle = data.libelle;
        sport.date = data.date;
        sport.eventNumber = data.event_number;
        return sport;
    }
}