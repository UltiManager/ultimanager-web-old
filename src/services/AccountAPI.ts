import axios from 'axios';
import ServerError from '../exceptions/ServerError';
import { API_ROOT } from '../settings';
import { ClientError } from '../exceptions';

export interface IAccountRegisterResponse {
  email: string;
  username: string;
}

/**
 * Client for interacting with the account functionality of the API.
 */
export default class AccountAPI {
  public static BASE_ENDPOINT = `${API_ROOT}/account`;

  /**
   *
   * @param {string} email The user's email address.
   * @param {string} username The user's username.
   * @param {string} password The user's password.
   * @returns {Promise<IAccountRegisterResponse>} A response that resolves to
   *    the information used to register the user.
   * @throws ClientError If the request is not valid.
   * @throws ServerError If the server was unable to complete the request.
   */
  public static async register(
    email: string,
    username: string,
    password: string,
  ): Promise<IAccountRegisterResponse> {
    const url = `${this.BASE_ENDPOINT}/register/`;
    try {
      const response = await axios.post(url, { email, username, password });
      return response.data as IAccountRegisterResponse;
    } catch (e) {
      if (e.response.status === 400) {
        throw new ClientError(e.response.data);
      }

      throw new ServerError();
    }
  }
}
