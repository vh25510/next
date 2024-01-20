export enum Rank {
  EXACT = 5,
  WHOLE_LAST_WORD = 4,
  PARTIAL_LAST_WORD = 3,
  PARTIAL = 1,

  NOT_MATCH = 0,
}

export function rank(query: string, matchingData: string): Rank {
  if (!query) return Rank.EXACT;
  query = query.toLowerCase();
  matchingData = matchingData.toLowerCase();
  const queryTerms = query.split(/[ .]+/g);
  
  const regex = new RegExp(queryTerms.join(".*"), "i");
  if (!regex.test(matchingData)) return Rank.NOT_MATCH;

  const matchingTerms = matchingData.split(/[ .]+/g);
  const lastQueryTerm = queryTerms[queryTerms.length - 1];
  const lastMatchingTerm = matchingTerms[matchingTerms.length - 1];

  if (lastQueryTerm === lastMatchingTerm) return Rank.WHOLE_LAST_WORD;
  if (lastMatchingTerm.includes(lastQueryTerm)) return Rank.PARTIAL_LAST_WORD;
  return Rank.PARTIAL;
}
