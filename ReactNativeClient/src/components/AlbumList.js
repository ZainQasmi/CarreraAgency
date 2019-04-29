import React, { Component } from "react";
import { ScrollView } from "react-native";
import AlbumDetail from "./AlbumDetail";
import axios from "axios";
import { Spinner, CardSection } from "./common";

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    axios
      .get("https://rallycoding.herokuapp.com/api/music_albums")
      .then(response => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    if (this.state.albums.length < 1) {
      console.log("here");
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      );
    } else {
      return this.state.albums.map(album => (
        <AlbumDetail key={album.url} album={album} />
      ));
    }
  }

  render() {
    return <ScrollView>{this.renderAlbums()}</ScrollView>;
  }
}

export default AlbumList;
