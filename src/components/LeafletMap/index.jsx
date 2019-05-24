import React, { Component } from "react";

class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = { components: undefined };
    this.markers = new WeakMap();
  }

  componentDidMount() {
    let { Map, Marker, TileLayer, Popup } = require("react-leaflet");
    this.setState({
      components: {
        Map,
        Marker,
        TileLayer,
        Popup,
      },
    });
  }

  render() {
    if (!this.state.components) {
      return null;
    }

    const { Map, Marker, TileLayer, Popup } = this.state.components;
    const {lat, lng, children} = this.props;

    const position = [Number(lat), Number(lng)];
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {children}
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default LeafletMap;
