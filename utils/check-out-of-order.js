export function checkIsOutOfOrder(groupRank, subgroup, lastGroupRank, lastSubgroup) {
    return groupRank < lastGroupRank || (groupRank === lastGroupRank && subgroup < lastSubgroup);
}
