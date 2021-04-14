export type Team = {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

export type Player = {
    id: number;
    first_name: string;
    height_feet: number | null;
    height_inches: number | null;
    last_name: string;
    position: string;
    team: Team;
    weight_pounds: number | null;
}

export type Meta = {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
}

export type PlayersResponse = {
    data: Player[];
    meta: Meta;
}

export type PlayerAveragesResponse = {
    data: PlayerAverages[];
}

export type PlayerAverages = {
    games_played: number;
    player_id: number;
    season: number;
    min: string;
    fgm: number;
    fga: number;
    fg3m: number;
    fg3a: number;
    ftm: number;
    fta: number;
    oreb: number;
    dreb: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    turnover: number;
    pf: number;
    pts: number;
    fg_pct: number;
    fg3_pct: number;
    ft_pct: number;
}

export type AveragesKeys = keyof PlayerAverages;