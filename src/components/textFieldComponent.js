import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import {targetResidueTypes} from '../data/dummyData';

export default class TextFieldComponent extends Component{
  constructor(props){
    super(props);
    this.textInput = React.createRef();
    this.state = {
      fieldId: '',
      fieldLabel: '',
      fieldType: '',
      fieldValue:'',
      showErrorText: ''
    }
  }
  componentWillMount(){
    this.setState({
      fieldId: this.props.fieldComponent.id,
      fieldLabel: this.props.fieldComponent.label,
      fieldType: this.props.fieldComponent.type
    })
  }

  componentDidMount(){
    if(this.state.fieldLabel === undefined || this.state.fieldId === undefined || this.state.fieldType === undefined){
      this.setState({
        fieldId: this.props.fieldComponent.id,
        fieldLabel: this.props.fieldComponent.label,
        fieldType: this.props.fieldComponent.type
      });
    }
  }

  handleChange=(fieldId, fieldTyp)=>(e)=>{
    if(fieldTyp=== 'text'){
        this.setState({
          fieldValue: e.target.value,
          showErrorText: ''
        })
    }else if(fieldTyp === 'select'){
      this.setState({
        fieldValue: e.target.value,
        showErrorText: ''
      })
    }else{
      console.log('Invalid Field Type');
    }
  }

  focus=()=> {
   console.log("this.textInput: ",this.textInput);
   this.textInput.focus();

 }

  shouldComponentUpdate(nextProps,nextState){
    console.log("nextProps:: ",nextProps);
    console.log("nextState:: ",nextState);
    console.log("this.state:: ", this.state);
    return nextState.fieldValue !== this.state.fieldValue;
  }

  handleFocusOut=()=>{
    if(this.state.fieldValue === undefined ||this.state.fieldValue.trim()===''){
      this.setState({
        showErrorText: 'Field can not be empty'
      })
      this.focus();
    }else{
      console.log("this.state.fieldId::: ",this.state.fieldId);
      console.log("this.state.fieldValue::: ",this.state.fieldValue);
      let retObj = {
        id: this.state.fieldId,
        value: this.state.fieldValue
      }
      return this.props.returnedValue(retObj);
    }
  }


  render(){
      console.log("value of text field - ",this.state.fieldId," is: ", this.state.fieldValue );
      if (this.state.fieldId && this.state.fieldLabel && this.state.fieldType){
        if(this.state.fieldType === 'text'){
            return(
             <TextField
               id={this.state.fieldId}
               label={this.state.fieldLabel}
               placeholder={this.state.fieldLabel}
               margin="normal"
               variant="outlined"
               value={this.state.fieldValue}
               onChange={this.handleChange(this.state.fieldId, this.state.fieldType)}
               fullWidth
               helperText={(<p style={{color:'red'}}>{this.state.showErrorText}</p>)}
               onBlur={this.handleFocusOut}
               inputProps={{ref: input => this.textInput = input}}
               required
             />
           )
        }else if(this.state.fieldType === 'select'){
            return(
             <TextField
               id={this.state.fieldId}
               select
               fullWidth
               label={this.state.fieldLabel}
               placeholder={this.state.fieldLabel}
               margin="normal"
               variant="outlined"
               value={this.state.fieldValue}
               onChange={this.handleChange(this.state.fieldId, this.state.fieldType)}
               helperText={(<p style={{color:'red'}}>{this.state.showErrorText}</p>)}
               onBlur={this.handleFocusOut}
               inputProps={{ref: input => this.textInput = input}}
             >
             {targetResidueTypes.map(option => (
                 <MenuItem key={option} value={option}>
                   {option}
                 </MenuItem>
               ))
             }
             </TextField>
           )
        }else{
          return(
            <p>Unhandled field type</p>
          )
        }
      }else{
        return(
          <p>Loading text fields...</p>
        )
      }
  }

}
