import React, {Component} from 'react';
import {fire} from '../../firebase';
import $ from "jquery";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Temp extends Component {

  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }

  logout()
  {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <h1> T </h1>     
      </div>
      
    );
  }
}

export default Temp;