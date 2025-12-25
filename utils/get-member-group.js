import { checkIsSelectCall } from './check-select-call.js';
import {
    checkIsAccessor,
    checkIsConstant,
    checkIsInjectCall,
    checkIsInputOrOutput,
    checkIsSignal,
    checkIsViewChildOrContentChild
} from './check-type.js';

export function getMemberGroup(node) {
    if (checkIsAccessor(node)) {
        return 'accessor';
    }

    if (checkIsInjectCall(node)) {
        return 'inject';
    }

    if (checkIsConstant(node)) {
        return 'constants';
    }

    if (checkIsSelectCall(node)) {
        return 'select';
    }

    if (checkIsViewChildOrContentChild(node)) {
        return 'viewChild';
    }

    if (checkIsInputOrOutput(node)) {
        return 'inputOutput';
    }

    if (checkIsSignal(node)) {
        return 'signals';
    }

    return 'default';
}
