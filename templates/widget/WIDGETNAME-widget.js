(function(){
	var widget = model.widgets.findWidget('${WIDGETNAME}-widget');

	/* Here your javacript code. */
	widget.hello = "Coucou !";

	model.widgets.apply();
}());