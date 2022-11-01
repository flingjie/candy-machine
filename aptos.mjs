import { AptosClient, AptosAccount, TokenClient } from "aptos";

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.testnet.aptoslabs.com";
const client = new AptosClient(NODE_URL);
const tokenClient = new TokenClient(client);
const account = AptosAccount.fromDerivePath("m/44'/637'/2'/0'/0'", "");
console.log(`account: ${account.address()}`);
const collectionName = "Legend's";

export async function mint (item) {
  const txnHash = await tokenClient.createToken(
    account,
    collectionName,
    item.name,
    item.description,
    1,
    item.image,
  );
  await client.waitForTransaction(txnHash, { checkSuccess: true });

  console.log('txnHash=>', txnHash);
}
