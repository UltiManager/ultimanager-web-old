import { CssBaseline, Grid } from '@material-ui/core';
import * as React from 'react';
import 'typeface-roboto';
import RegistrationContainer from './containers/RegistrationContainer/RegistrationContainer';

/**
 * The main application component.
 *
 * This component is the entry point to the entire application.
 */
const App: React.SFC = () => (
  <React.Fragment>
    <CssBaseline />
    <Grid container={true} justify="center">
      <Grid item={true} sm={12} md={6} lg={4}>
        <RegistrationContainer />
      </Grid>
    </Grid>
  </React.Fragment>
);

export default App;
