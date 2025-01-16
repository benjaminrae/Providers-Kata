import { Event } from './Event'
import { EventRepository } from './EventRepository'
import { DateTimeProvider } from './DateTimeProvider'

export class EventService {
  private eventRepository: EventRepository
  private dateTimeProvider: DateTimeProvider

  constructor(
    eventRepository: EventRepository,
    dateTimeProvider: DateTimeProvider,
  ) {
    this.eventRepository = eventRepository
    this.dateTimeProvider = dateTimeProvider
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

  private now(): Date {
    return this.dateTimeProvider.now()
  }
}
