import readonlyRequired from './rules/readonly-required.js';
import classMemberOrder from './rules/class-member-order.js';
import classMemberSpaces from './rules/class-member-spaces.js';

export default {
    rules: {
        'readonly-required': readonlyRequired,
        'class-member-order': classMemberOrder,
        'class-member-spaces': classMemberSpaces
    }
};
