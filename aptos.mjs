import { AptosClient, AptosAccount, TokenClient } from "aptos";

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL = process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const tokenClient = new TokenClient(client);
const account = AptosAccount.fromDerivePath("m/44'/637'/2'/0'/0'", "");
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); // <:!:section_1a

console.log(`account: ${account.address()}`);
const collectionName = "Legend's";

(async () => {
  await faucetClient.fundAccount(account.address(), 100_000_000);
  console.log(`Account balance: ${await coinClient.checkBalance(account)}`);

})
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
