import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import MocSection from './mocSection';
import {getUniqueId} from '../helperFunctions/getUniqueId';


export default class RinseSamplingBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      methodUsed: '',
      solventName: '',
      solventQuant: '',
      mocSectionActive: false,
      set_err_msg_txt: '',
      mocList: [],

    }
  }

  handleChange=(id)=>e=>{
    this.setState({
      [id]: e.target.value
    })
  }

  handleMocSectionDisplay=()=>{
    this.setState({
      mocSectionActive: !this.state.mocSectionActive
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
    console.log("Update entry: ",e);
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
    console.log("Delete entry :",e);
    let newList = this.state.mocList.filter((item)=>{return item.id!==e});
    this.setState({
      mocList: newList,
      set_err_msg_txt:''
    })
  }

  renderMocItemFunction=()=>{
    console.log("inside renderMocItemFunction: ",this.state.mocList);
    return (
      <div style={{width:'80%',borderRadius:'10px'}}>
      <h2>MOC Section</h2>
        <p style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{this.state.set_err_msg_txt}</p>
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



  render(){
    return(
      <Grid container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}
        >
          <Grid item xs={11}>
            {this.renderTextField('methodUsed','text','Method Used',true)}
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
            {this.renderTextField('defaultRec','text','Default Recovery (%)',true)}
          </Grid>
        </Grid>
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
    )
  }
}
