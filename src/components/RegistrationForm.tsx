import {
  Button,
  Paper,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { ClientErrorResponse } from '../exceptions/ClientError';

const styles = (theme: Theme) => ({
  formBody: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

interface IRegistrationFormProps {
  errors?: ClientErrorResponse;
  onSubmit: (email: string, username: string, password: string) => void;
}

interface IRegistrationFormState {
  inputs: {
    [propName: string]: string;
  };
}

type Props = IRegistrationFormProps &
  WithStyles<keyof ReturnType<typeof styles>>;

class RegistrationForm extends React.Component<Props, IRegistrationFormState> {
  public state = {
    inputs: {
      email: '',
      password: '',
      username: '',
    },
  };

  public render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography align="center" gutterBottom={true} variant="display1">
          Register
        </Typography>
        <form onSubmit={this.handleFormSubmit}>
          <div className={classes.formBody}>
            <TextField
              fullWidth={true}
              helperText="A public facing name for your profile."
              id="username"
              label="Username"
              margin="normal"
              name="username"
              onChange={this.handleInputChange}
              required={true}
            />
            <TextField
              fullWidth={true}
              id="email"
              label="Email"
              margin="normal"
              name="email"
              onChange={this.handleInputChange}
              required={true}
              type="email"
            />
            <TextField
              fullWidth={true}
              id="password"
              label="Password"
              margin="normal"
              name="password"
              onChange={this.handleInputChange}
              required={true}
              type="password"
            />
          </div>
          <Button
            color="primary"
            fullWidth={true}
            size="large"
            type="submit"
            variant="raised"
          >
            Register
          </Button>
        </form>
      </Paper>
    );
  }

  private handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const {
      inputs: { email, password, username },
    } = this.state;

    onSubmit(email, username, password);
  };

  private handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Extract important values from event because it disappears before the setState callback is fired.
    const { name, value } = e.currentTarget;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: value,
      },
    }));
  };
}

export default withStyles(styles)(RegistrationForm);
