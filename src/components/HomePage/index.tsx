import React, { useEffect, useState } from "react";
import { HomePageWrapper, MaterialGrid } from "./styles";
import { getPlacesData } from "../../api";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";
import { Bounds, Coordinates } from "./types";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [bounds, setBounds] = useState<Bounds | null>(null);

  useEffect(() => {
    if (bounds?.ne && bounds.sw) {
      getPlacesData(bounds.sw, bounds.ne).then(data => setPlaces(data));
    }
  }, [bounds]);

  useEffect(() => {
    if (!coordinates) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude });
        },
      );
    }
  }, [coordinates]);

  return (
    <HomePageWrapper>
      <Header />
      <MaterialGrid container>
        <MaterialGrid item xs={12} md={4}>
          <List />
        </MaterialGrid>
        <MaterialGrid item xs={12} md={8}>
          {coordinates && (
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
            />
          )}
        </MaterialGrid>
      </MaterialGrid>
    </HomePageWrapper>
  );
};

export default HomePage;
