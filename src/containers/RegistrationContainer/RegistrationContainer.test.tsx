import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import RegistrationForm from '../../components/RegistrationForm';
import { ClientError } from '../../exceptions';
import { AccountAPI } from '../../services';
import RegistrationContainer from './RegistrationContainer';

jest.mock('../../services');

const errors = {
  non_field_errors: ['The foo is barred.'],
  username: ['That username is invalid.'],
};

const setup = () => {
  const wrapper = shallow(<RegistrationContainer />);

  return { wrapper };
};

describe('RegistrationContainer', () => {
  it('should render a registration form with the correct handlers bound', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance() as RegistrationContainer;

    const form = wrapper.find(RegistrationForm);

    expect(form).toHaveLength(1);
    expect(form.prop('onSubmit')).toBe((instance as any).handleSubmit);
  });

  it('should pass any errors to the child form', () => {
    const { wrapper } = setup();
    wrapper.setState({ errors });

    const form = wrapper.find(RegistrationForm);

    expect(form.prop('errors')).toEqual(errors);
  });

  describe('handleSubmit', () => {
    (AccountAPI.register as any).mockReturnValue(Promise.resolve());

    const email = 'test@example.com';
    const username = 'johndoe';
    const password = 'password';

    let wrapper: ShallowWrapper;
    let instance: any;

    beforeEach(() => {
      wrapper = setup().wrapper;
      instance = wrapper.instance();
    });

    it('should set the components state to done after a successful submission', async () => {
      await instance.handleSubmit(email, username, password);

      expect(AccountAPI.register).toHaveBeenCalledWith(
        email,
        username,
        password,
      );
      expect(wrapper.state('isDone')).toBe(true);
    });

    it('should save the received errors in the component state', async () => {
      (AccountAPI.register as any).mockReturnValueOnce(
        Promise.reject(new ClientError(errors)),
      );

      await instance.handleSubmit(email, username, password);

      expect(wrapper.state('errors')).toEqual(errors);
    });
  });
});
