import { retry } from "../utils";
import { type LolalyticsRole } from "./roles";

export type LolalyticsChampion2Response = {
    team_h: string[];
    team: Team;
    response: Response;
};

export type Response = {
    valid: boolean;
    duration: string;
};

export type Team = {
    top: Array<number[]>;
    middle: Array<number[]>;
    bottom: Array<number[]>;
    support: Array<number[]>;
    jungle: Array<number[]>;
};

export async function getLolalyticsQwikChampion2(
    patch: string,
    championId: string,
    role?: LolalyticsRole,
    // matchupId?: string,
    // matchupRole?: LolalyticsRole
) {
    championId = championId.toLowerCase();
    if (championId === "monkeyking") {
        championId = "wukong";
    }
    // Fork requirement: strictly use 30 days (patch=30) and all ranks (tier=all)
    patch = "30";

    // https://a1.lolalytics.com/mega/?ep=build-team&v=1&patch=30&c=wukong&lane=bottom&tier=all&queue=ranked&region=all
    const queryParams = new URLSearchParams();
    queryParams.append("ep", "build-team");
    queryParams.append("v", "1");
    queryParams.append("tier", "all");
    queryParams.append("queue", "ranked");
    queryParams.append("region", "all");
    queryParams.append("patch", "30");
    queryParams.append("c", championId);
    queryParams.append("lane", role ?? "all"); // all is default?
    // if (matchupId && matchupRole) {
    //     queryParams.append("matchup", matchupId);
    //     queryParams.append("vslane", matchupRole);
    // }

    const res = await retry(() =>
        fetch(`https://a1.lolalytics.com/mega/?${queryParams.toString()}`),
    );

    const json = (await res.json()) as LolalyticsChampion2Response;

    return json;
}
