# BeefNote
Simple note taking application.
BeefNote lets you create and edit notes quickly and without any distractions.
Each note is stored as a single file on your disk, so you can edit/backup/archive/restore your notes easily.

### Architecture overview
BeefNote is built on top of [nw.js runtime](http://nwjs.io/), which itself implements `Chromium` and `node.js`.

### Installation instructions
##### Bundled application builds
Bundled application builds (including nw.js) can be downloaded
[here](https://drive.google.com/open?id=0BwmAR5mHWgl4fkwybnRyRlRGWkNuNVJNR2FkcUtmeldEZnBkdmxpRzczZHBBS3hDeVU5Uk0&authuser=0).
Unpack downloaded file and run `nw` executable (`nw.exe` on Windows).
##### Complicated way
To run BeefNote, you will need nw.js runtime, that can be downloaded directly from
[nw.js website](http://nwjs.io/) or from these links:
* [Linux64 - http://dl.nwjs.io/v0.12.2/nwjs-v0.12.2-linux-x64.tar.gz](http://dl.nwjs.io/v0.12.2/nwjs-v0.12.2-linux-x64.tar.gz)
* [Windows64 - http://dl.nwjs.io/v0.12.2/nwjs-v0.12.2-win-x64.zip](http://dl.nwjs.io/v0.12.2/nwjs-v0.12.2-win-x64.zip)
* [OSX64 - http://dl.nwjs.io/v0.12.2/nwjs-v0.12.2-osx-x64.zip](http://dl.nwjs.io/v0.12.2/nwjs-v0.12.2-osx-x64.zip)

Once you download and extract `nw.js` runtime:
* on Linux, navigate to folder you extracted (one containing `notebook`, `www` and `package.json`) and run `$ /path/to/nw .`
* on Windows, drag the unzipped BeefNote folder (one containing `notebook`, `www` and `package.json`) to nw.exe to run it
* on OSX navigate to folder you extracted (one containing `notebook`, `www` and `package.json`) and run`/path/to/nwjs.app/Contents/MacOS/nwjs .`

### Issues
Big part of basic functionality is still missing. This is work in progress.

### Usage
Once you start BeefNote, left panel shows all your notes organized in folders.
Each note/folder is physically represented by a file/folder on the disk.
Click any note to instantly edit it.
Once you open another note, your changes are saved automatically.

All your notes are stored transparently without any junk in 'notebook' folder in the root folder of the application.
That way you can edit them in another applications, archive, backup, restore or do whatever you want with them.
