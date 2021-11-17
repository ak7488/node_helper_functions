const fs = require("fs");
const chalk = require("chalk");
const cwd = process.cwd();
const fileName = process.argv[2]?.split("/").filter((e) => e !== "");

if (fileName?.length > 0) {
    main(fileName, cwd);
} else {
    console.log(chalk.bgRed.white("Error: No file name specified."));
}

function isE(name, cwd) {
    return fs.readdirSync(cwd).indexOf(name) !== -1 ? true : false;
}

function main(p, cwd) {
    if (isE(p[0], cwd)) {
        if (p.length === 1) {
            console.log(chalk.bgRed.white(`Error: ${p[0]} already exists.`));
        } else if (fs.lstatSync(`${cwd}/${p[0]}`).isDirectory()) {
            main(p.slice(1, p.length), `${cwd}/${p[0]}`);
        } else {
            console.log(chalk.bgRed.white(`Error: ${p[0]} is not a dir.`));
        }
    } else {
        if (p[0].includes(".")) {
            fs.writeFileSync(`${cwd}/${p[0]}`, "");
            console.log(chalk.green(`created file ${p[0]}`));
        } else {
            fs.mkdirSync(`${cwd}/${p[0]}`);
            console.log(chalk.green(`created dir ${p[0]}`));
            main(p.slice(1, p.length), `${cwd}/${p[0]}`);
        }
    }
}
