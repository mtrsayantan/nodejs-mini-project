const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants');
const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const argv = yargs.argv;

var title = yargs.argv.title;
var body = yargs.argv.body;
var command = yargs.argv._[0];
if (command === "add"){
   addingNote(title, body);
} else if (command === "remove"){
   removeNote(title);
}else if (command === "list"){
   getAll(); 
}else if (command === "read"){
   readNote(title); 
} else{
    console.log(chalk.red('Unknown command'));
}


function fetchNotes(){
    try {
      return JSON.parse(fs.readFileSync('notes.json'));  
    }catch (err) {
      return [];  
    }
}
function addingNote(title, body){
    var notes = fetchNotes();
    var count = 0;
    notes.forEach(element => {
        if(element['title'] === title){
            count = 1;
        }
    });
    if(count == 1 ){
        console.log(chalk.black.bgRed('Title already taken!'));    
    }else{
        var note ={
            title,
            body
        };
        notes.push(note);
        fs.writeFileSync("notes.json",JSON.stringify(notes));
        console.log(chalk.black.bgGreen('New note created!'));
    }
}
function removeNote(title){
    var notes = fetchNotes();
    var count = 0;
    notes.forEach(element => {
        if(element['title'] === title){
            count = 1;
        }
    });
    if(count == 1 ){
        var filteredNotes = notes.filter((note) => note.title !== title);
        fs.writeFileSync("notes.json", JSON.stringify(filteredNotes));
        console.log(chalk.black.bgGreen('Note removed!'));
    }else{
        console.log(chalk.black.bgRed('Note not found!'));
    }
}
function getAll(){
    var notes = fetchNotes();
    console.log(chalk.black.bgBlue('Titles of your notes:'));
    notes.forEach(note => 
        console.log(note.title)); 
}
function readNote(title){
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    console.log(chalk.black.bgYellow(`Title: ${filteredNotes[0].title}`));
    console.log(`Body: ${filteredNotes[0].body}`);
}