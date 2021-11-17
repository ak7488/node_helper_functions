const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");
const argv = process.argv;
const cwd = process.cwd();

const allFilesInCWD = fs.readdirSync(cwd).map((e) => ({
    ...fs.lstatSync(`${cwd}/${e}`),
    isFolder: fs.lstatSync(`${cwd}/${e}`).isDirectory(),
    name: e,
}));

if (argv.length === 2) {
    const display = allFilesInCWD.reduce((pre, current) => {
        let text = "";
        if (current.name.length < 20) {
            text += `${current.name}${getRepetedCharacter(
                20 - current.name.length
            )}`;
        } else {
            text += `${current.name}    `;
        }
        if (current.isFolder) {
            return pre + chalk.blue(text);
        } else {
            return pre + chalk.cyan(text);
        }
    }, "");
    console.log("ok", display);
    console.log(" ");
    console.log(" ");
    console.log(
        "Directory:",
        chalk.bgBlue("         "),
        " File:",
        chalk.bgCyan("         ")
    );
} else if (argv[2] === "-?" || argv[2] === "/?") {
    console.log(`
    command: ls
    description: Get the name or info of all the file and dir in the currently working directory.

    varirants:
        command         argv        description
        ls              none        get name of dir and file in cwd.
        ls              /? -?       help
        ls              /d -d       get detailed info of file amd dir.
        ls              /r -r       get raw data.
    `);
} else if (argv[2] === "-d" || argv[2] === "/d") {
    allFilesInCWD.forEach((e, index) => {
        let display = "";
        display += `${index + 1})  `;
        display += `${e.name}${getRepetedCharacter(18 - e.name.length)}`;
        display += `${e.size}${getRepetedCharacter(
            8 - e.size.toString().length
        )}`;
        display += `${moment(e.birthtime).format("hh:mm:ss-DD/MM/YY")}   `;
        display += `${moment(e.mtime).format("hh:mm:ss-DD/MM/YY")}   `;
        if (e.isFolder) {
            console.log(chalk.blue(display));
        } else {
            console.log(chalk.cyan(display));
        }
    });
    console.log("");
    console.log("");
    console.log("index name size(bites) birthDate lastModified");
    console.log(
        "Directory:",
        chalk.bgBlue("         "),
        " File:",
        chalk.bgCyan("         ")
    );
} else if (argv[2] === "-r" || argv[2] === "/r") {
    allFilesInCWD.forEach((e) => {
        console.log(e);
    });
}

function getRepetedCharacter(num = 0, character = " ") {
    if (num < 0) {
        num = 5;
    }
    let space = "";
    for (let i = 0; i < num; i++) {
        space += character;
    }
    return space;
}
