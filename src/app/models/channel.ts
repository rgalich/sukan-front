export class Channel {
    id: number;
    libelle: string;
    link: string;

    static fromData(data) {
        const channel = new Channel();
        channel.id = data.id;
        channel.libelle = data.libelle;
        channel.link = data.link;
        return channel;
    }
}