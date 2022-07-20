import React, { useEffect, useState } from "react";
import { HomePageWrapper, MaterialGrid } from "./styles";
import { getPlacesData } from "../../api";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";
import { Bounds, Coordinates } from "./types";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [bounds, setBounds] = useState<Bounds | null>(null);

  useEffect(() => {
    getPlacesData().then(data => setPlaces(data));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
    );
  }, []);

  console.log(places, bounds, 999);

  return (
    <HomePageWrapper>
      <Header />
      <MaterialGrid container>
        <MaterialGrid item xs={12} md={4}>
          <List />
        </MaterialGrid>
        <MaterialGrid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </MaterialGrid>
      </MaterialGrid>
    </HomePageWrapper>
  );
};

export default HomePage;
