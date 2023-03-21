import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0x625A692E96605c988192cd59563e5EB2f1E33C87';
const PLAYER_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const king = await ethers.getContractAt('King', CONTRACT_ADDRESS, signer);

  const RealKing = await ethers.getContractFactory('EternalKing');
  const realKing = await RealKing.deploy();

  const tx = await realKing.becomeKing(CONTRACT_ADDRESS);

  console.log('King:', await king._king());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
