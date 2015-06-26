/**
 * Looks for mongoose connections which accept self-signed certificates
 * @author Geller Bedoya
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    "use strict";
    var isMongooseInstalled = false;

    return {
        "Literal": function(node) {

            var token = context.getTokens(node)[0],
                nodeType = token.type,
                nodeValue = token.value;

            if (nodeValue === 'mongoose' ||
                nodeValue === "'mongoose'" &&
                node.parent.type === 'CallExpression' &&
                node.parent.callee.name === 'require' &&
                node.parent.parent.type === 'AssignmentExpression' ||
                node.parent.parent.type === 'VariableDeclarator'
            ) {
                isMongooseInstalled = true;
            }
            if (isMongooseInstalled) {
                if (nodeValue === 'false' && node.parent.key.name === 'sslValidate') {
                    var nodeGrandparent = node.parent.parent;
                    if (nodeGrandparent.type === 'ObjectExpression' &&
                        nodeGrandparent.parent.key.name === 'server'
                    ) {
                        context.report(node, "Moogoose Accepts Self-Signed Certs");
                    }
                }
            }
        }
    };
};