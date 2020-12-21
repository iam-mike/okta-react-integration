import React, {Component} from 'react'
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../algorithm/findPermutations';


class HomePage extends Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      inputValue: "ecfwcewefwfwe",
      outputValue: [],
    };
  }
  handleClick() {
    console.log('Click happened');
    console.log('input value was ' + this.state.inputValue); 
    findPermutations(this.state.inputValue);   
  }

 
  

  render(){
    return (
      <div className="container">
      <h1>Home Page</h1>
      <p>This is the home page. <br />I will put some content here soon!</p><br />
      <button onClick={this.handleClick}>Add entry to console log</button>
      
    </div>

    );
  }
}

export default HomePage;
