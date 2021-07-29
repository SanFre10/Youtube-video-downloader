const express = require("express");
const ytdl = require("ytdl-core");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");


app.get("/", (req, res) => {
    res.render("index.ejs", { status: req.query.sta, id: req.query.id });
});
app.post("/search", (req, res) => {
    try {
        id = ytdl.getURLVideoID(req.body.url)
        return res.redirect(`/?id=${id}`);
    } catch (error) {
        return res.redirect("/?sta=error");
    }
})
app.get("/download", async (req, res) => {
    try {
        var url = req.query.url;
        var format = req.query.format;

        if (ytdl.validateURL(url)) {
            if (format == "mp3") {
                res.set({ "Content-Type": "audio/mp3", "Content-Disposition": "attachment; filename=audio.mp3", "Location": "/?sta=ok" });
                ytdl(url, { filter: "audioonly", quality: "highestaudio" })
                    .on("error", (err) => {
                        console.log(err);
                    }).pipe(res);
            } else if (format == "mp4") {
                res.set({ "Content-Type": "video/mp4", "Content-Disposition": "attachment; filename=video.mp4" , "Location": "/?sta=ok"});
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

app.listen(port, () => {
    console.log("Listening at " + port);
});

module.exports = app;
