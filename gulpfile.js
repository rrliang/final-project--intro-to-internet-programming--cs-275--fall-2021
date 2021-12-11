const { src, dest, series, watch } = require(`gulp`),
    gulp = require(`gulp`),
    del = require(`del`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    cssCompressor = require(`gulp-uglifycss`),
    imageCompressor = require(`gulp-imagemin`);
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;
let browserChoice = `default`;

const PATHS = {
    input: `/**`,
    output: `/**`,
    js: {
        input: `js/*.js`,
        output: `prod/js`,
        temp: `temp/js`
    },
    css: {
        input: `css/*.css`,
        output: `prod/css`
    },
    html: {
        input: `*.html`,
        output: `prod`
    },
    img: {
        input: [`img/*.png`, `img/*svg`],
        output: `prod/img`
    }
};

async function safari () {
    browserChoice = `safari`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function opera () {
    browserChoice = `opera`;
}

async function edge () {
    browserChoice = `microsoft-edge`;
}

async function allBrowsers () {
    browserChoice = [
        `safari`,
        `firefox`,
        `google chrome`,
        `opera`,
        `microsoft-edge`
    ];
}

let validateHTML = () => {
    return gulp.src(PATHS.html.input)
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src(PATHS.html.input)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(PATHS.html.output));
};

let compressCSS = () => {
    return src(PATHS.css.input)
        .pipe(cssCompressor())
        .pipe(dest(PATHS.css.output));
};

let transpileJSForDev = () => {
    return src(PATHS.js.input)
        .pipe(babel())
        .pipe(dest(PATHS.js.temp));
};

let transpileJSForProd = () => {
    return src(PATHS.js.input)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(PATHS.js.output));
};

let lintCSS = () => {
    return src(PATHS.css.input)
        .pipe(cssLinter(
            {
                failAfterError: false,
                reporters: [
                    {formatter: `string`, console: true}
                ]
            }
        ));
};

let lintJS = () => {
    return src(PATHS.js.input)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let compressImages = () => {
    return src(PATHS.img.input)
        .pipe(imageCompressor({
            optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
            pngquant: ['--speed=1', '--force', 256],
            zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
            jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
            mozjpeg: ['-optimize', '-progressive'],
            gifsicle: ['--optimize'],
            svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
            quiet: false
        }))
        .pipe(dest(PATHS.img.output));
};

// let copyUnprocessedAssetsForProd = () => {
//     return src([
//         `img/*.svg`
//     ], {dot: true})
//         .pipe(dest(`prod/img`));
// };
//WHAT ASSETS WILL BE UNPROCCESSED? KINDA CONFUSED

let serve = () => {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `./`,
                `css`,
                `js`,
                `img`
            ]
        }
    });

    watch(paths.html.input,
        series(validateHTML)
    ).on(`change`, reload);

    watch(paths.js.input,
        series(lintJS, transpileJSForDev)
    ).on(`change`, reload);

    watch(paths.css.input,
        series(lintCSS)
    ).on(`change`, reload);

    watch(paths.img.input
    ).on(`change`, reload);
};

async function clean() {
    let fs = require(`fs`),
        i,
        foldersToDelete = [`temp`, `prod`];

    for (i = 0; i < foldersToDelete.length; i++) {
        try {
            fs.accessSync(foldersToDelete[i], fs.F_OK);
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory was found and will be deleted.\n`);
            del(foldersToDelete[i]);
        } catch (e) {
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory does NOT exist or is NOT accessible.\n`);
        }
    }

    process.stdout.write(`\n`);
}

async function listTasks () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
                `the “exec” program in the default task.`);
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
                `when invoking the “exec” program in the default task.`);
        }

        process.stdout.write(`\n\tThis default task does ` +
            `nothing but generate this message. The ` +
            `available tasks are:\n\n${stdout}`);
    });
}

exports.safari = series(safari, serve);
exports.firefox = series(firefox, serve);
exports.chrome = series(chrome, serve);
exports.opera = series(opera, serve);
exports.edge = series(edge, serve);
exports.safari = series(safari, serve);
exports.allBrowsers = series(allBrowsers, serve);
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.compressImages = compressImages;
exports.compressCSS = compressCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.build = series(
    compressCSS,
    compressHTML,
    transpileJSForProd,
    compressImages,
    // copyUnprocessedAssetsForProd
);
exports.default = series(
    lintJS,
    lintCSS,
    validateHTML,
    transpileJSForDev,
    serve
);
exports.clean = clean;
exports.listTasks = listTasks;
