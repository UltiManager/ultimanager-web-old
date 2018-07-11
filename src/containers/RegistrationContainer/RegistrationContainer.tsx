import * as React from 'react';
import RegistrationForm from '../../components/RegistrationForm';
import { ClientError } from '../../exceptions';
import { ClientErrorResponse } from '../../exceptions/ClientError';
import { AccountAPI } from '../../services';

interface IState {
  /** Any errors from the last registration attempt. */
  errors: ClientErrorResponse;
  /** Boolean indicating if the registration process is complete. */
  isDone: boolean;
}

/**
 * Registration form connected to the account API.
 *
 * This component handles calling the API based on the inputs from the
 * registration form.
 */
export default class RegistrationContainer extends React.Component<{}, IState> {
  public readonly state = {
    errors: {},
    isDone: false,
  };

  public render() {
    const { errors } = this.state;

    return <RegistrationForm errors={errors} onSubmit={this.handleSubmit} />;
  }

  private handleSubmit = async (
    email: string,
    username: string,
    password: string,
  ) => {
    try {
      await AccountAPI.register(email, username, password);
      this.setState({ isDone: true });
    } catch (e) {
      this.setState({ errors: (e as ClientError).errors });
    }
  };
}
