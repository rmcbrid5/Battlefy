import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }
  handleChange(event){
    this.setState({
      value: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <form onSubmit={this.handleSubmit} >
        <img src="https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png"/>
        <h1>SUMMONER HISTORY LOOKUP</h1>
        <label>
          Summoner Name:
          <input className="searchName" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input className="search" type="submit" value="Search" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
