import React, { useState } from "react";
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails";
import {
  // CircularProgress,
  Typography,
  Grid,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";

interface Props {
  places: never[];
}

const List = ({ places }: Props) => {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("0");
  const classes = useStyles();

  const handleChangeRating = (e: React.ChangeEvent<{ value: unknown }>) =>
    setRating(e.target.value as string);
  const handleChangeType = (e: React.ChangeEvent<{ value: unknown }>) =>
    setType(e.target.value as string);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels and Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleChangeType}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={handleChangeRating}>
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="3">Above 3.0</MenuItem>
          <MenuItem value="4">Above 4.0</MenuItem>
          <MenuItem value="4.5">Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places.map((place, i) => (
          <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
