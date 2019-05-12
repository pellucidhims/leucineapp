import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import {moc} from '../data/dummyData';

export default class MocSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mocValue: '',
      numValue: ''
    }
  }

  handleChange=(field)=>e=>{
      this.setState({
        [field]: e.target.value
      })
  }

  renderSelectField=(id,type,label,req=false)=>{
    return(
      <TextField
        id={id}
        select
        label={label}
        placeholder={label}
        margin="normal"
        variant="outlined"
        value={this.state.mocValue}
        onChange={this.handleChange('mocValue')}
        fullWidth
        required = {req}
      >
      {moc.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))
      }
      </TextField>
    )
  }

  renderMocTextField=(id,type,label,req=false)=>{
    return(
            <TextField
              id={id}
              label={label}
              placeholder={label}
              type={type}
              margin="normal"
              variant="outlined"
              value={this.state.numValue}
              onChange={this.handleChange('numValue')}
              fullWidth
              required = {req}
            />
    )
  }

  render(){
    console.log("INside MOC SECTION WITH PROP: ", this.props);
    const mocItem = this.props.mocItemDetail;
    return(
      <div>
        <Grid item xs={8}>
           {this.renderSelectField(mocItem.id+'-mocText','text',mocItem.textLabel,true)}
        </Grid>
        <Grid item xs={4}>
          {this.renderMocTextField(mocItem.id+'-mocRecovery','number',mocItem.numLabel,true)}
        </Grid>
      </div>
    );
  }
}
