import { EventService } from "./EventService";
import { InMemoryEventRepository } from "./InMemoryEventRepository";

describe('EventService', () => {
  let eventService: EventService
  let eventRepository: InMemoryEventRepository

  beforeEach(() => {
    eventRepository = new InMemoryEventRepository()
    eventService = new EventService(eventRepository)
  })

  it('should schedule an event', () => {
    eventService.scheduleEvent('Event Name', 60)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: expect.any(String),
      name: 'Event Name',
      startTime: expect.any(Date),
      endTime: expect.any(Date),
    })
  })

  it('should schedule an event (slow)', async () => {
    const startTime = new Date()
    const endTime = new Date(startTime.getTime() + 60 * 60000)
    await new Promise(resolve => setTimeout(resolve, 1000))

    eventService.scheduleEvent('Event Name', 60)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: expect.any(String),
      name: 'Event Name',
      startTime,
      endTime,
    })
  })

  it('should schedule an event with a custom start date', () => {
    const startDate = new Date(2021, 0, 1, 12, 0);

    eventService.scheduleEvent('Event Name', 60, startDate)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: expect.any(String),
      name: 'Event Name',
      startTime: startDate,
      endTime: new Date(2021, 0, 1, 13, 0),
    })
  })

  it('should return an empty array if there are no pending events', () => {
    expect(eventService.checkPendingEvents().length).toBe(0)
  })
})
