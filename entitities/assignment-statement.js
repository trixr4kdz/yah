var AssignmentStatement, VariableReference;

VariableReference = require('./variablereference');

AssignmentStatement = (function() {
    function AssignmentStatement(target, source) {
        this.target = target;
        this.source = source;
    }

    AssignmentStatement.prototype.toString = function() {
        return "(= " + this.target + " " + this.source + ")";
    };

    AssignmentStatement.prototype.analyze = function(context) {
        this.target.analyze(context);
        this.source.analyze(context);
        return this.source.type.mustBeCompatibleWith(this.target.type, 'Type mismatch in assignment');
    };

    AssignmentStatement.prototype.optimize = function() {
        this.target = this.target.optimize();
        this.source = this.source.optimize();
        if (this.source instanceof VariableReference && this.target.referent === this.source.referent) {
            null;
        }
        return this;
    };

    return AssignmentStatement;

})();

module.exports = AssignmentStatement;