// JavaScript Document

(function () {
	
	var compiler = new BFC();
	var runner = new BFVM();

	compileButton = $('#compileButton');
	runButton = $('#runButton');
    $('#output').val('');
    $('#input').val('');
	
	compileButton.click(function(){
			var compilerOptions = {
				Output: $('#bfil').prop('checked') ? 'bytecode' : 'javascript',
				Optimize: $('#optimize').prop('checked')
			};
			var source = $('#input').val();
		    $('#output').val(compiler.Compile(source, compilerOptions));
		});
	
	runButton.click(function(){
			var engine;
			if($('#bfvm').prop('checked')) {
				engine = 'vm'
			}
			else if($('#nativeJS').prop('checked')) {
				engine = 'js'
			}
			else if($('#interpreter').prop('checked')) {
				engine = 'interpreter'
			}
			var runnerOptions = {
				Engine : engine		// or 'js' or 'interpreter'
			};
			var code = $('#input').val();
            runner.Load(compiler.Compile(code, {Output: 'bytecode', Optimize: false}));
            $('#output').val(runner.Run());
		});
})();