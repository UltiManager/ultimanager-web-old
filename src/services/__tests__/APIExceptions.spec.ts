import { ClientError } from '../APIExceptions';

describe('ClientError', () => {
  it('should store the provided errors', () => {
    const errors = { non_field_errors: ['The foo does not have enough bar.'] };
    const error = new ClientError(errors);

    expect(error.errors).toBe(errors);
  });
});
