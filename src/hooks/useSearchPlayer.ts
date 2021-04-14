import useSWR from "swr";
import { Player } from "../types";

const fetcher = (url: string, playerName: string) =>
    fetch(`${url}${playerName}`).then((res) => {
        return res.json();
    }).then(d => d?.data);

export const useSearchPlayer = (playerName: string) => {
    return useSWR<Player[]>(playerName.length > 2 ?
        [`https://www.balldontlie.io/api/v1/players?search=`, playerName] : null,
        fetcher
    );
}