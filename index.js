const express = require("express");
const app = express();

const ytdl = require("ytdl-core");
const path = require("path");

app.use(express.static(path.join(__dirname, "static")));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
    res.render("index.ejs", { status: req.query.sta });
});

app.get("/download", async (req, res) => {
    try {
        var url = req.query.url;
        var format = req.query.format;

        if (ytdl.validateURL(url)) {
            console.log(url, format);
            if (format == "mp3") {
                res.set({ "Content-Type": "audio/mp3", "Content-Disposition": "attachment; filename=audio.mp3" });
                ytdl(url, { filter: "audioonly", quality: "highestaudio" })
                    .on("error", (err) => {
                        console.log(err);
                    }).pipe(res);
            } else if (format == "mp4") {
                res.set({ "Content-Type": "video/mp4", "Content-Disposition": "attachment; filename=video.mp4" });
                ytdl(url, { quality: "highest" }) 
                    .on("error", (err) => {
                        console.log(err);
                    }).pipe(res);
            }
            
        } else {
            return res.redirect("/?sta=error");
        }
    } catch (error) {
        console.error(error);
        return res.redirect("/?sta=error");
    }
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});

module.exports = app;
