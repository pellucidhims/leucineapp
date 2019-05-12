import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



export default class RinseSamplingBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      methodUsed: '',
      solventName: '',
      solventQuant: ''
    }
  }

  handleChange=(id)=>e=>{
    this.setState({
      [id]: e.target.value
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

  render(){
    return(
      <div>
        <Grid container>
          <Grid item>
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
      </div>
    )
  }
}
