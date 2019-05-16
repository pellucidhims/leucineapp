import React,{Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import SwabSampling2 from './swabSamplingBoxComponent2';
import RinseSampling2 from './rinseSamplingBoxComponent2';

const errorParaStyle={
  backgroundColor:'red',
  color:'white',
  textAlign:'center'
}

export default class TypeResidueBox2 extends Component {
  constructor(props) {
    super(props);
    this.state={
      methodUsed: '',
      defineMLimits: "false",
      tftcLimit: '',
      tntcLimit: '',
      set_err_msg_txt: '',
      swabSamplingOn: false,
      rinseSamplingOn: false
    }
  }

  handleChange=(id)=>e=>{
    console.log("change value for id: ",id," is: ",e.target.value);
    this.setState({
      [id]: e.target.value,
      set_err_msg_txt: ''

    })
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
        required = {req}
      />
    )
  }

  handleSamplingConfig=(samplingType)=>e=>{
    if(this.state.defineMLimits==="true"){
      if((this.state.tftcLimit.trim()===""||this.state.tntcLimit.trim()==="")){
        this.setState({
          set_err_msg_txt: 'Please enter the required TNTC and TFTC values'
        })
      }else{
        this.setState({
          [samplingType]: !this.state[samplingType]
        })
      }
    }else{
      this.setState({
        [samplingType]: !this.state[samplingType]
      })
    }
  }

  renderSwabSamplingBox=()=>{
    return (
      <div style={{backgroundColor:'lightgreen',marginTop:'1rem'}}>
        <Grid container>
          <SwabSampling2 />
        </Grid>
      </div>
    );
  }

  renderRinseSamplingBox=()=>{
    return (
      <div style={{backgroundColor:'darkgrey',marginTop:'1rem'}}>
        <Grid container>
          <RinseSampling2 />
        </Grid>
      </div>
    );
  }

  renderLimits=()=>{
    return(
      <div style={{display: 'flex',marginLeft:'4%',marginTop:'2%'}}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">*Define TNTC and TFTC Limits?</FormLabel>
            <RadioGroup
                row
                aria-label="Limits"
                name="limits"
                value={this.state.defineMLimits}
                onChange={this.handleChange('defineMLimits')}
                style={{margin: '5px 0'}}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="secondary" />}
                  label="Yes" />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" />}
                  label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      </div>
    )
  }

  renderLimitFields=()=>{
    return(
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={5}>
          {this.renderTextFields('tntcLimit','number','TNTC Limit(in CFU)',true)}
        </Grid>
        <Grid item xs={5}>
          {this.renderTextFields('tftcLimit','number','TFTC Limit(in CFU)',true)}
        </Grid>
      </Grid>
    )
  }

  render(){
    console.log("this is the state now: ",this.state);
    return(
      <div style={{backgroundColor:'#eeeeee',borderRadius:'4px'}}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={24}
      >
        <Grid item xs={11}>
          {this.renderTextFields('methodUsed','text','Method Used',true)}
        </Grid>
      </Grid>
      {this.renderLimits()}
      {this.state.defineMLimits==="true"?this.renderLimitFields():''}
      {this.state.set_err_msg_txt?<p style={errorParaStyle}>{this.state.set_err_msg_txt}</p>:''}
      <br/>
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
      </div>
    </div>
    )
  }
}
