export class InvalidTripEndDateError extends Error {
  constructor() {
    super('Invalid trip start date.')
    this.name = 'InvalidTripStartDateError'
  }
}
