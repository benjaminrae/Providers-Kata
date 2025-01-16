import { EventRepository } from './EventRepository'
import { Event } from './Event'

export class InMemoryEventRepository implements EventRepository {
  private events: Event[] = []

  public save(event: Event): void {
    this.events.push(event)
  }

  public findEventsFinishingAfter(time: Date): Event[] {
    return this.events.filter(event => event.finishesAfter(time))
  }
}
