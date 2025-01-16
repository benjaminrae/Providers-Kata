export class UuidProviderStub {
  private uuid: string = '00000000-0000-0000-0000-000000000000'

  randomUuid(): string {
    return this.uuid
  }

  setUuid(uuid: string): void {
    this.uuid = uuid
  }
}
