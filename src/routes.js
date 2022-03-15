const express = require("express");
const { queue } = require("./helpers/queue.helper");

const routes = express.Router();

routes.get("/", async function (request, response, next) {
  try {
    setTimeout(async () => {
      //await queue();
    }, 3000);

    await queue();

    return response.json({ message: "ok" });
  } catch (ex) {
    return next(ex);
  }
});

module.exports = routes;