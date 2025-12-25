export function checkIsMemberExpressionWithObjectAndProperty(node, objName, propNames) {
    if (!node || node.type !== 'MemberExpression') {
        return false;
    }

    const obj = node.object;
    const prop = node.property;

    return (
        obj?.type === 'Identifier' &&
        obj.name === objName &&
        prop?.type === 'Identifier' &&
        propNames.includes(prop.name)
    );
}
