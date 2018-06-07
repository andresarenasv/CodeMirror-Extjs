/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'CodeMirror.Application',

    name: 'CodeMirror',

    requires: [
        // This will automatically load all classes in the CodeMirror namespace
        // so that application classes do not need to require each other.
        'CodeMirror.*'
    ],

    // The name of the initial view to create.
    mainView: 'CodeMirror.view.main.Main'
});
