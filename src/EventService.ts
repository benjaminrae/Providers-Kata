import { Event } from './Event'
import { EventRepository } from './EventRepository'

export class EventService {
  private eventRepository: EventRepository

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository
  }

  public scheduleEvent(
    name: string,
    durationInMinutes: number,
    startDate?: Date,
  ): void {
    const startTime = startDate ?? this.now()
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000)
    const id = crypto.randomUUID()

    this.eventRepository.save(new Event(id, name, startTime, endTime))
  }

  public checkPendingEvents(): Event[] {
    return this.eventRepository.findEventsFinishingAfter(this.now())
  }

  private now() {
    return new Date()
  }
}
