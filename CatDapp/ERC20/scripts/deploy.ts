import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("CAT", ["0x4D0c96842Dd6a06707C64Ca115277e618e37189e"]); //wallet add

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});