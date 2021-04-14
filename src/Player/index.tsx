import React, { SyntheticEvent, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  Paper,
  TableBody,
  Tooltip,
} from "@material-ui/core";
import { useParams } from "react-router";
import { AveragesKeys } from "../types";
import { usePlayer } from "../hooks/usePlayer";
import { useAverages } from "../hooks/useAverages";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  root: { marginTop: "1em" },
  media: {
    height: "100%",
  },
});

const COLUMNS: AveragesKeys[] = ["season", "games_played", "pts", "min"];

export const Player = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playerData } = usePlayer(id);
  const { data: playerAverages } = useAverages(id);

  const [useFallbackImage, setUseFallbackImage] = useState(false);
  const classes = useStyles();

  const playerHeight =
    playerData?.height_feet &&
    `${playerData?.height_feet}${
      playerData?.height_inches ? `.${playerData?.height_inches}` : ""
    }`;
  const playerHeightLabel = `Height: ${
    playerHeight ? `${playerHeight} ft` : "N/A"
  }`;
  const playerWeightLabel = `Weight: ${
    playerData?.weight_pounds ? `${playerData?.weight_pounds} lb` : "N/A"
  }`;
  const playerFullname = `${playerData?.first_name} ${playerData?.last_name}`;

  const playerImage = useFallbackImage
    ? "https://i.imgur.com/ZnmxTm8.png"
    : `https://nba-players.herokuapp.com/players/${playerData?.last_name}/${playerData?.first_name}`;

  const loading = !playerData && !playerAverages;

  const playerTitle = `${playerFullname} ${
    playerData?.position ? `(${playerData?.position})` : ""
  }`;

  return (
    <Container maxWidth="md">
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={4}>
            {loading ? (
              <Skeleton />
            ) : (
              <CardMedia
                className={classes.media}
                image={playerImage}
                title={playerFullname}
                component="img"
                onError={(_: SyntheticEvent) => setUseFallbackImage(true)}
              />
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDirection="column">
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Typography gutterBottom variant="h3">
                      {playerTitle}
                    </Typography>
                  )}
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Box display="flex">
                      <Box mr={3}>
                        <Typography gutterBottom variant="h6">
                          {playerHeightLabel}
                        </Typography>
                      </Box>

                      <Typography gutterBottom variant="h6">
                        {playerWeightLabel}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box>
                  <Tooltip title={playerData?.team.full_name ?? ""}>
                    <Typography>{playerData?.team.abbreviation}</Typography>
                  </Tooltip>
                </Box>
              </Box>
              {playerAverages && (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {COLUMNS.map((column) => (
                          <TableCell key={column}>{column}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {COLUMNS.map((column) => (
                          <TableCell key={column + "body"}>
                            {playerAverages[0]?.[column as AveragesKeys] ??
                              "N/A"}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
