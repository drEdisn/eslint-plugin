export function getMemberAccessibility(node) {
    return getAccessibilityRank(node) + getReadonlyRank(node);
}

function getReadonlyRank(node) {
    return node.type === 'PropertyDefinition' && node.readonly ? 0 : 1;
}

function getAccessibilityRank(node) {
    return {
        private: 0,
        protected: 2,
        public: 4
    }[node.accessibility];
}
