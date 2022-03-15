const { faker } = require('@faker-js/faker');

const connection = require("../database/connection");

const maxProcess = 3;
let process = [];

const queue = async () => {
  if (process.length >= maxProcess) {
    console.log("Queue is full, waiting some process finish");
    await process[0];

    return queue();
  }

  console.log("Running process...");

  const promise = run();
  let result;

  process.push(promise);

  try {
    result = await promise;
  } catch (ex) {
    throw ex;
  } finally {
    console.log("Process done, removing...");

    process = process.filter((p) => p !== promise);
  }

  return result;
}

const run = async () => {
  const name = faker.name.findName();

  await connection("users").insert({
    name
  });
  
  console.log(`Process finished... user ${name} added`);
}

module.exports = {
  queue,
  run,
};