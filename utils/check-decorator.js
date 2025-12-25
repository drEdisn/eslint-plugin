export function checkHasDecoratorNamed(node, name) {
    return node.decorators?.some((d) => d.expression?.callee?.name === name) ?? false;
}
