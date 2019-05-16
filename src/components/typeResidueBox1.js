import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import RinseSamplingBox from './rinseSamplingBoxComponent';
import SwabSamplingBox from './swabSamplingBoxComponent';

const errorParaStyle = {
  backgroundColor:'red',
  color:'white',
  textAlign:'center'
}

export default class TypeResidueBox1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lodValue: '',
      loqValue: '',
      swabSamplingOn: false,
      rinseSamplingOn: false,
      set_err_msg_txt: ''
    }
  }

  handleChange=(id)=>e=>{
    this.setState({
      [id]: e.target.value,
      set_err_msg_txt:''
    })
  }

  handleSamplingConfig=(samplingType)=>e=>{
    if((this.state.lodValue.trim()===""||this.state.loqValue.trim()==="")){
      this.setState({
        set_err_msg_txt: 'Please enter the required LOD and LOQ values'
      })
    }else{
      this.setState({
        [samplingType]: !this.state[samplingType]
      })
    }

  }

  renderSwabSamplingBox=()=>{
    return(
      <div style={{backgroundColor:'lightgreen',marginTop:'1rem'}}>
        <Grid container>
          <SwabSamplingBox />
        </Grid>
      </div>
    )
  }

  renderRinseSamplingBox=()=>{
    return(
      <div style={{backgroundColor:'darkgrey',marginTop:'1rem'}}>
        <Grid container>
          <RinseSamplingBox />
        </Grid>
      </div>
    )
  }

  renderTextFields = (id,type,label,req=false) =>{
    return(
      <TextField
        id={id}
        label={label}
        placeholder={label}
        type={type}
        margin="normal"
        variant="outlined"
        value={this.state[id]}
        onChange={this.handleChange(id)}
        fullWidth
        helperText={(<p style={{color:'red'}}>{this.state.showErrorText}</p>)}
        required = {req}
      />
    )
  }

  render(){
    return(
      <div style={{backgroundColor:'#eeeeee',borderRadius:'4px'}}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          {this.renderTextFields('lodValue','number','LOD(in ppm)',true)}
        </Grid>
        <Grid item>
          {this.renderTextFields('loqValue','number','LOQ(in ppm)',true)}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={24}
      >
        <Grid item xs={11}>
        <p style={errorParaStyle}>{this.state.set_err_msg_txt}</p>
        </Grid>
      </Grid>
      <div>
        <div>
          <Button
            color={this.state.swabSamplingOn?"tertiary":"secondary"}
            onClick={this.handleSamplingConfig('swabSamplingOn')}
            variant="outlined"
            style={{width:'100%'}}
          >
            {this.state.swabSamplingOn?" - Remove Swab Sampling Parameters":" + Configure Swab Sampling Parameters"}
          </Button>
          {this.state.swabSamplingOn && this.renderSwabSamplingBox()}
        </div>
        <br/>
        <div>
          <Button
            color={this.state.rinseSamplingOn?"tertiary":"secondary"}
            onClick={this.handleSamplingConfig('rinseSamplingOn')}
            variant="outlined"
            style={{width:'100%'}}
          >
            {this.state.rinseSamplingOn?" - Remove Rinse Sampling Parameters":" + Configure Rinse Sampling Parameters"}
          </Button>
            {this.state.rinseSamplingOn && this.renderRinseSamplingBox()}
        </div>
        <br/>
      </div>
      </div>
    )
  }
}
