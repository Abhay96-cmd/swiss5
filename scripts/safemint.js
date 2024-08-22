  const hre = require("hardhat");

const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {

  const rpclink = hre.network.config.url;

  const [encryptedData] = await encryptDataField(rpclink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {

  const contractAddress = "0xA150791b6207988af7Adfb0Bef2e43dBe342F485";

  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("perc721");
  const contract = contractFactory.attach(contractAddress);


  const mintToken = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData("safeMint", [signer.address]), 0);
  await mintToken.wait();

  console.log("Transaction Receipt: ", mintToken);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



