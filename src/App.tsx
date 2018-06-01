import { CssBaseline, Grid } from '@material-ui/core';
import * as React from 'react';
import 'typeface-roboto';

import RegistrationForm from './components/RegistrationForm';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container={true} justify="center">
          <Grid item={true} sm={12} md={8} lg={6}>
            <RegistrationForm onSubmit={this.handleRegister} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  private handleRegister = (
    email: string,
    username: string,
    password: string,
  ) => {
    // tslint:disable-next-line:no-console
    console.log('Registering', username, 'with email', email);
  };
}

export default App;
