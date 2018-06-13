export interface ClientErrorResponse {
  readonly [key: string]: ReadonlyArray<string>;
}

export class ClientError extends Error {
  readonly errors: ClientErrorResponse;

  constructor(errors: ClientErrorResponse) {
    super();

    // See https://stackoverflow.com/a/41429145/3762084
    Object.setPrototypeOf(this, ClientError.prototype);

    this.errors = errors;
  }
}
