'use strict';

const handlebars = require('handlebars');
const layouts = require('handlebars-layouts');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const PATH_PAGES = path.join(__dirname, '../views/pages');
const PATH_LAYOUTS = path.join(__dirname, '../views/layouts');
const PATH_COMPILED = path.join(__dirname, '../views/compiled');

mkdirp.sync(PATH_COMPILED);

let pageFiles = fs.readdirSync(PATH_PAGES);
let layoutPath = path.join(PATH_LAYOUTS, 'default.hbs');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync(layoutPath, 'utf8'));

function buildPages(files) {
    files.forEach((file) => {
        console.log(file)
        let HTMLPath = path.join(`${PATH_PAGES}/${file}`);
        let template = handlebars.compile(fs.readFileSync(HTMLPath, 'utf8'));

        let render = template({
            title: 'Android Filetransfer',
        });

        fs.writeFileSync(path.join(PATH_COMPILED, file), render);
    });
}

buildPages(pageFiles);
