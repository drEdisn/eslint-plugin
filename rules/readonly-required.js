export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Public and protected class properties must be readonly.',
            recommended: true
        },
        schema: [],
        messages: {
            mutablePublicProperty: 'Public/protected properties must be readonly to preserve encapsulation.'
        }
    },
    create(context) {
        return {
            PropertyDefinition(node) {
                if (!checkForAccessability(node)) {
                    return;
                }

                context.report({
                    node,
                    message: 'Public/protected properties must be readonly to preserve encapsulation.'
                });
            }
        };
    }
};

function checkForAccessability(node) {
    return (node.accessibility === 'public' || node.accessibility === 'protected') && !node.readonly && !node.declare;
}
