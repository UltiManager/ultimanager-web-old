export type ClientErrorResponse = Record<string, ReadonlyArray<string>>;

export default class ClientError extends Error {
  public readonly errors: ClientErrorResponse;

  constructor(errors: ClientErrorResponse) {
    super();

    // See https://stackoverflow.com/a/41429145/3762084
    Object.setPrototypeOf(this, ClientError.prototype);

    this.errors = errors;
  }
}
