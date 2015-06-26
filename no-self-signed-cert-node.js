/**
 * Looks for node apps with self-signed certificates
 * @author Geller Bedoya
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    "use strict";

    return {
        "Literal": function(node) {

            var token = context.getTokens(node)[0],
                nodeType = token.type,
                nodeValue = token.value;

            if (nodeValue === 'NODE_TLS_REJECT_UNAUTHORIZED') {
                if (node.parent.type === 'MemberExpression' &&
                    node.parent.parent.type === 'AssignmentExpression' &&
                    node.parent.parent.right.value === "'0'" ||
                    node.parent.parent.right.value === '"0"'
                ) {
                    context.report(node, "Node Accepts Self-Signed Certs");
                }
            }

            if (nodeType === "String") {
                if (nodeValue === "'0'" ||
                    nodeValue === '"0"' &&
                    node.parent.type === 'AssignmentExpression' &&
                    node.parent.left.type === 'MemberExpression' &&
                    node.parent.left.property.name === 'NODE_TLS_REJECT_UNAUTHORIZED'
                ) {
                    context.report(node, "Node Accepts Self-Signed Certs");
                }
            }
        }
    };
};