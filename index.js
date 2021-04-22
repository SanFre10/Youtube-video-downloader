const express = require('express');
const path = require('path');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();

// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
})

app.get('/download', (req,res) => {
  try {
    var url = req.query.url;
    var format = req.query.format;
    
    if(ytdl.getURLVideoID(url)){ // Verifies URL
      if(format == "mp3"){
        stream = ytdl(url,{ filter: 'audioonly'});
        
        //Converts to .mp3
        ffmpeg(stream)
          .save(`${__dirname}/1.mp3`)
          .on('progress', p => {
            console.log(`${p.targetSize}kb downloaded`);
          })
          .on('end', () => {
            res.header('Content-Disposition', 'attachment; filename="audio.mp3');
            return res.sendFile(`${__dirname}/1.mp3`);
        });
          
      }
      else if(format == "mp4"){
        res.header('Content-Disposition', 'attachment; filename="video.mp4');
        ytdl(url).pipe(res);
      }
    }
  }catch (error) {
    if(error.code == "ERR_INVALID_URL"){
      return res.sendFile(path.join(__dirname, 'public','error.html'));
    }
    
  }

});

app.listen(3000,() => {
  console.log("Listening at 3000")
})

module.exports = app;
