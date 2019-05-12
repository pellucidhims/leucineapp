import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import TypeResidueBox1 from './typeResidueBox1';
import TypeResidueBox2 from './typeResidueBox2'

import {textFields} from '../data/keys';
import {targetResidueTypes} from '../data/dummyData';


class AnalyticalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrtBox1: false,
      showTrtBox2: false,
      methodId: '',
      residueType: '',
      reason: '',
      showErrorText: ''
    }
  }

  handleChange=(fieldId)=>(e)=>{
    if(fieldId === 'residueType'){
      if(e.target.value.trim() === 'API' || e.target.value.trim() === 'Cleaning Agent'){
        this.setState({
          [fieldId]: e.target.value,
          showTrtBox1: true,
          showTrtBox2: false,
          showErrorText: ''
        })
      }else if(e.target.value.trim() === 'Bioburden' || e.target.value.trim()  === 'Endotoxin'){
        this.setState({
          [fieldId]: e.target.value,
          showTrtBox1: false,
          showTrtBox2: true,
          showErrorText: ''
        })
      }
    }else{
      this.setState({
        [fieldId]: e.target.value,
        showErrorText: ''
      })
    }
  }


  renderMainKeys = (mainKeys) =>{
    return mainKeys.map(mainKey=>{
      if(mainKey.type === 'text'){
        return(
          <div key={mainKey.id}>
            <TextField
              id={mainKey.id}
              label={mainKey.label}
              placeholder={this.state.label}
              margin="normal"
              variant="outlined"
              value={this.state[mainKey.id]}
              onChange={this.handleChange(mainKey.id)}
              fullWidth
              helperText={(<p style={{color:'red'}}>{this.state.showErrorText}</p>)}
              required
            />
          </div>
        )
      }else if(mainKey.type === 'select'){
        return(
          <div key={mainKey.id}>
            <TextField
              id={mainKey.id}
              select
              label={mainKey.label}
              placeholder={this.state.label}
              margin="normal"
              variant="outlined"
              value={this.state[mainKey.id]}
              onChange={this.handleChange(mainKey.id)}
              fullWidth
              helperText={(<p style={{color:'red'}}>{this.state.showErrorText}</p>)}
              required
            >
            {targetResidueTypes.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))
            }
            </TextField>
            {this.state.showTrtBox1 && this.renderTrtBox1()}
            {this.state.showTrtBox2 && this.renderTrtBox2()}
          </div>
        )
      }else{
        return('')
      }

    })
  }


  renderTrtBox1 = () =>{
    return(
      <TypeResidueBox1 />
    )
  }

  renderTrtBox2 = () =>{
    return(
      <TypeResidueBox2 />
    )
  }

  render(){
    return(
        <Grid
          container
          justify='center'
        >
          <Grid item xs={6}>
            <div>
              {this.renderMainKeys(textFields)}
            </div>
          </Grid>
        </Grid>
    );
  }

}

export default AnalyticalForm
