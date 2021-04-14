import React, { useState } from "react";
import { CircularProgress, Container, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Player } from "../types";
import { useHistory } from "react-router";
import { useSearchPlayer } from "../hooks/useSearchPlayer";
import { useDebounce } from "../hooks/useDebounce";

export const Home = () => {
  const [value, setValue] = useState<Player | null>(null);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 500);
  const { data, error } = useSearchPlayer(debouncedInputValue);
  const history = useHistory();
  const isValueLongEnough = debouncedInputValue.length > 2;
  const loading = !data && !error && isValueLongEnough;

  return (
    <Container maxWidth="md">
      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          if (newValue) {
            history.push(`/player/${newValue?.id}`);
          }
        }}
        inputValue={inputValue}
        onInputChange={(_, newValue) => {
          setInputValue(newValue ?? "");
        }}
        options={data ?? []}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        noOptionsText={
          isValueLongEnough
            ? "No players with this name"
            : "Enter at least 3 characters"
        }
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Player name"
            margin="normal"
            variant="outlined"
            helperText="Enter the full name of a player"
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Container>
  );
};
