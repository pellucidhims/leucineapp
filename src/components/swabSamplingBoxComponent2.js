import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import MocSection from './mocSection';
import {getUniqueId} from '../helperFunctions/getUniqueId';

export default class SwabSampling2 extends Component{
  constructor(props){
    super(props);
    this.state = {
      mocSectionActive: false,
      mocList:[],
      defaultRec: '',
      recoveryInd: "true",
      set_err_msg_txt: ''
    }
  }

  handleChange=(id)=>e=>{
    this.setState({
      [id]: e.target.value,
      set_err_msg_txt: ''
    })
  }

  renderTextField = (id,type,label,req=false) =>{
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

  handleMocSectionDisplay=()=>{
    if(this.state.recoveryInd === "true" && this.state.defaultRec.trim() === "" ){
          this.setState({
            set_err_msg_txt:'Please fill required recovery'
          })
    }else{
        this.setState({
          mocSectionActive: !this.state.mocSectionActive
        })
    }

  }

  renderMocSection=()=>{
    if(this.state.mocSectionActive){
      let mocItem = {
        id: getUniqueId('moc'),
        textLabel: 'Select MOC',
        numLabel: 'Recovery(%)',
        mocVal: '',
        mocRecVal: ''
      }
      this.setState({
        mocList: this.state.mocList.concat(mocItem),
        mocSectionActive: false
      })
    }else if(!this.state.mocSectionActive && this.state.mocList.length >0){
      if(this.allItemsFilled(this.state.mocList)){
        let mocItem = {
          id: getUniqueId('moc'),
          textLabel: 'Select MOC',
          numLabel: 'Recovery(%)',
          mocVal: '',
          mocRecVal: ''
        }
        this.setState({
          mocList: this.state.mocList.concat(mocItem),
          mocSectionActive: false
        })
      }else{
        this.setState({
          set_err_msg_txt: 'Please provide relevant MOC details'
        })
      }
    }
  }

  updateMocItemFunc=(e)=>{
    let newUpdatedList = this.state.mocList.map((item)=>{
      if(item.id===e.id){
        console.log("MATCHED: item:",item," e: ",e);
        item.mocVal = e.mocVal;
        item.mocRecVal = e.mocRecVal
      }
      return item;
    });
    this.setState({
      mocList: newUpdatedList,
      set_err_msg_txt: ''
    })
  }

  deleteMocItemFunc=(e)=>{
    let newList = this.state.mocList.filter((item)=>{return item.id!==e});
    this.setState({
      mocList: newList,
      set_err_msg_txt:''
    })
  }

  renderMocItemFunction=()=>{
    return (
      <div style={{width:'80%',borderRadius:'10px'}}>
      <h2>MOC Section</h2>
        {this.state.mocList.map((mocItem)=>{
        console.log("this is current mocItem: ",mocItem);
        return(
            <MocSection key={mocItem.id}
              mocItemDetail={mocItem}
              deleteMocItem={this.deleteMocItemFunc}
              updateMocItem={this.updateMocItemFunc}
            />
          )
      })}
    </div>)
  }

  allItemsFilled=(mocList)=>{
    let ind = true;
    for(let item of mocList){
      if(item.mocVal.trim()===""||item.mocRecVal.trim()===""){
        ind = false;
        break;
      }
    }
    return ind;
  }

  render(){
    return(
      <Grid container>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={5}>
        <FormControl component="fieldset">
          <FormLabel component="legend">*Use Recovery for Swab?</FormLabel>
          <RadioGroup
              row
              aria-label="Recovery"
              name="recovery"
              value={this.state.recoveryInd}
              onChange={this.handleChange('recoveryInd')}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Yes" />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="No" />
          </RadioGroup>
        </FormControl>
        </Grid>
        <Grid item xs={5}>
          {this.renderTextField('defaultRec','number','Default Recovery',true)}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid
          item
          style={{backgroundColor:'red',color:'white'}}>
          {this.state.set_err_msg_txt}
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          spacing={24}
        >
            {this.state.mocSectionActive? this.renderMocSection() :
              this.state.mocList.length <= 0 ?
                (<Grid item xs={11}>
                  <Button
                    onClick={this.handleMocSectionDisplay}
                    variant="outlined"
                  >
                  Add MOC
                 </Button>
               </Grid>) : ''
            }
            {this.state.mocList.length>0?
              this.renderMocItemFunction():''
            }
            {
              !this.state.mocSectionActive && this.state.mocList.length > 0?
              (
                <Button
                  onClick={this.renderMocSection}
                  variant="contained"
                  color="primary"
                >
                  Add Another
                </Button>
              )
              :''
            }
        </Grid>
      </Grid>
      </Grid>
    )
  }
}
