const { exec } = require("child_process");

const migrationGenerate = () => {
  if (!process.argv || !process.argv[2]) {
    throw new Error("Missing migration name!");
  }

  const migrationName = process.argv[2];
  exec(
    `npx typeorm-ts-node-esm migration:generate -d ./src/database/dataSource.ts ./src/database/migrations/${migrationName}`,
    (error, stdout, stderr) => {
      console.log(stdout);
    }
  );
};

migrationGenerate();
