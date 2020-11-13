import { Channel } from "./channel";
import { Competition } from "./competition";
import { Sport } from "./sport";

export class Event {
    id: number;
    libelle: string;
    subLibelle: string;
    dateTime: string;
    date: string;
    sport: Sport;
    competition: Competition;
    channels: Channel[] = [];

    static fromData(data) {
        const event = new Event();
        event.id = data.id;
        event.libelle = data.libelle;
        event.subLibelle = data.subLibelle;
        event.dateTime = data.dateTime;
        event.date = data.date;
        event.sport = data.sport ? Sport.fromData(data.sport) : null;
        event.competition = data.competition ? Competition.fromData(data.competition) : null;
        event.channels = data.event_channels?.map(eventChannel => Channel.fromData(eventChannel.channel));

        return event;
    }
}