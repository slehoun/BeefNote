// BN_util.js
// various pieces of logic
var BN = BN || {};

BN.multiplyString = function(string, multiplicator) {
	var i;
	var result = '';

	for (i = 0; i < multiplicator; i++) {
		result += string;
	}

	return result;
};

// Replace default action in textarea for pressing tab.
// Instead of changing focus to another element, insert a tab character
BN.catchTab = function(e) {
	if(e.keyCode === 9) { // tab was pressed
		// get caret position/selection
		var start = this.selectionStart;
		var end = this.selectionEnd;

		var target = e.target;
		var value = target.value;

		// set textarea value to: text before caret + tab + text after caret
		target.value = value.substring(0, start) +
			'\t' +
			value.substring(end);

		// put caret at right position again (add one for the tab)
		this.selectionStart = this.selectionEnd = start + 1;

		// prevent the focus lose
		e.preventDefault();
	}
};

BN.textAreaChanged = function(e) {
	BN.fileWasChanged = true;
};

// Get DOM element's absolute coordinates
BN.getOffset = function(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
};
