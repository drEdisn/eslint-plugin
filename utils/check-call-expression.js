export function checkIsCallExpression(expr) {
    return expr && expr.type === 'CallExpression';
}
