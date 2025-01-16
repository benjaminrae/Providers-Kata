import { DateTimeProvider } from './DateTimeProvider'

export class SystemDateTimeProvider implements DateTimeProvider {
  now(): Date {
    return new Date()
  }
}
