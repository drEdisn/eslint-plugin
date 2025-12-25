import { checkIsCallExpression } from './check-call-expression.js';

export function checkIsSelectCall(node) {
    if (!checkIsCallExpression(node.value)) {
        return false;
    }

    const callee = node.value.callee;

    return (
        callee.type === 'MemberExpression' &&
        callee.property.type === 'Identifier' &&
        callee.property.name === 'selectSignal'
    );
}
