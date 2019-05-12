import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';


export default class TextFieldComponent extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {id,label,type,req} = this.props
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
}
