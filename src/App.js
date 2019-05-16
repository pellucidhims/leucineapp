import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


//import customized components
import AppBarComponent from './components/appBarComponent';
import AnalyticalForm from './components/analyticalFormComponent';
import ConformationButtons from './components/conformationButtonsComponent';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class App extends Component{
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center">
        <Grid item xs={10}>
        <AppBarComponent />
        <br/>
        <Paper>
          <AnalyticalForm />
        </Paper>
        <ConformationButtons />
        </Grid>
      </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
