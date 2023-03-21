import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
const PLAYER_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

const RPC_URL = 'http://localhost:8545';

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const contract = await ethers.getContractAt(
    'Reentrance',
    CONTRACT_ADDRESS,
    signer,
  );

  const balance = await provider.getBalance(CONTRACT_ADDRESS);
  console.log(`Contract balance: ${ethers.utils.formatEther(balance)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
