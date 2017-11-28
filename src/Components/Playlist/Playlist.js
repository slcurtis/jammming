import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <defaultValue={'New Playlist'} />
      /*  <!-- Add a TrackList component -->*/
        <a class="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
