var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
// router.get('/', function(req, res, next) {
// 	fs.readdir('public/videos', function(error, filenames){
// 		if (error) {
// 			res.status(500).send(error);
// 			return;
// 		}

// 		var videos = filenames.filter(function(filename) { 
// 			return filename.slice(-4) === ".mp4";
// 		});

// 		res.render('index', {"title": "Мультфильмы", "files": videos});
// 	});

// });

const videoPath = 'public/videos';
const videoExtension = '.mp4';

router.get('/', function(req, res, next) {
	var directoryContent = fs.readdirSync(videoPath);
	
	var directories = directoryContent.filter(function(filename) { 
		var stats = fs.statSync(videoPath + '/' + filename);
		return stats.isDirectory();
	});

	var videos = []
	for (var i = 0; i < directories.length; i++) {
		var directory = directories[i];
		var path = videoPath + '/' + directory;
		var directoryContent = fs.readdirSync(path);

		var filenames = directoryContent.filter(function(filename) { 
			return filename.slice(-videoExtension.length) === videoExtension;
		});

		for (var j = 0; j < filenames.length; j++) {
			var filename = filenames[j].slice(0, -videoExtension.length);
			videos.push({ 'directory': directory, 'file': filename });
		}
	}

	res.render('index', {'title': 'Мультфильмы', 'dirs': directories ,'files': videos});

});

module.exports = router;
