export class Competition {
    id: number;
    libelle: string;

    static fromData(data) {
        const competition = new Competition();
        competition.id = data.id;
        competition.libelle = data.libelle;
        return competition;
    }
}