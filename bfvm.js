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
 * //TODO: Debugging (step-by-step)
 *
 */

/**
 * Creates new BrainFuck VM
 * @constructor
 */
function BFVM() {
    var defaultSettings = {
        tapeSize: 30000,
        cellSize: 1,
        negative: false,
        wrapping: true
    };
}