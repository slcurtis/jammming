import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: " ",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    /*need to work on lines below #41*/
    if(!tracks.find(trackIndex => trackIndex.id === track.id)){
      tracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
  /*need to work on lines below #49*/
    let newTracks = tracks.filter(trackIndex => trackIndex.id !== track.id);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playListName: name});
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
