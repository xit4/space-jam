import useSWR from "swr";
import { PlayerAverages } from "../types";

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(d => d.data)

export const useAverages = (playerId: string | number) => {
    return useSWR<PlayerAverages[]>(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`,
        fetcher
    );
}