
  Meteor.startup(function () {
    // code to run on server at startup

var  ffmpeg = Meteor.npmRequire('fluent-ffmpeg');
// var Fiber = Meteor.npmRequire('fibers');

ffmpeg.setFfmpegPath('C:\\bin\\ffmpeg.exe')
ffmpeg.setFfprobePath('C:\\bin\\ffprobe.exe')

//  ffmpeg.ffprobe('C:\\bin\\walking.avi', function(err, metadata) {
//     console.dir(metadata);
//     console.dir(err);
// });

 // var resolve = Meteor.wrapAsync(ffmpeg.on);

Meteor.methods({ 	

	    	'sendEncode': function(input, inputAr, inputVc,inputId,inputCl){ // récupération du paramètre passé par le meteor.call

	    	var FileToEncode = ffmpeg(input)
				  // set video bitrate
				  .videoBitrate(1024)
				  // set target codec
				  .videoCodec(inputVc)
				  // set aspect ratio
				  .aspect(inputAr)
				  // set size in percent
				  .size('50%')
				  // set fps
				  .fps(24)
				  // set audio bitrate
				  .audioBitrate('128k')
				  // set audio codec
				  .audioCodec('libmp3lame')
				  // set number of audio channels
				  .audioChannels(2)
				  // set output format to force
				  .format('avi')
				  // setup event handlers
				  .on('end', Meteor.bindEnvironment(function(stdout, stderr) {
				    console.log('file has been converted succesfully');
				     files.update({ _id: inputId }, { $set: { status: 'done' } });
				  }))
				  .on('error', function(err, stdout, stderr) {
				    console.log('an error happened: ' + err.message);
				  })
				   .on('stderr', function(stderrLine) {
   					 console.log('Stderr output: ' + stderrLine);
  				  })
				   .on('stdout', function(stdoutLine) {
   					 console.log('Stdout output: ' + stdoutLine);
 				  })
				  .on('progress', function(progress) {
   					 console.log('Processing: ' + progress.percent + '% done');
   				  })
				  // save to file
				  .save('C:\\apps\\'+ inputCl +'.avi');

				  
    	}

    		
 // make sure you set the correct path to your video file
// var proc = ffmpeg('C:\\bin\\walking.avi')
//   // set video bitrate
//   .videoBitrate(1024)
//   // set target codec
//   .videoCodec('mpeg4')
//   // set aspect ratio
//   .aspect('16:9')
//   // set size in percent
//   .size('50%')
//   // set fps
//   .fps(24)
//   // set audio bitrate
//   .audioBitrate('128k')
//   // set audio codec
//   .audioCodec('libmp3lame')
//   // set number of audio channels
//   .audioChannels(2)
//   // set custom option
//   .addOption('-vtag', 'DIVX')
//   // set output format to force
//   .format('avi')
//   // setup event handlers
//   .on('end', function() {
//     console.log('file has been converted succesfully');
//   })
//   .on('error', function(err) {
//     console.log('an error happened: ' + err.message);
//   })
//   // save to file
//   .save('C:\\apps\\walking2.avi');


  });
});
