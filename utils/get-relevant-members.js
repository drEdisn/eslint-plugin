export function getRelevantMembers(body) {
    return body.filter((member) => checkIsPropertyDefinition(member) || checkIsGetterSetterMethodDefinition(member));
}

function checkIsPropertyDefinition(member) {
    return member.type === 'PropertyDefinition';
}

function checkIsGetterSetterMethodDefinition(member) {
    return member.type === 'MethodDefinition' && (member.kind === 'get' || member.kind === 'set');
}
