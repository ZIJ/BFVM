var bf = new BF();
/**
 * Token unites lexemes and commands
 * @param lexeme
 * @param commandId
 * @constructor
 */
function Token(lexeme, commandId) {
    this.Lexeme = function() {
        return lexeme;
    };
    this.CommandId = function() {
        return commandId;
    };
}

function BF() {

}