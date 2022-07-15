import crons from "../crons";

const run = () => {
  crons.forEach((cron) => cron.run());
};

export default run;
