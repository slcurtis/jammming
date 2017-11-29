import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
      /*not sure of line below number 34*/
        {this.props.tracks.map(track => <Track key={track.id}) onAdd={this.props.onAdd}/>
      </div>
    );
  }
}

export default TrackList;
