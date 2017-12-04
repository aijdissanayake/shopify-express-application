var shell = require('shelljs');
/**
 * to place shopify react app's build in dist
 */
shell.mkdir('-p', 'dist/shopify/react-app/');
shell.cp('-R', 'src/shopify/react-app/build/', 'dist/shopify/react-app/');