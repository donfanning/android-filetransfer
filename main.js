const App = require('./lib/App');
const Navigation = require('./lib/Navigation');

const MainNavigation = new Navigation();
const AndroidFiletransfer = new App({
    name: 'Android Filetransfer'
});

AndroidFiletransfer.setUI({
    width: 800,
    height: 600,
    view: 'index',
    center: true
});

MainNavigation.setTemplate(require('./src/template/navigation'));
MainNavigation.attach(AndroidFiletransfer);

AndroidFiletransfer.start();
