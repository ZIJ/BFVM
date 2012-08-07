/**
 * Created by JetBrains WebStorm.
 * User: ZIJ
 * Date: 20.12.11
 * Time: 19:39
 * To change this template use File | Settings | File Templates.
 */
function Command(id, name, paramsCount, func) {
    // validating params
    if (typeof(id) !== 'number') {
        throw new Error('id must be number');
    }
    if (typeof(name) !== 'string') {
        throw new Error('name must be string');
    }
    if (typeof(paramsCount) !== 'number' || paramsCount < 0) {
        throw new Error('paramsCount must be non-negative number');
    }
    // publishing interface
    this.Exec = function() {};
    this.Id = function() {
        return id;
    };
    this.Name = function() {
        return name;
    };
    this.ParamsCount = function() {
      return paramsCount;
    };
    if (typeof(func) === 'function') {
        this.Exec = function() {
            func();
        };
    }
}

function CommandSet() {
    var commands = [];
    var nameIdMap = {};
    var commandSorter = function(c1, c2) {
        if (c1.Id() < c2.Id())
            return -1;
        else if (c1.Id() > c2.Id())
            return 1;
        else
            return 0;
    };

    this.Add = function(command) {
        if (!(command instanceof Command)) {
            throw new Error('command should be instance of Command');
        }
        //TODO: in CommandSet.Add(): duplication of names and ids check
        commands.push(command);                         // adding command
        commands.sort(commandSorter);                   // sorting by id
        nameIdMap = {};                                 // clearing map
        // rebuilding map
        for (var i = 0; i < commands.length; i++) {
            var name = commands[i].Name();
            var id = commands[i].Id();
            nameIdMap[name] = id;
        }
    };

    this.ById = function(id) {
        return commands[id];
    };

    this.ByName = function(name) {
        return commands[nameIdMap[name]];
    };
}

function BFVM(options) {

    // options
    // TODO: in BFVM: more options
    var length = 30000;                 // length of data tape
    var bytes = 1;                      // size of data tape cell in bytes
    if (options) {
        if (options.Size)
            size = options.Size;
        if (options.Bytes)
            bytes = options.Bytes;
    }

    // fields

    var commands = new CommandSet();    // vm commands
    fillCommandSet();

    // TODO: in BFVM: states
    var state = 'stopped';              // also 'running', and 'waiting' states possible
    var data = [];                      // data tape
    var code = [];                      // code tape
    var input = [];                     // user input queue (stores character codes)
    var output = '';                    // output string
    var dp = 0;                         // data pointer
    var cp = 0;                         // code pointer

    // properties
    this.State = function() {
        return state;
    };

    this.Load = function(byteArr) {
        code = byteArr;
        data = new Array(length);
        for (var i = 0; i < length; i++) {
            data[i] = 0;
        }
        dp = 0;
        cp = 0;
    };

    this.Run = function() {
        output = '';
        while(cp < code.length) {
            commands.ById(code[cp]).Exec();
            cp++;
        }
        console.log(output);
        return output;
    };
    //TODO: in BFVM: pausing and interrupts
    this.Pause = function() {

    };
    //TODO: in BFVM: input logic
    this.Read = function(str) {
        if(typeof(str) !== 'string' || str.length === 0) {
            throw new Error('only non-empty strings are acceptable for input');
        }
        for (var i = 0; i < str.length; i++) {
            input.unshift(str.charCodeAt(i));
        }
    };

    function waitForInput() {

    }

    function fillCommandSet() {
        commands.Add(new Command(0, 'nop', 0, function() {
            //do nothing
        }));
        commands.Add(new Command(1, 'right', 0, function() {
            dp++;
        }));
        commands.Add(new Command(2, 'left', 0, function() {
            dp--;
        }));
        commands.Add(new Command(3, 'inc', 0, function() {
            data[dp]++;
        }));
        commands.Add(new Command(4, 'dec', 0, function() {
            data[dp]--;
        }));
        commands.Add(new Command(5, 'put', 0, function() {
            output += String.fromCharCode(data[dp]);
        }));
        commands.Add(new Command(6, 'get', 0, function() {
            data[dp] = input.pop();
        }));
        commands.Add(new Command(7, 'loopstart', 0, function() {
            if (data[dp] === 0) {
                var counter = 1;
                while (counter > 0) {
                    cp++;
                    if (code[cp] === 7)         // [
                        counter++;
                    else if (code[cp] === 8)    // ]
                        counter--;
                }
            }
        }));
        commands.Add(new Command(8, 'loopend', 0, function() {
            if (data[dp] !== 0) {
                var counter = 1;
                while (counter > 0) {
                    cp--;
                    if (code[cp] === 8)         // ]
                        counter++;
                    else if (code[cp] === 7)    // [
                        counter--;
                }
            }
        }));
        commands.Add(new Command(9, 'rightby', 1, function(){
            var shift = code[++cp];
            dp += shift;
        }));
        commands.Add(new Command(10, 'leftby', 1, function(){
            var shift = code[++cp];
            dp -= shift;
        }));
        commands.Add(new Command(11, 'farrightby', 2, function(){
            var bigshift = code[++cp];
            var smallshift = code[++cp];
            dp += (bigshift * 256 + smallshift);
        }));
        commands.Add(new Command(12, 'farleftby', 2, function(){
            var bigshift = code[++cp];
            var smallshift = code[++cp];
            dp -= (bigshift * 256 + smallshift);
        }));
        commands.Add(new Command(13, 'incby', 1, function(){
            var delta = code[++cp];
            data[dp] += delta;
        }));
        commands.Add(new Command(14, 'decby', 1, function(){
            var delta = code[++cp];
            data[dp] -= delta;
        }));
    }

}
