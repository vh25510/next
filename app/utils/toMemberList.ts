import { rank, Rank } from "./queryRanking";

type Level = 1 | 2 | 3 | 4;

export default (rawData: string | null | undefined, matchingList: string[]) => {
  if (rawData == null) return [];
  const lines = rawData.split(/,/g);
  return lines.reduce((optimizedData, line) => {
    line = line.trim();
    if (line === "") return optimizedData;
    const level = line.startsWith("'")
      ? 1
      : line.endsWith("**")
      ? 4
      : line.endsWith("*")
      ? 3
      : 2;
    line = line.replace("**", "").replace("*", "").replace(/'/g, "");
    const matches = matchingList.reduce(
      (bestMatch, match, index) => {
        const matchRank = rank(line, match);
        if (matchRank > bestMatch.rank) {
          bestMatch.rank = matchRank;
          bestMatch.index = index;
        }
        return bestMatch;
      },
      { rank: Rank.NOT_MATCH, index: -1 }
    );
    if (matches.rank !== Rank.NOT_MATCH) {
      optimizedData.push({ memberId: matches.index, level: level });
    }
    return optimizedData;
  }, [] as { memberId: number; level: Level }[]);
};
