Ext.define('CodeMirror.Application', {

	//-----------------------------------
	// Extend / Requires
	//-----------------------------------

	extend: 'Ext.app.Application',
	name: 'CodeMirror',

	//-----------------------------------
	// Properties
	//-----------------------------------

	quickTips: false,
	platformConfig: {
		desktop: {
			quickTips: true
		}
	},

	//-----------------------------------
	// Methods
	//-----------------------------------

	/**
	 *
	 */
	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
