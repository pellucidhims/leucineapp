import React,{Component} from 'react';
import Button from '@material-ui/core/Button';

export default class ConformationButtons extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={{position:'fixed',bottom:'5%',right:'10%'}}>
          <div style={{display:'inline-block',marginRight:'10px'}}>
            <Button
              color="primary"
              variant="outlined"
              style={{textAlign:'center'}}>CANCEL</Button>
          </div>
          <div style={{display:'inline-block',float:'right'}}>
            <Button
              color="primary"
              variant="contained"
              style={{textAlign:'center'}}>UPDATE</Button>
          </div>
      </div>
    )
  }
}
