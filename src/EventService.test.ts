import { EventService } from './EventService'
import { InMemoryEventRepository } from './InMemoryEventRepository'
import { DateTimeProviderStub } from './DateTimeProviderStub'
import { UuidProviderStub } from './UuidProviderStub'

describe('EventService', () => {
  let eventService: EventService
  let eventRepository: InMemoryEventRepository
  let dateTimeProvider: DateTimeProviderStub
  let uuidProvider: UuidProviderStub

  const EVENT_ID = '36c17cd6-40ea-491f-a2f9-62b4749c7620'

  beforeEach(() => {
    eventRepository = new InMemoryEventRepository()
    dateTimeProvider = new DateTimeProviderStub()
    uuidProvider = new UuidProviderStub()
    eventService = new EventService(
      eventRepository,
      dateTimeProvider,
      uuidProvider,
    )
  })

  /*
   * TASK 1: Refactor the event service so that we can remove the use of expect.any(...)
   * */
  it('should schedule an event', () => {
    const startTime = new Date(2024, 9, 5, 19, 0)
    const endTime = new Date(2024, 9, 5, 20, 0)
    dateTimeProvider.setDate(startTime)

    uuidProvider.setUuid(EVENT_ID)

    eventService.scheduleEvent('Event Name', 60)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: EVENT_ID,
      name: 'Event Name',
      startTime,
      endTime,
    })
  })

  /*
   * TASK 2: Refactor so that we can remove the use of expect.any(...)
   * and decouple the test from the implementation details
   * */
  it('should schedule an event (slow)', async () => {
    const startTime = new Date(2025, 5, 2, 9, 0)
    dateTimeProvider.setDate(startTime)
    const endTime = new Date(2025, 5, 2, 10, 0)
    await new Promise(resolve => setTimeout(resolve, 1))

    uuidProvider.setUuid(EVENT_ID)

    eventService.scheduleEvent('Event Name', 60)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: EVENT_ID,
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

    uuidProvider.setUuid(EVENT_ID)

    eventService.scheduleEvent('Event Name', 60, startTime)

    const timeNow = new Date(2024, 0, 1, 0, 0)
    dateTimeProvider.setDate(timeNow)

    expect(eventService.checkPendingEvents()).toContainEqual({
      id: EVENT_ID,
      name: 'Event Name',
      startTime,
      endTime,
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
