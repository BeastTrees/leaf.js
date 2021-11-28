module.exports = function (babel) {
    return {
        visitor: {
            ImportDeclaration: function (path) {
                var importPath = path.node.source.value;

                if (importPath[0] !== ":") {
                    return;
                }

                importPath = importPath.substring(1);

                importPath = process.cwd() + "/" + importPath;

                path.node.source.value = importPath;
            }
        }
    };
}