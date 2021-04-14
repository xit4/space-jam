import useSWR from "swr";
import { Player } from "../types";

const fetcher = (url: string, playerID: string | number): Promise<Player> => fetch(url + playerID).then((res) => {
    return res.json();
});

export const usePlayer = (playerID: string | number) => {
    return useSWR<Player>(
        [`https://www.balldontlie.io/api/v1/players/`, playerID],
        fetcher
    );
}