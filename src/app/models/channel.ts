import { Broadcast } from './broadcast';

export class Channel {
    id: number;
    libelle: string;
    link: string;
    eventDirectNumber: number = 0;
    eventRediffusionNumber: number = 0;

    get eventNumber() { return this.eventDirectNumber + this.eventRediffusionNumber };

    static fromData(data) {
        const channel = new Channel();
        channel.id = data.id;
        channel.libelle = data.libelle;
        channel.link = data.link;
        return channel;
    }
}

export class ChannelInDay {
    id: number;
    libelle: string;
    date: string;
    sportId: number;
    broadcast: Broadcast;
    eventNumber: number;

    static fromData(data) {
        const channel = new ChannelInDay();
        channel.id = data.id;
        channel.libelle = data.libelle;
        channel.date = data.date;
        channel.sportId = data.sport_id;
        channel.broadcast = data.broadcast;
        channel.eventNumber = data.event_number;
    
        return channel;
    }
}