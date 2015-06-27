// BN_init.js
// contains initialization code that is called on startup
var BN = BN || {};

BN.init = function init() {
	BN.sideBarDiv = document.getElementById('BN_tree');
	BN.bodyDiv = document.getElementById('BN_body');
	BN.textArea = document.getElementById('BN_textArea');
	BN.textArea.addEventListener ('keydown', BN.catchTab, false);
	BN.textArea.addEventListener ('change', BN.textAreaChanged, false);
	BN.fs = require('fs');
	BN.registerEventListeners();

	BN.curTree = {};
	BN.curTree.files = [];
	BN.curTree.dirs = [];

	// TODO
	// make sure currentPath in BN.cfg contains trailing slash
	// if not, add it also to BN.cfg object!!!!!!

	BN.scanAndFillTree();

	BN.curFile = {
		isOpened: false,
		wasChanged: false,
		descriptor: null,
		path: null,
		domElement: null
	};

	BN.curDir = {
		isRoot: true,
		name: '',
		path: BN.cfg.curPath,
		domElement: null
	};

	BN.fileIsOpened = false;
	BN.fileWasChanged = false;
	BN.curFileDescriptor = null;
	BN.curFilePath = null;
	BN.curFileDomElement = null;
	BN.activeDir = false; // false: meaning active dir is notebook's root
	BN.activeDirName = '';
	BN.activeDirPath = BN.cfg.curPath;
	BN.activeDirDomElement = null;
	// BN.navigate(false, '/welcome/');
};

BN.scanAndFillTree = function scanAndFillTree() {
	BN.curTree = BN.readTree(BN.cfg.curPath);
	// console.log(BN.curTree);
	BN.sideBarDiv.innerHTML = '<ul>' + BN.fillTree(BN.cfg.curPath, BN.curTree, 0) + '</ul>';
};

BN.readTree = function readTree(path) {
	var tree = {};
	var dirTree = {};
	tree.files = [];
	tree.dirs = [];
	var files = BN.fs.readdirSync(path);
	var i;
	var fullPath;
	var fStats;
	for (i=0; i < files.length; i++) {
		fullPath = path + files[i];
		fStats = BN.fs.statSync(fullPath);
		if (fStats.isDirectory() === true) {
			// get tree directory, insert it into variable dirTree
			dirTree = BN.readTree(fullPath + '/');
			tree.dirs.push({ name: files[i], path: fullPath, isOpened: false, tree: dirTree });
		}
		if (fStats.isFile() === true) {
			tree.files.push({ name: files[i], path: fullPath });
		}
	}

	return tree;
};

BN.fillTree = function fillTree(path, tree, level) {
	var treeInHtml = '';
	treeInHtml += '<span id="TREE' + path + '" style="display:inline;">';
	var dirHtml01 = '<li id="';
	// here the full path to navigate will be inserted
	var dirHtml02 = '" class="sideBarDir" onclick="BN.navigate(true, \'';
	// here the full path to navigate will be inserted
	var dirHtml03 = '\')">';
	var dirHtmlSpacer = BN.multiplyString('&nbsp;', level * 4);
	var dirHtmlIcon = '<span class="oi" data-glyph="caret-bottom" aria-hidden="true"></span>&nbsp;';
	// here the label will be inserted
	var dirHtmlEnd = '</li>';

	var fileHtml01 = '<li id="';
	// here the full path to navigate will be inserted
	var fileHtml02 = '" class="sideBarFile" onclick="BN.navigate(false, \'';
	// here the full path to navigate will be inserted
	var fileHtml03 = '\')">';
	var fileHtmlSpacer = BN.multiplyString('&nbsp;', level * 4);
	var fileHtmlIcon = ''; //'<span class="oi" data-glyph="file" aria-hidden="true"></span>&nbsp;';
	// here the label will be inserted
	var fileHtmlEnd = '</li>';

	var dir;
	var file;
	var i = 0;
	var dirsLength = 0;
	var filesLength = 0;

	if (tree.dirs) {
		dirsLength = tree.dirs.length;
		for (i = 0; i < dirsLength; i++) {
			// populate directories
			treeInHtml += dirHtml01 +
						tree.dirs[i].path +
						dirHtml02 +
						tree.dirs[i].path +
						dirHtml03 +
						dirHtmlSpacer +
						dirHtmlIcon +
						tree.dirs[i].name +
						dirHtmlEnd;
			treeInHtml += BN.fillTree(tree.dirs[i].path, tree.dirs[i].tree, level + 1);
		}
	}

	if (tree.files) {
		filesLength = tree.files.length;
		for (i = 0; i < filesLength; i++) {
			// populate files
			treeInHtml += fileHtml01 +
						tree.files[i].path +
						fileHtml02 +
						tree.files[i].path +
						fileHtml03 +
						fileHtmlSpacer +
						fileHtmlIcon +
						tree.files[i].name +
						fileHtmlEnd;
		}
	}
	treeInHtml += '</span>';
	return treeInHtml;
};

BN.registerEventListeners = function registerEvenetListeners() {
	//
	window.onbeforeunload = function() {
		BN.saveCurrentFile();
	};
	// catch keyboard input
	//
};

