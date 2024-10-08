const hre = require("hardhat");

async function main() {

  const contract = await hre.ethers.deployContract("perc721");

  await contract.waitForDeployment();

  console.log(`Swisstronik contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
