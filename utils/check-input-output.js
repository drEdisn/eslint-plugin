import { checkIsCallExpression } from './check-call-expression.js';
import { checkIsIdentifier } from './check-identifier.js';
import { checkIsMemberExpressionWithObjectAndProperty } from './check-member-expression.js';

export function checkIsInputOutputCall(node) {
    if (!checkIsCallExpression(node.value)) {
        return false;
    }

    const callee = node.value.callee;

    if (checkIsIdentifier(callee, 'input') || checkIsIdentifier(callee, 'model')) {
        return true;
    }

    return checkIsMemberExpressionWithObjectAndProperty(callee, 'input', ['required', 'transform']);
}
