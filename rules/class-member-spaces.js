import { getRelevantMembers } from '../utils/get-relevant-members.js';
import { getMemberGroup } from '../utils/get-member-group.js';
import { getMemberAccessibility } from '../utils/get-member-accessability.js';

export default {
    meta: {
        type: 'layout',
        docs: {
            description: 'Require empty lines between semantic class member blocks.',
            recommended: false
        },
        fixable: 'whitespace',
        schema: [],
        messages: {
            missingLine: 'Expected empty line between "{{previousGroup}}" and "{{currentGroup}}" blocks.',
            extraLine: 'Unexpected empty line within "{{currentGroup}}" block.'
        }
    },

    create(context) {
        const sourceCode = context.sourceCode;

        return {
            ClassBody(node) {
                const members = getRelevantMembers(node.body);

                if (!members.length) {
                    return;
                }

                members.forEach((member, index, members) => {
                    if (!index) {
                        return;
                    }

                    const previousMember = members[index - 1];
                    const previousMemberGroup = getMemberGroup(previousMember);
                    const currentMemberGroup = getMemberGroup(member);
                    const previousMemberAccessibility = getMemberAccessibility(previousMember);
                    const currentMemberAccessibility = getMemberAccessibility(member);

                    const previousMemberGroupName = `${previousMemberAccessibility}-${previousMemberGroup}`;
                    const currentMemberGroupName = `${currentMemberAccessibility}-${currentMemberGroup}`;

                    const emptyLinesCount = sourceCode.lines
                        .slice(previousMember.loc.end.line, member.loc.start.line - 1)
                        .filter((line) => !line.trim().length).length;

                    if (previousMemberGroupName !== currentMemberGroupName) {
                        if (emptyLinesCount !== 1) {
                            context.report({
                                node: member,
                                messageId: 'missingLine',
                                data: {
                                    previousGroup: formatFullGroup(previousMemberGroup, previousMemberAccessibility),
                                    currentGroup: formatFullGroup(currentMemberGroup, currentMemberAccessibility)
                                },
                                fix(fixer) {
                                    return fixer.replaceTextRange(
                                        [
                                            sourceCode.getLastToken(previousMember).range[1],
                                            sourceCode.getFirstToken(member).range[0]
                                        ],
                                        '\n\n'
                                    );
                                }
                            });
                        }

                        return;
                    } else {
                        if (emptyLinesCount) {
                            context.report({
                                node: member,
                                messageId: 'extraLine',
                                data: {
                                    currentGroup: formatFullGroup(currentMemberGroup, currentMemberAccessibility)
                                },
                                fix(fixer) {
                                    return fixer.replaceTextRange(
                                        [
                                            sourceCode.getLastToken(previousMember).range[1],
                                            sourceCode.getFirstToken(member).range[0]
                                        ],
                                        '\n'
                                    );
                                }
                            });
                        }
                    }
                });
            }
        };
    }
};

function formatFullGroup(group, subgroup) {
    const accessMap = {
        0: 'private readonly',
        1: 'private',
        2: 'protected readonly',
        3: 'protected',
        4: 'public readonly',
        5: 'public'
    };
    const access = accessMap[subgroup] || 'unknown';

    return `${group} (${access})`;
}
