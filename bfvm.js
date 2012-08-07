/**
 * BrainFuck VirtualMachine - a fast runtime for Brainfuck language
 * @author Igor Zalutski
 * @version 0.1
 * Contacts: zij@ya.ru
 */

/**
 * ToDoList
 * //TODO: Customizable settings
 * //TODO: Customizable i/o
 * //TODO: Customizable error handling
 * //TODO: Customizable optimizations
 * //TODO: Debugging (step-by-step and 'large jumps')
 *
 */

/**
 * Creates new BrainFuck VM
 * @constructor
 */
function BFVM() {
    var size = 30000;                           // amount of cells in data tape
    var dataTape = [], codeTape = [];           // tapes
    var dataIndex = 0, codeIndex = 0;           // pointers

    /**
     * Executes bytecode
     * @param {String} source Source code
     */
    this.exec = function(source) {

    };

    var commandNames = [
    'nop', 'right', 'left', 'inc', 'dec', 'write', 'read'];

    var commandIds = {};
    for (var i = 0; i < commandNames.length; i++) {
        commanndIds[commandNames[i]] = i;
    }

    // returns array of operation codes
    function parse(source) {
        var operationCodeMap = {
            '>': 0, '<': 1,
            '+': 2, '-': 3,
            '.': 4, ',': 5,
            '[': 6, ']': 7
        };
        var opcodes = [];
        for (var i = 0; i < source.length; i++) {
            var token = source.charAt(i);
            if (operationCodeMap.hasOwnProperty(token)) {
                opcodes.push(operationCodeMap[token]);
            }
        }
        return opcodes;
    }

    function groupBy(arr, func) {
        for (var i = 0; i < arr.length; i++)
        {

        }
    }
}