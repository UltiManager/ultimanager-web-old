import axios from 'axios';
import { API_ROOT } from '../settings';
import { ClientError } from './APIExceptions';

export interface AccountRegisterResponse {
  email: string;
  username: string;
}

/**
 * Client for interacting with the account functionality of the API.
 */
export default class AccountAPI {
  private static BASE_ENDPOINT = `${API_ROOT}/account`;

  /**
   *
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @returns {Promise<AccountRegisterResponse>}
   */
  public static async register(
    email: string,
    username: string,
    password: string,
  ): Promise<AccountRegisterResponse> {
    const url = `${this.BASE_ENDPOINT}/register/`;
    try {
      const response = await axios.post(url, { email, username, password });
      return response.data as AccountRegisterResponse;
    } catch (e) {
      throw new ClientError(e.response.data);
    }
  }
}
