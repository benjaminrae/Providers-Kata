import { Event } from "./Event";

export interface EventRepository {
  save(event: Event): void;

  findEventsFinishingAfter(time: Date): Event[];
}
