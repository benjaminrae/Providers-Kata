import { Event } from "./Event";
import { EventRepository } from "./EventRepository";

export class EventService {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository
  }

  public scheduleEvent(name: string, durationInMinutes: number, startDate?: Date): void {
    const startTime = startDate ?? new Date()
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000)
    const id = crypto.randomUUID()
    
    const event = {
      id,
      name,
      startTime,
      endTime,
    }
    
    this.eventRepository.save(event)
  }

  public checkPendingEvents(): Event[] {
    return this.eventRepository.findEventsFinishingAfter(new Date())
  }
}

