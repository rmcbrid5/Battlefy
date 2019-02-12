import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            matches: [],
            id: '',
            profile: '',
            gameIds: [],
            champId: '',
            playedMatches: [''],
            playerMatches: [],
            championName: '',
            champions: [],
            currentChamp: '',
            items: [],
            summonerSpells0: [],
            summonerSpells1: [],
            summonerSpells2: [],
            summonerSpells3: [],
            summonerSpells4: [],
            summonerSpells5: [],
            summonerSpells6: [],
            summonerSpells7: [],
            summonerSpells8: [],
            summonerSpells9: [],
            summonerSpells10: [],
            summonerSpells11: [],
            summonerSpells12: [],
            summonerSpells13: [],
            summonerSpells14: [],
            itemNames0: [],
            itemNames1: [],
            itemNames2: [],
            itemNames3: [],
            itemNames4: [],
            itemNames5: [],
            itemNames6: [],
            itemNames7: [],
            itemNames8: [],
            itemNames9: [],
            itemNames10: [],
            itemNames11: [],
            itemNames12: [],
            itemNames13: [],
            itemNames14: [],
            summoners: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/summoner.json")
            .then(res => res.json())
            .then(
            (result) => {
                for (var j in result.data) {
                    if (result.data.hasOwnProperty(j)) {
                        this.state.summoners.push({
                            key: result.data[j].key,
                            id: result.data[j].id,
                            name: result.data[j].name
                        })
                    }
                }
            })
        fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/item.json")
            .then(res => res.json())
            .then(
                (result) => {
                    for (var j in result.data) {
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
        fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json")
            .then(res => res.json())
            .then(
                (result) => {
                    for (var j in result.data) {
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
                    fetch("https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + this.state.id + "?api_key="+process.env.REACT_APP_API_KEY)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                this.setState({
                                    playedMatches: result
                                })
                                var newIds = [];
                                for (var i = 0; i < result.matches.length; i++) {
                                    newIds.push({
                                        game: result.matches[i].gameId,
                                        champ: result.matches[i].champion
                                    })
                                }
                                this.setState({
                                    gameIds: newIds
                                })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[0].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[0].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists)/deaths;
                                                    console.log(parseFloat(KDA));
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var a = 0; a < items.length; a++) {
                                                        for (var b = 0; b < this.state.items.length; b++) {
                                                            if (items[a] == this.state.items[b].key) {
                                                                this.state.itemNames0.push({
                                                                    name: this.state.items[b].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[b].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells0.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[0].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(0,0,{
                                                        gameId: this.state.gameIds[0],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/"+this.state.championName+".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames0,
                                                        spells: this.state.summonerSpells0,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[1].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[1].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames1.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key+".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells1.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/"+this.state.summoners[q].id+".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[1].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(1,0,{
                                                        gameId: this.state.gameIds[1],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames1,
                                                        spells: this.state.summonerSpells1,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[2].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[2].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames2.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells2.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[2].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(2,0,{
                                                        gameId: this.state.gameIds[2],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames2,
                                                        spells: this.state.summonerSpells2,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[3].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[3].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames3.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells3.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[3].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(3,0,{
                                                        gameId: this.state.gameIds[3],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames3,
                                                        spells: this.state.summonerSpells3,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[4].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[4].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames4.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells4.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[4].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(4,0,{
                                                        gameId: this.state.gameIds[4],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames4,
                                                        spells: this.state.summonerSpells4,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[5].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[5].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames5.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells5.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[5].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(5,0,{
                                                        gameId: this.state.gameIds[5],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames5,
                                                        spells: this.state.summonerSpells5,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[6].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[6].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames6.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells6.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[6].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(6,0,{
                                                        gameId: this.state.gameIds[6],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames6,
                                                        spells: this.state.summonerSpells6,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[7].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[7].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames7.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells7.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[7].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(7,0,{
                                                        gameId: this.state.gameIds[7],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames7,
                                                        spells: this.state.summonerSpells7,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[8].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[8].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames8.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells8.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[8].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(8,0,{
                                                        gameId: this.state.gameIds[8],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames8,
                                                        spells: this.state.summonerSpells8,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[9].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[9].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames9.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells9.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[9].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(9,0,{
                                                        gameId: this.state.gameIds[9],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames9,
                                                        spells: this.state.summonerSpells9,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[10].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[10].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames10.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells10.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[10].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(10,0,{
                                                        gameId: this.state.gameIds[10],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames10,
                                                        spells: this.state.summonerSpells10,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[11].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[11].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames11.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells11.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[11].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(11,0,{
                                                        gameId: this.state.gameIds[11],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames11,
                                                        spells: this.state.summonerSpells11,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[12].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[12].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames12.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells12.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[12].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(12,0,{
                                                        gameId: this.state.gameIds[12],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames12,
                                                        spells: this.state.summonerSpells12,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[13].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[13].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames13.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells13.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[13].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(13,0,{
                                                        gameId: this.state.gameIds[13],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames13,
                                                        spells: this.state.summonerSpells13,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                    })
                                fetch("https://na1.api.riotgames.com/lol/match/v4/matches/" + this.state.gameIds[14].game + "?api_key="+process.env.REACT_APP_API_KEY)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            this.setState({
                                                currentChamp: this.state.gameIds[14].champ
                                            })
                                            var duration1 = result.gameDuration;
                                            var minutes = Math.floor(duration1 / 60);
                                            var seconds = duration1 - minutes * 60;
                                            var duration = minutes + "." + seconds;
                                            for (var k = 0; k < result.participants.length; k++) {
                                                if (result.participants[k].championId == this.state.currentChamp) {
                                                    var outcome = result.participants[k].stats.win;
                                                    if (outcome) {
                                                        outcome = "Victory";
                                                    }
                                                    else {
                                                        outcome = "Defeat";
                                                    }
                                                    var kills = result.participants[k].stats.kills;
                                                    var assists = result.participants[k].stats.assists;
                                                    var deaths = result.participants[k].stats.deaths;
                                                    var KDA = (kills + assists) / deaths;
                                                    var items = [result.participants[k].stats.item0, result.participants[k].stats.item1, result.participants[k].stats.item2, result.participants[k].stats.item3, result.participants[k].stats.item4, result.participants[k].stats.item5, result.participants[k].stats.item6];
                                                    for (var p = 0; p < items.length; p++) {
                                                        for (var q = 0; q < this.state.items.length; q++) {
                                                            if (items[p] == this.state.items[q].key) {
                                                                this.state.itemNames14.push({
                                                                    name: this.state.items[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + this.state.items[q].key + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var summonerSpells = [result.participants[k].spell1Id, result.participants[k].spell2Id];
                                                    for (var p = 0; p < summonerSpells.length; p++) {
                                                        for (var q = 0; q < this.state.summoners.length; q++) {
                                                            if (summonerSpells[p] == this.state.summoners[q].key) {
                                                                this.state.summonerSpells14.push({
                                                                    name: this.state.summoners[q].name,
                                                                    image: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + this.state.summoners[q].id + ".png"
                                                                });
                                                            }
                                                        }
                                                    }
                                                    var level = result.participants[k].stats.champLevel;
                                                    var creepScore = result.participants[k].stats.totalMinionsKilled;
                                                    var creepScorePerMinute = creepScore / duration;
                                                    creepScorePerMinute = Math.round(creepScorePerMinute * 100) / 100;
                                                    for (var q = 0; q < this.state.champions.length; q++) {
                                                        if (this.state.champions[q].key == this.state.gameIds[14].champ) {
                                                            this.setState({
                                                                championName: this.state.champions[q].name
                                                            })
                                                        }
                                                    }
                                                    this.state.matches.splice(14,0,{
                                                        gameId: this.state.gameIds[14],
                                                        championName: this.state.championName,
                                                        championImage: "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/" + this.state.championName + ".png",
                                                        outcome: outcome,
                                                        gameDuration: duration,
                                                        summonerName: this.state.value,
                                                        level: level,
                                                        creepScore: creepScore,
                                                        items: this.state.itemNames14,
                                                        spells: this.state.summonerSpells14,
                                                        profile: this.state.profile,
                                                        creepScorePerMinute: creepScorePerMinute,
                                                        KDA: KDA
                                                    })
                                                    console.log(this.state.matches);
                                                }
                                            }
                                        }, (error) => {
                                            this.setState({
                                                error
                                            });
                                        })
                            }, (error) => {
                                this.setState({
                                    error
                                });
                                console.log(error);
                            })
                })
        return false;
    }
    render() {
        const matches = this.state.matches;
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
