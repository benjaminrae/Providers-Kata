export class Event {
  private readonly id: string
  private readonly name: string
  private readonly startTime: Date
  private readonly endTime: Date

  constructor(id: string, name: string, startTime: Date, endTime: Date) {
    this.id = id
    this.name = name
    this.startTime = startTime
    this.endTime = endTime
  }

  public finishesAfter(time: Date): boolean {
    return this.endTime > time
  }
}
