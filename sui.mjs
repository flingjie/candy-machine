import { Ed25519Keypair, JsonRpcProvider, RawSigner } from '@mysten/sui.js';


const MNEMONIC = "xxx"
const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC);
const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io:443');
const signer = new RawSigner(keypair, provider);


export async function mint (item) {
  console.log("start mint:", JSON.stringify(item, null, 2))
  const moveCallTxn = await signer.executeMoveCallWithRequestType({
    packageObjectId: '0x2',
    module: 'devnet_nft',
    function: 'mint',
    typeArguments: [],
    arguments: [
      item.name,
      item.description,
      item.image,
    ],
    gasBudget: 10000,
  });
  console.log('moveCallTxn', moveCallTxn);
}