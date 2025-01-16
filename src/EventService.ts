import { Event } from './Event'
import { EventRepository } from './EventRepository'
import { DateTimeProvider } from './DateTimeProvider'
import { UuidProvider } from './UuidProvider'

export class EventService {
  private eventRepository: EventRepository
  private dateTimeProvider: DateTimeProvider
  private uuidProvider: UuidProvider

  constructor(
    eventRepository: EventRepository,
    dateTimeProvider: DateTimeProvider,
    uuidProvider: UuidProvider,
  ) {
    this.eventRepository = eventRepository
    this.dateTimeProvider = dateTimeProvider
    this.uuidProvider = uuidProvider
  }

  public scheduleEvent(
    name: string,
    durationInMinutes: number,
    startDate?: Date,
  ): void {
    const startTime = startDate ?? this.now()
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000)
    const id = this.uuidProvider.randomUuid()

    this.eventRepository.save(new Event(id, name, startTime, endTime))
  }

  public checkPendingEvents(): Event[] {
    return this.eventRepository.findEventsFinishingAfter(this.now())
  }

  private now(): Date {
    return this.dateTimeProvider.now()
  }
}
