import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@mui/icons-material/Room';
import {Paper} from '@mui/material'

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 50.84961335944478,
      lng: 4.451087698266893
    },
    zoom: 16
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}`}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <RoomIcon fontSize='large' color='error'
            lat={50.84961335944478}
            lng={4.451087698266893}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;