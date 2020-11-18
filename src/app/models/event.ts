import { Broadcast } from './broadcast';
import { Channel } from "./channel";
import { Sport } from "./sport";

export class Event {
    id: number;
    libelle: string;
    subLibelle: string;
    dateTime: string;
    date: string;
    sport: Sport;
    broadcast: Broadcast;
    channels: Channel[] = [];

    static fromData(data) {
        const event = new Event();
        event.id = data.id;
        event.libelle = data.libelle;
        event.subLibelle = data.subLibelle;
        event.dateTime = data.dateTime;
        event.date = data.date;
        event.broadcast = data.broadcast;
        event.sport = data.sport ? Sport.fromData(data.sport) : null;
        event.channels = data.event_channels?.map(eventChannel => Channel.fromData(eventChannel.channel));

        return event;
    }
}