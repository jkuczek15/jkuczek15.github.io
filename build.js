const program = require('commander');
const fs = require('fs');
const {updateHTML} = require('./populate')

program
  .version('0.1.1')
  .option('-n, --name [username]', 'get username')
  .option('-d, --dark', 'enable dark mode')
  .option('-b, --background [background]', 'set background image')
  .parse(process.argv);

var dark;
var light;

function populateCSS(){
    fs.copyFile('./assets/index.css', 'index.css', (err) => {
        if (err) throw err;
        fs.appendFile('index.css', light, function (err) {
            if (err) throw err;
        });
        fs.readFile("config.json", function (error , data) {
            if (error) throw err;
            data = JSON.parse(data);
            data[0].theme = "dark";
            fs.writeFile('config.json', JSON.stringify(data, null, ' '), function(error){
              if (error) throw err;
            });
        });
    });
}


if (program.background) {
    dark = `:root {--bg-color: rgb(10, 10, 10);--text-color: #fff;--blog-gray-color:rgb(180, 180, 180);--background-image: linear-gradient(90deg, rgba(10, 10, 10, 0.6), rgb(10, 10, 10, 1)), url('${('%s', program.background)}');--background-background: linear-gradient(0deg, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.6)),url('${('%s', program.background)}') center center fixed;--height:50vh;} #display h1 {-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color: #fff;} #blog-display h1 {-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color: #fff;}#projects section {background:rgb(20, 20, 20);}#blog_section section {background:rgb(20, 20, 20);}@media (max-width: 800px){ --background-image: linear-gradient(0deg, rgba(10, 10, 10, 1), rgb(10, 10, 10, 0)), url('${('%s', program.background)}') !important;}`;
    light = `:root {--bg-color: #fff;--text-color: rgb(10, 10, 10);--blog-gray-color:rgb(80, 80, 80);--background-image: linear-gradient(90deg, rgba(10, 10, 10, 0.4), rgb(10, 10, 10, 0.4)), url('${('%s', program.background)}');--background-background: #fff;}`;
    light = dark;
    populateCSS();
}else{
    dark = `:root {--bg-color: rgb(10, 10, 10);--text-color: #fff;--blog-gray-color:rgb(180, 180, 180);--background-image: linear-gradient(90deg, rgba(10, 10, 10, 0.6), rgb(10, 10, 10, 1)), url('https://jkuze.com/images/chicago.png');--background-background: linear-gradient(0deg, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.6)),url('https://jkuze.com/images/chicago.png') center center fixed;--height:50vh;} #display h1 {-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color: #fff;} #blog-display h1 {-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color: #fff;}#projects section {background:rgb(20, 20, 20);}#blog_section section {background:rgb(20, 20, 20);}@media (max-width: 800px){ :root {--background-image: linear-gradient(0deg, rgba(10, 10, 10, 1), rgb(10, 10, 10, 0)), url('https://jkuze.com/images/chicago.png') !important;}}`;
    light = `:root {--bg-color: #fff;--text-color: rgb(10, 10, 10);--blog-gray-color:rgb(80, 80, 80);--background-image: linear-gradient(90deg, rgba(10, 10, 10, 0.4), rgb(10, 10, 10, 0.4)), url('https://jkuze.com/images/chicago.png');--background-background: #fff;}`;
    light = dark;
    populateCSS();
}

if (program.name) {
    updateHTML(('%s', program.name));
} else {
    console.log("Provide a username");
}
