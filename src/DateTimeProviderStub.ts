import { DateTimeProvider } from './DateTimeProvider'

export class DateTimeProviderStub implements DateTimeProvider {
  private date: Date = new Date()

  now(): Date {
    return this.date
  }

  setDate(date: Date): void {
    this.date = date
  }
}
