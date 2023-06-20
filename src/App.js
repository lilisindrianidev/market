import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import {NavbarComponent} from "./Components/index.js"
import {Sukses, Home} from './pages';

export default class App extends Component{
  render(){
    return(
      <BrowserRouter basename={window.location.pathname || '*'}>
        <NavbarComponent/>
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/sukses" component={Sukses}exact />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
 

