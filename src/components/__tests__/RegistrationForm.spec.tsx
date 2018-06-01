import { shallow } from 'enzyme';
import * as React from 'react';

import RegistrationForm from '../RegistrationForm';

const setup = () => {
  const props = {
    onSubmit: jest.fn(),
  };
  const wrapper = shallow(<RegistrationForm {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('RegistrationForm', () => {
  describe('Controlled Inputs', () => {
    ['email', 'password', 'username'].forEach(inputName => {
      it(`should have a controlled ${inputName} component`, () => {
        const { wrapper } = setup();

        const inputField = wrapper.find(`[name="${inputName}"]`);
        expect(inputField).toHaveLength(1);

        const mockEvent = {
          currentTarget: {
            name: inputName,
            value: inputName,
          },
        };
        inputField.simulate('change', mockEvent);

        expect(wrapper.state('inputs')[inputName]).toBe(
          mockEvent.currentTarget.value,
        );
      });
    });
  });

  it('should block the default form submit event and call the submit prop', () => {
    const {
      props: { onSubmit },
      wrapper,
    } = setup();

    // Set values for form to submit
    const email = 'test@example.com';
    const password = 'password';
    const username = 'username';

    wrapper.setState({
      inputs: {
        email,
        password,
        username,
      },
    });

    const form = wrapper.find('form');
    expect(form).toHaveLength(1);

    const mockEvent = {
      preventDefault: jest.fn(),
    };
    form.simulate('submit', mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(email, username, password);
  });
});
