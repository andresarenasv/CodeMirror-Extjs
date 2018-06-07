Ext.define('Ext.ux.CodeMirror', {

	//-----------------------------------
	// Alias / Extend
	//-----------------------------------

	extend: 'Ext.panel.Panel',
	alias: 'widget.codeeditor',

	//-----------------------------------
	// Requires
	//-----------------------------------

	mixins: {
		field: 'Ext.form.field.Field'
	},
	gutters: [
		"CodeMirror-lint-markers",
		"CodeMirror-linenumbers",
		"CodeMirror-foldgutter"
	],

	//-----------------------------------
	// Properties
	//-----------------------------------

	value: "",
	rtlMoveVisually: false,
	readOnly: false,
	showCursorWhenSelecting: false,
	lineWrapping: false,
	lineNumbers: true,
	firstLineNumber: 1,
	fixedGutter: true,
	enableMatchBrackets: true,
	defaultTheme: 'default',
	gutter: true,
	styleActiveLine: true,
	mode: 'javascript',
	height: '100%',
	width: '100%',
	foldGutter: true,
	themeSelector: false,

	//-----------------------------------
	// UI Components
	//-----------------------------------

	tButtons: [],
	bButtons: [],

	//-----------------------------------
	// Methods
	//-----------------------------------

	/**
	 *
	 */
	isDirty: function () {
		return this.dirty;
	},

	/**
	 *
	 */
	setDirty: function (dirty) {
		this.dirty = dirty;
		this.fireEvent('dirtychange', dirty);
	},

	/**
	 *
	 */
	setValue: function (value) {
		if (Ext.isFunction(this.editor.setValue)) {
			this.editor.setValue(value);
			this._originalValue = value;
			this.setDirty(false);
		}
	},

	/**
	 *
	 */
	getValue: function () {
		if (Ext.isFunction(this.editor.getValue)) {
			return this.editor.getValue();
		}
		return 'Unable to get value';
	},

	/**
	 *
	 */
	getCursor: function (string) {
		return this.editor.getCursor(string);
	},

	/**
	 *
	 */
	reset: function () {
		this.editor.setValue("");
	},

	/**
	 *
	 */
	insertText: function (data, newLine, endLine) {
		var doc = this.editor.getDoc();
		var cursor = doc.getCursor(); // gets the line number in the cursor position
		var line = doc.getLine(cursor.line); // get the line contents
		var pos = { // create a new object to avoid mutation of the original selection
			line: cursor.line,
			ch: line.length - 1 // set the character position to the end of the line
		};
		var text = '';

		if (newLine) {
			text = '\n';
		}
		text = text + data;
		if (endLine) {
			text = text + '\n';
		}

		doc.replaceRange(text, pos); // adds a new line
	},

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.editor = Ext.widget('box', {
			anchor: '95% 95%',
		});
		me._originalValue = me.value;

		Ext.apply(me, {
			items: [me.editor]
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	listeners: {
		afterrender: function () {
			this.initialiseCodeMirror()
		}
	},

	/**
	 *
	 */
	initialiseCodeMirror: function () {
		var me = this;
		me.editor = new CodeMirror(document.getElementById(me.editor.id), {
			value: me.value,
			autoCloseBrackets: true,
			rtlMoveVisually: me.rtlMoveVisually,
			readOnly: me.readOnly,
			showCursorWhenSelecting: me.showCursorWhenSelecting,
			lineWrapping: me.lineWrapping,
			lineNumbers: me.lineNumbers,
			firstLineNumber: me.firstLineNumber,
			fixedGutter: me.fixedGutter,
			gutter: me.gutter,
			gutters: me.gutters,
			foldGutter: me.foldGutter,
			matchBrackets: me.enableMatchBrackets,
			styleActiveLine: me.styleActiveLine,
			mode: me.mode,
			lint: true,
			extraKeys: {
				"Ctrl-Space": "autocomplete",
				"Ctrl-R": "replace"
			}
		});

		me.editor.setSize(me.width, me.height);
		me.registerEvents();
		me.editor.refresh();
	},

	/**
	 *
	 */
	refresh: function () {
		this.editor.refresh();
	},

	/**
	 *
	 */
	setSize: function (width, height) {
		this.callParent(arguments);
		this.editor.setSize(width, height);
	},

	/**
	 *
	 */
	registerEvents: function () {
		var me = this;
		me.editor.on('change', function (editor, changedObject) {
			me.updateFieldDirty(editor, me);
			me.fireEvent('change', editor, changedObject);
		});
		me.editor.on('changes', function (editor, changes) {
			me.fireEvent('changes', editor, changes);
		});
		me.editor.on('beforeChange', function (editor, changedObject) {
			me.fireEvent('beforeChange', editor, changedObject);
		});
		me.editor.on('focus', function (editor) {
			me.fireEvent('focus', editor);
		});
	},

	/**
	 *
	 */
	updateFieldDirty: function (editor, me) {
		me.setDirty(me._originalValue != editor.getValue());
	},

	/**
	 *
	 */
	createThemeComboBox: function (me) {
		return {
			xtype: 'combo',
			store: Ext.create('Ext.data.Store', {
				fields: ['name'],
				data: [{
					"name": "default"
				}, {
					"name": "eclipse"
				}, {
					"name": "neo"
				}, {
					"name": "night"
				}, {
					"name": "paraiso-dark"
				}, {
					"name": "rubyblue"
				}, {
					"name": "the-matrix"
				}, {
					"name": "twilight"
				}, {
					"name": "vibrant-ink"
				}, {
					"name": "xq-dark"
				}, {
					"name": "xq-light"
				}]
			}),
			emptyText: 'Select a theme',
			queryMode: 'local',
			editable: false,
			displayField: 'name',
			valueField: 'name',
			listeners: {
				'change': function (combo, newValue, oldValue, eOpts) {
					me.editor.setOption("theme", newValue);
				}
			}
		}
	},

	/**
	 *
	 */
	showMarkers: function (issues) {
		CUSTOMLINT(this.editor, issues);
	}
});