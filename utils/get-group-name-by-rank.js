export function getGroupNameByRank(rankMap, rank) {
    return Object.keys(rankMap).find((key) => rankMap[key] === rank) || 'unknown';
}
