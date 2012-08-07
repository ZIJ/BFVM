/**
 * Created by JetBrains WebStorm.
 * User: ZIJ
 * Date: 20.12.11
 * Time: 18:41
 * To change this template use File | Settings | File Templates.
 */

var compiler = new BFC();

var bc = compiler.Compile('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++' +
                          '.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.' +
                          '------.--------.>+.>.',{Output:'bytecode',Optimize:'false'});

var vm = new BFVM();

vm.Load(bc);
vm.Run();

//console.log(bc);
//eval(js);