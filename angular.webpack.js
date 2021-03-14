/**
 * Custom angular webpack configuration
 */
const path = require('path');

module.exports = (config, options) => {
    config.target = 'electron-renderer';
    if (typeof config['externals'] !== 'object') {
        config['externals'] = {};
    }
    config['externals']['typeorm'] = "window.require('typeorm')";
    config['externals']['better-sqlite3'] = "window.require('better-sqlite3')";
    config['externals']['sql.js'] = "window.require('sql.js')";

    //// Custom Config
    if (typeof config['resolve'] !== 'object') {
        config['resolve'] = {};
    }
    if (typeof config['resolve']['alias'] !== 'object') {
        config['resolve']['alias'] = {}
    }
    config['resolve']['alias']['typeorm'] = path.resolve(__dirname, "./node_modules/typeorm/typeorm-model-shim");


    if (options.fileReplacements) {
        for (let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                config.target = 'web';
            }
            break;
        }
    }

    return config;
}
