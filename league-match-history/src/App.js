import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      summoners: [],
      items: [],
      champions: [],
      id: '',
      profile: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({
      value: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault();
    //static api call to fetch all the summoner spells
    fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/summoner.json")
            .then(res => res.json())
            .then(
            (result) => {
                for (var j in result.data) {
                  //data has unique property names
                    if (result.data.hasOwnProperty(j)) {
                        this.state.summoners.push({
                            key: result.data[j].key,
                            id: result.data[j].id,
                            name: result.data[j].name
                        })
                    }
                }
            })
    //static data api call to fetch the game items
    fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/item.json")
    .then(res => res.json())
    .then(
      (result) => {
        for (var j in result.data) {
          // each game item has a unique property
          if (result.data.hasOwnProperty(j)) {
            var id = result.data[j].image.full;
            id = id.toString().slice(0, 4);
            this.state.items.push({
              key: id,
              name: result.data[j].name
            })
          }
        }
      })
      //static data api call to fetch the champions
      fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json")
            .then(res => res.json())
            .then(
                (result) => {
                    for (var j in result.data) {
                      //each champion has a unique property
                        if (result.data.hasOwnProperty(j)) {
                            this.state.champions.push({
                                key: result.data[j].key,
                                name: result.data[j].name
                            })
                        }
                    }
                })
      fetch("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.state.value + "?api_key="+process.env.REACT_APP_API_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            id: result.accountId,
            profile: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/profileicon/"+result.profileIconId+".png"
          });
        }, (error) => {
          this.setState({
            error
          });
          console.log(error);
        })
  }
  render() {
    var profile = this.state.profile;
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
          <input className="search" type="submit" value="Search" /><br></br><br></br>
          <img className="img-circular" src={profile}/>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
