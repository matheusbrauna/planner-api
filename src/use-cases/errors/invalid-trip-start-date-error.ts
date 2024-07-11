export class InvalidTripStartDateError extends Error {
  constructor() {
    super('Invalid trip end date.')
    this.name = 'InvalidTripEndDateError'
  }
}
