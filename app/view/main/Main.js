Ext.define('CodeMirror.view.main.Main', {

	//-----------------------------------
	// Alias / Extend
	//-----------------------------------

	extend: 'Ext.panel.Panel',
	xtype: 'app-main',

	//-----------------------------------
	// Requires
	//-----------------------------------

	requires: [
		'Ext.plugin.Viewport',
		'Ext.ux.CodeMirror',

		'CodeMirror.view.main.MainController',
		'CodeMirror.view.main.MainModel',
	],
	controller: 'main',
	viewModel: 'main',
	plugins: 'viewport',

	//-----------------------------------
	// Properties
	//-----------------------------------

	title: 'CodeMirror with Extjs 6',
	layout: {
		type: 'fit'
	},

	//-----------------------------------
	// UI Components
	//-----------------------------------

	items: [
		{
			xtype: 'codeeditor',
		}
  ]

});
