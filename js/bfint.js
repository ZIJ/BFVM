/**
 * Created by JetBrains WebStorm.
 * User: ZIJ
 * Date: 20.12.11
 * Time: 12:35
 * To change this template use File | Settings | File Templates.
 */

function BFInt(size) {

    var data = new Array(size);                                 // data tape
    for (var i = 0; i < data.length; i++)
        data[i] = 0;

    this.run = function(codeStr, inputStr) {                    // executive function

        var code = toOpCodes(codeStr);                          // instruction tape
        var input = toCharCodes(inputStr);
        var output = '';


        var dp = 0;                                             // data pointer
        var ip = 0;                                             // instruction pointer

        var right = function() {
            dp++;
        };

        var left = function() {
            dp--;
        };

        var inc = function() {
            data[dp]++;
        };

        var dec = function() {
            data[dp]--;
        };

        var put = function() {
            output += String.fromCharCode(data[dp]);
        };

        var get = function() {
            data[dp] = input.shift();
        };

        var loopStart = function() {
            if (data[dp] === 0) {
                var counter = 1;
                while (counter > 0) {
                    ip++;
                    if (code[ip] === 6)         // [
                        counter++;
                    else if (code[ip] === 7)    // ]
                        counter--;
                }
                //ip++;
            }
        };

        var loopEnd = function() {
            if (data[dp] !== 0) {
                var counter = 1;
                while (counter > 0) {
                    ip--;
                    if (code[ip] === 7)         // ]
                        counter++;
                    else if (code[ip] === 6)    // [
                        counter--;
                }
                //ip++;
            }
        };

        var commands = new Array(
            right, left,
            inc, dec,
            put, get,
            loopStart, loopEnd
        );

        while (ip < code.length) {
            commands[code[ip]]();
            ip++;
        }

        console.log(output);

    };

    // makes an array of opcodes from code string
    function toOpCodes(codeStr) {
        var transform = {
            '>': 0, '<': 1,     // movement
            '+': 2, '-': 3,     // altering
            '.': 4, ',': 5,     // I/O
            '[': 6, ']': 7      // looping
        };

        var result = [];

        for (var i = 0; i< codeStr.length; i++) {
            var token = codeStr.charAt(i);
            if(transform.hasOwnProperty(token))
                result.push(transform[token]);
        }

        return result;
    }

    // makes an array of charcodes from string
    function toCharCodes(str) {
        var result = [];
        if (str && str != '') {
            for (var i = 0; i< str.length; i++) {
               result.push(str.charCodeAt(i));
            }
        }
        return result;
    }

}