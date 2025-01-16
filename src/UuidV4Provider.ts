import { UuidProvider } from './UuidProvider'

export class UuidV4Provider implements UuidProvider {
  randomUuid(): string {
    return crypto.randomUUID()
  }
}
