var bf = new BF();

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