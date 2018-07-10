/**
 * An error indicating something is wrong with the server. This indicates that
 * the server is not accessible or the server encountered an error processing
 * the request.
 */
export default class ServerError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, ServerError.prototype);

    this.message = 'Server failed to complete the request.';
  }
}
