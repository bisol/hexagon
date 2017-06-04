
describe('patients directive', function() {
  var patients

  beforeEach(angular.mock.module('patients'))

  // Before each test set our injected patients factory (_patients_) to our local patients variable
  beforeEach(inject(function(_patients_) {
    patients = _patients_
  }))

  // A simple test to verify the patients factory exists
  it('should exist', function() {
    expect(patients).toBeDefined()
  })
})