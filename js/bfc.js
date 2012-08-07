/**
 * Created by JetBrains WebStorm.
 * User: ZIJ
 * Date: 20.12.11
 * Time: 23:48
 * To change this template use File | Settings | File Templates.
 */

function ASTreeNode(type) {

    var children = [];
    this.Parent = null;
    this.Type = function() {
        return type;
    };
    this.Count = function() {
        return children.length;
    };
    this.Add = function(node) {
        children.push(node);
        node.Parent = this;
    };
    this.At = function(index) {
        return children[i];
    };
    this.First = function() {
        return children[0];
    };
    this.Last = function() {
        return children[children.length - 1];
    };
    this.RemoveAt = function(index) {
        children = children.splice(index, 1);
    };
}

function ASTree(byteArr) {
    var root = new ASTreeNode(0);

    this.Root() = function() {
        return root;
    };

    var current = root;
    for (var i = 0; i < byteArr.length; i++) {
        var byte = byteArr[i];
        if (byte === 7) {                               // '['
            current.AddChild(new ASTreeNode(0));
            current = current.Last();
        } else if (byte !== 8) {
            current.AddChild(new ASTreeNode(byte));
        } else {                                        // ']'
            current = current.Parent;
        }
    }
}

function BFC() {
    // chars-to-bytecodes mapping
    var codeMap = {
        '>': 1, '<': 2,     // movement
        '+': 3, '-': 4,     // altering
        '.': 5, ',': 6,     // I/O
        '[': 7, ']': 8      // looping
    };

    this.Compile = function(codeStr, options) {
        // options
        var output = 'bytecode';
        var optimize = true;
        if (options) {
            if (options.Output)
                output = options.Output;
            if (options.Optimize)
                optimize = options.Optimize;
        }

        var bytecode = this.Parse(codeStr);

        if (optimize === true) {
            //TODO: in BFC.Compile(): optimization
        }

        if (output === 'bytecode')
            return bytecode;
        else if (output === 'javascript') {
            return this.ToJs(bytecode);
        }
    };

    this.ToJs = function(byteArr) {
        var js = 'var t=new Array(30000);var p=0;'
                +'for(var i=0;i<30000;i++)t[i]=0;'
                +'function r(){}'
                +'function w(c){console.log(String.fromCharCode(c));}';
        var snippets = new Array (
            '','p++;', 'p--;',
            't[p]++;', 't[p]--;',
             'w(t[p]);', 't[p] = r();',
            'while(t[p]>0){', '}'
        );
        for (var i = 0; i < byteArr.length; i++) {
            js += snippets[byteArr[i]];
        }
        return js;
    };

    this.ToBFIL = function(byteArr) {

    };

    // transforms source code to bytecode array
    this.Parse = function(codeStr) {
        var result = [];
        if (codeStr && codeStr.length > 0) {
            for (var i = 0; i < codeStr.length; i++) {
                var token = codeStr.charAt(i);
                if (codeMap.hasOwnProperty(token)) {
                    result.push(codeMap[token]);
                }
            }
        }
        return result;

    };

}