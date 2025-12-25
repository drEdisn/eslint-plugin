import { checkIsCallExpression } from './check-call-expression.js';
import { checkHasDecoratorNamed } from './check-decorator.js';
import { checkIsIdentifier } from './check-identifier.js';
import { checkIsSignalCall } from './check-signal-call.js';
import { checkIsInputOutputCall } from './check-input-output.js';

export function checkIsAccessor(node) {
    return node.type === 'MethodDefinition' && (node.kind === 'get' || node.kind === 'set');
}

export function checkIsInjectCall(node) {
    return checkIsCallExpression(node.value) && checkIsIdentifier(node.value.callee, 'inject');
}

export function checkIsConstant(node) {
    const name = node.key?.name || '';
    return node.readonly && /^[A-Z_][A-Z0-9_]*$/.test(name);
}

export function checkIsViewChildOrContentChild(node) {
    return checkHasDecoratorNamed(node, 'ViewChild') || checkHasDecoratorNamed(node, 'ContentChild');
}

export function checkIsInputOrOutput(node) {
    return (
        checkHasDecoratorNamed(node, 'Input') || checkHasDecoratorNamed(node, 'Output') || checkIsInputOutputCall(node)
    );
}

export function checkIsSignal(node) {
    return checkIsSignalCall(node);
}
