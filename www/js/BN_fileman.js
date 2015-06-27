// BN_fileman.js
// contains code to handle file (note) management - opening, closing, etc. as well as navigating sideBarTree
var BN = BN || {};

BN.navigate = function navigate(isDir, path) {
	if (isDir) {
		// collapse or expand a directory in a tree
		BN.collapseDir(path);
		// change folders icon
		BN.changeDirIcon(path);
		// highlight active directory
		BN.highlightActiveDir(path);
	} else {
		// change current directory to that of parent of file being opened
		var dirToHighlight = path.substring(0, path.lastIndexOf('/'));
		BN.highlightActiveDir(dirToHighlight);

		BN.saveCurrentFile();
		if (BN.fileIsOpened) {
			//remove cursor css style from current file's item in sidebar tree
			BN.curFileDomElement.classList.remove('sideBarCursor');
		}
		// add cursor css style to current file's item in sidebar tree
		BN.curFileDomElement = document.getElementById(path);
		BN.curFileDomElement.classList.add('sideBarCursor');
		BN.fs.stat(path, function (err, stats) {
			BN.fs.open(path, 'r+', function (err, fd) {
				if (stats.size > 0) {
					var buffer = new Buffer(stats.size);
					BN.fs.read(fd, buffer, 0, buffer.length, null, function(err, bytesRead, buffer) {
						BN.textArea.value = buffer.toString('utf8', 0, buffer.length);
					});
				}
				else {
					BN.textArea.value = '';
				}
				BN.fileIsOpened = true;
				BN.fileWasChanged = false;
				BN.curFileDescriptor = fd;
				BN.curFilePath = path;
			});
		});
	}
};

BN.saveCurrentFile = function saveCurrentFile() {
	if (BN.fileIsOpened) {
		if (BN.fileWasChanged) {
			BN.fs.writeFile(BN.curFilePath, BN.textArea.value, function(err) {
				console.log('File ' + BN.curFilePath + ' saved.');
			});
			BN.fs.close(BN.curFileDescriptor);
		}
	}
};

// collapse or expand directory in sideBar
BN.collapseDir = function collapseDir(path) {
	var element = document.getElementById('TREE' + path);
	if (element.style.display != 'none') {
		element.style.display = 'none';
	}
	else {
		element.style.display = 'inline';
	}
};

// change icon next to directory from arrow pointing right to arrow pointing down or vice versa
BN.changeDirIcon = function changeDirIcon(path) {
	var element = document.getElementById(path);
	if (element.firstChild.attributes['data-glyph']) {
		if (element.firstChild.attributes['data-glyph'].nodeValue == 'caret-right') {
			element.firstChild.attributes['data-glyph'].nodeValue = 'caret-bottom';
		}
		else {
			element.firstChild.attributes['data-glyph'].nodeValue = 'caret-right';
		}
	}
};

BN.highlightActiveDir = function highlightActiveDir(path) {
	if (path + '/' == BN.cfg.curPath) {
		// notebook's root is to become active dir
		if (BN.activeDir) {
			BN.activeDirDomElement.classList.remove('sideBarActiveDir');
		}
		BN.activeDir = false;
		BN.activeDirName = '';
		BN.activeDirPath = path;
		BN.activeDirDomElement = null;
	}
	else {
		// something other than notebook's root is to become active dir
		if (BN.activeDir) {
			BN.activeDirDomElement.classList.remove('sideBarActiveDir');
		}
		BN.activeDir = true;
		BN.activeDirPath = path;
		BN.activeDirName = path.substring(path.lastIndexOf('/') + 1, path.length);
		BN.activeDirDomElement = document.getElementById(path);
		BN.activeDirDomElement.classList.add('sideBarActiveDir');
	}
};

// find out if file 'noteName' is in array 'files'
BN.newNoteExists = function newNoteExists(noteName, files) {
	var i;
	for (i = 0; i < files.length; i++) {
		if (files[i] == noteName) {
			return true;
		}
	}
	return false;
};

// get a unique filename for new note in current directory (make sure one does not exist yet)
BN.getNewNoteName = function getNewNoteName() {
	var files = BN.fs.readdirSync(BN.activeDirPath);
	var c = 1;
	var found = false;

	do {
		// TODO
		// replace newNoteExists with files.indexOf(...)
		// remove variable found
		if (!BN.newNoteExists(BN.cfg.newNoteName + c, files)) {
			found = true;
			break;
		}
		c++;
	} while(!found);
	return BN.cfg.newNoteName + c;
};

// create file for new note, add it to sideBar tree and open it
BN.createNewNote = function createNewNote() {
	var newNoteName = BN.getNewNoteName();
	var fileName = prompt('Enter name of the new note:', newNoteName);
	if (fileName === null) {
		return;
	}
	var path = BN.activeDirPath + '/' + fileName;
	BN.fs.open(path, 'a+', function (err, fd) {
		BN.scanAndFillTree();
		BN.navigate(false, path);
	});
};
