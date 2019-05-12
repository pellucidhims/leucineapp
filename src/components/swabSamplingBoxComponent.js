import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import MocSection from './mocSection';

export default class SwabSamplingBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      methodUsed: '',
      solventName: '',
      solventQuant: '',
      mocSectionActive: false,
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



  renderMocSection=()=>{
    console.log("inside renderMocSection()()()()()()");
    if(this.state.mocSectionActive){
      let mocItem = {
        id: this.state.mocList.length,
        textLabel: 'Select MOC',
        numLabel: 'Recovery(%)',
        mocVal: '',
        mocRecVal: ''
      }
      this.setState({
        mocList: this.state.mocList.concat(mocItem),
        mocSectionActive: false
      },()=>{
        console.log("mocList:: ",this.state.mocList);
        return this.renderMocItemFunction()})
    }else if(!this.state.mocSectionActive && this.state.mocList.length >0){
      let mocItem = {
        id: this.state.mocList.length,
        textLabel: 'Select MOC',
        numLabel: 'Recovery(%)',
        mocVal: '',
        mocRecVal: ''
      }
      this.setState({
        mocList: this.state.mocList.concat(mocItem),
        mocSectionActive: false
      },()=>{
        console.log("mocList:: ",this.state.mocList);
        this.renderMocItemFunction()})
    }
  }

  renderMocItemFunction=()=>{
    console.log("inside renderMocItemFunction: ",this.state.mocList);
    return this.state.mocList.map((mocItem,index)=>{
      return(
        <div key={mocItem.id}>
          <MocSection mocItemDetail={mocItem}/>
        </div>
      )
    })
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
          alignItems="center">
          <Grid item xs={6}>
            {this.renderTextField('solventName','text','Solvent Name',true)}
          </Grid>
          <Grid item sx={6}>
            {this.renderTextField('solventQuant','number','Solvent Quantity',true)}
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
          direction="row"
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
            {
              !this.state.mocSectionActive && this.state.mocList.length > 0?
              (
                <Button
                  onClick={this.renderMocSection}
                  variant="outlined"
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
