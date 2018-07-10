import axios from 'axios';
import * as httpAdapter from 'axios/lib/adapters/http';
import * as nock from 'nock';
import { API_ROOT } from '../../settings';
import { ClientError } from '../APIExceptions';
import { AccountAPI } from '../index';

axios.defaults.adapter = httpAdapter;

describe('AccountAPI', () => {
  describe('register', () => {
    it('should return the response from a successful login attempt', async () => {
      const email = 'test@example.com';
      const username = 'username';
      const password = 'password';

      const response = { email, username };

      nock(API_ROOT)
        .post('/account/register/')
        .reply(201, response);

      await expect(
        AccountAPI.register(email, username, password),
      ).resolves.toMatchObject(response);
    });

    it('should return the error details from an unsuccessful request', async () => {
      const response = {
        non_field_errors: ['Some multi-field error'],
        password: ['That password is too short.'],
      };

      nock(API_ROOT)
        .post('/account/register/')
        .reply(400, response);

      return expect(AccountAPI.register('', '', '')).rejects.toEqual(
        new ClientError(response),
      );
    });
  });
});
