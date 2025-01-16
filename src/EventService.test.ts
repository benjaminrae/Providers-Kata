import { EventService } from './EventService'
import { InMemoryEventRepository } from './InMemoryEventRepository'
import { DateTimeProviderStub } from './DateTimeProviderStub'

describe('EventService', () => {
  let eventService: EventService
  let eventRepository: InMemoryEventRepository
  let dateTimeProvider: DateTimeProviderStub

  beforeEach(() => {
    eventRepository = new InMemoryEventRepository()
    dateTimeProvider = new DateTimeProviderStub()
    eventService = new EventService(eventRepository, dateTimeProvider)
  })

  /*
   * TASK 1: Refactor the event service so that we can remove the use of expect.any(...)
   * */
  it('should schedule an event', () => {
    const startTime = new Date(2024, 9, 5, 19, 0)
    dateTimeProvider.setDate(startTime)

    eventService.scheduleEvent('Event Name', 60)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: expect.any(String),
      name: 'Event Name',
      startTime,
      endTime: expect.any(Date),
    })
  })

  /*
   * TASK 2: Refactor so that we can remove the use of expect.any(...)
   * and decouple the test from the implementation details
   * */
  it('should schedule an event (slow)', async () => {
    const startTime = new Date()
    dateTimeProvider.setDate(startTime)
    const endTime = new Date(startTime.getTime() + 60 * 60000)
    await new Promise(resolve => setTimeout(resolve, 1))

    eventService.scheduleEvent('Event Name', 60)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: expect.any(String),
      name: 'Event Name',
      startTime,
      endTime,
    })
  })

  /*
   * TASK 3: This test was passing yesterday, but today it is not passing,
   * refactor to make sure it always passes
   * */
  it('should schedule an event with a custom start date', () => {
    const startTime = new Date(2025, 0, 16, 20, 0)
    const endTime = new Date(2025, 0, 16, 21, 0)

    eventService.scheduleEvent('Event Name', 60, startTime)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: expect.any(String),
      name: 'Event Name',
      startTime: startTime,
      endTime: endTime,
    })
  })

  /*
   * TASK 4: Write a test to check that past events are not listed as pending
   * */
  it.todo('should not list past events as pending', () => {})

  it('should return an empty array if there are no pending events', () => {
    expect(eventService.checkPendingEvents().length).toBe(0)
  })
})
