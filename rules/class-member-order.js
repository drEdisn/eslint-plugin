import { getMemberGroup } from '../utils/get-member-group.js';
import { getMemberAccessibility } from '../utils/get-member-accessability.js';
import { getRelevantMembers } from '../utils/get-relevant-members.js';
import { getGroupNameByRank } from '../utils/get-group-name-by-rank.js';
import { checkIsOutOfOrder } from '../utils/check-out-of-order.js';

export default {
    meta: {
        type: 'layout',
        docs: {
            description:
                'Enforce semantic order of class members: inject, constants, signals, default, viewChild, inputOutput, accessor.',
            recommended: false
        },
        schema: [],
        messages: {
            wrongOrder:
                'Class members are not in the required order. Expected group: {{expectedGroup}}, found: {{actualGroup}}.'
        }
    },

    create(context) {
        const GROUP_RANK_MAP = {
            inject: 0,
            constants: 1,
            default: 2,
            select: 3,
            signals: 4,
            viewChild: 5,
            inputOutput: 6,
            accessor: 7
        };

        return {
            ClassBody(node) {
                const members = getRelevantMembers(node.body);

                if (!members.length) {
                    return;
                }

                let lastGroupRank = -1;
                let lastAccessibilityRank = -1;

                members.forEach((member) => {
                    const group = getMemberGroup(member);
                    const accessibilityRank = getMemberAccessibility(member);
                    const groupRank = GROUP_RANK_MAP[group];

                    if (checkIsOutOfOrder(groupRank, accessibilityRank, lastGroupRank, lastAccessibilityRank)) {
                        return context.report({
                            node: member,
                            messageId: 'wrongOrder',
                            data: {
                                expectedGroup: getGroupNameByRank(GROUP_RANK_MAP, lastGroupRank),
                                actualGroup: group
                            }
                        });
                    }

                    lastGroupRank = groupRank;
                    lastAccessibilityRank = accessibilityRank;
                });
            }
        };
    }
};
