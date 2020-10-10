const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express(); // server init

app.set("view-engine", "ejs");

app.set("port", 3000); // server on 3000

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // parse data
app.use(express.static("public"));

// mongodb connection
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

// dbase schema
const articleSchema = {
  title: String,
  content: String,
};

// article model
const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")
  .get(function (req, res) {
    Article.find((err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else res.send("no articles found");
    });
  })
  .post(function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send("success");
      } else res.send(err);
    });
  })
  .delete(function (req, res) {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("success");
      } else res.send(err);
    });
    console.log();
  });

app
  .route("/articles/:title")
  .get((req, res) => {
    Article.findOne({ title: req.params.title }, (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send(err);
      }
    });
  })
  .post()
  .put((req, res) => {
    Article.update(
      { title: req.params.title },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err) => {
        if (!err) {
          res.send("update successful");
        } else {
          res.send("update failed");
        }
      }
    );
  })
  .patch((req, res) => {
    Article.update({ title: req.params.title }, { $set: req.body }, (err) => {
      if (!err) {
        res.send("patch success");
      } else res.send("patch failed");
    });
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.title }, (err) => {
      if (!err) {
        res.send("delete success");
      } else res.send("delete failed");
    });
  });

app.listen(app.get("port"), () => {
  console.log("app running on port:", app.get("port"));
});
