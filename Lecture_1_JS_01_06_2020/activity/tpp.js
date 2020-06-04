let input = process.argv.slice(2);
let viewFile = require('./commands/view');
let untreefy = require('./commands/untreefy');
let treefy = require('./commands/treefy');
let cmd = input[0];
switch (cmd) {
    case "view":
        viewFile.view(input[1], input[2]);
        break;
    case "untreefy":
        untreefy.untreefyFn(input[1], input[2]);
        break;
    case "treefy":
        treefy.treefyFn(input[1], input[2]);
        break
    case "help":
        break;
    default: console.log("Wrong command");
}