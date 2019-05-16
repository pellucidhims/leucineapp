import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {moc} from '../data/dummyData';

const mocItemStyle = {
  backgroundColor:'yellow',
  borderRadius:'2px',
  border:'solid 1px black'
}

export default class MocSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mocVal: '',
      numVal: '',
    }
  }


  handleChange=(field)=>e=>{
    console.log("e.target val: ",e.target.value );
      this.setState({
        [field]: e.target.value
      },()=>{
        let retMocItem = {
          id: this.props.mocItemDetail.id,
          mocVal: this.state.mocVal,
          mocRecVal: this.state.numVal
        }
        this.props.updateMocItem(retMocItem);
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
        value={this.state.mocVal}
        onChange={this.handleChange('mocVal')}
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
              value={this.state.numVal}
              onChange={this.handleChange('numVal')}
              fullWidth
              required = {req}
            />
    )
  }

  handleDeleteMoc=(idx)=>e=>{
    this.props.deleteMocItem(idx);
  }

  render(){
    console.log("INside MOC SECTION WITH PROP: ", this.props);
    const mocItem = this.props.mocItemDetail;
    console.log("mocItem: ",mocItem, " this.state.mocValue: ", this.state.mocVal, " this.state.numValue: ", this.state.numVal);
      return(
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}
          style={mocItemStyle}
        >
          <Grid item xs={6}>
             {this.renderSelectField(mocItem.id+'-mocText','text',mocItem.textLabel,true)}
          </Grid>
          <Grid item xs={4}>
            {this.renderMocTextField(mocItem.id+'-mocRecovery','number',mocItem.numLabel,true)}
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Remove MOC entry">
            <IconButton
              onClick={this.handleDeleteMoc(mocItem.id)}
            >
              <DeleteIcon />
            </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ); 
  }
}
