const App = require('./lib/App');

const AndroidFiletransfer = new App({
    name: 'Android Filetransfer'
});

AndroidFiletransfer.setUI({
    width: 800,
    height: 600,
    view: 'index',
    center: true
});

AndroidFiletransfer.start();
