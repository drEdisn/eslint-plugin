import { checkIsCallExpression } from './check-call-expression.js';
import { checkIsIdentifier } from './check-identifier.js';

export function checkIsSignalCall(node) {
    if (!checkIsCallExpression(node.value)) {
        return false;
    }

    const callee = node.value.callee;

    return (
        checkIsIdentifier(callee, 'signal') ||
        checkIsIdentifier(callee, 'computed') ||
        checkIsIdentifier(callee, 'effect') ||
        checkIsIdentifier(callee, 'toSignal')
    );
}
