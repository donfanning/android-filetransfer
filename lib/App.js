'use strict';

const UI = require('./UI');
const Navigation = require('./Navigation');

import { default as 'utils' } from './util';
import app from 'electron';

class App {
    constructor(options) {
        this.UI = null;
        this.Navigation = null;
        this.Engine = app;
        this.options = utils.default(options, {});
        this.Engine.setName(this.options.name);
    }

    setUI(options) {
        this.options.UI = utils.default(options, {});
        this.options.UI.title = options.title || this.options.name || 'null';
    }

    createUI(options) {
        options = utils.default(options, this.options.UI);
        this.UI = new UI(options);
        this.UI.createWindow(options);
        this.UI.loadView(options.view);

        if(options.openDevTools) {
            this.UI.openDevTools();
        }
    }

    start() {
        let self = this;

        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        this.Engine.on('ready', () => {
            self.createUI();

            if(this.Navigation) {
                this.Navigation.build();
            }
        });

        this.Engine.on('window-all-closed', function () {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                self.Engine.quit();
            }
        });

        this.Engine.on('activate', () => {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if(self.UI.window === null) {
                self.createUI();
            }
        });
    }
}


export default App;
