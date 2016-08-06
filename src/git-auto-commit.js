var exec     = require('child_process').exec;
var chokidar = require('chokidar');

var watcher = chokidar.watch(process.argv[1], {ignored: /[\/\\]\./});

console.log(watcher.getWatched());

watcher.on('change', function(path) { onChange(path);});

// var onAdd = function (path) {

// 	exec('git add ${path}');
// 	console.log('File ' + path +' added to git repo.');
// 	onChange(path);
// };

var onChange = function (path) {
	var timestamp = new Date().toString();

	exec('git commit -am \"Committed by git-auto-commit @ ' + timestamp + '\"');
	console.log('File ' + path +' commited to the git repo.');
};

var push = function () {
	exec('git push');
	console.log("Pushed commits to repo.");
}