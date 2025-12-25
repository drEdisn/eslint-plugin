export function checkIsIdentifier(node, name) {
    return node && node.type === 'Identifier' && node.name === name;
}
