import { client } from "./database";
import { run as runPairCrawler } from "./pair";
import { run as runPriceCrawler } from "./price";

const runCrawlers = async () => {
  await client.connect();

  runPairCrawler();
  runPriceCrawler();
};

runCrawlers().catch((err) => {
  console.log("error occured", err);
});
