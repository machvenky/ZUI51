/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/ui5/ZUI51/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});