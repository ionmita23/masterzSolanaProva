import { 
    Keypair, 
    Connection, 
    PublicKey,
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";
// Importiamo la chiave privata del nostro wallet che abbiamo salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "../test.json";

import { transfer, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

//mettiamo la publicKey creata con spl_init 
/*C:\Users\ion.mita\Desktop\masterz-basics>yarn createMint
yarn run v1.22.22
$ ts-node ./lezione5/spl_init.ts
bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)
Mint address:  GF89xJhiq9SG5avzXvDhcubBJ8MxP8vcYkwxne8paY1e
Done in 4.06s.*/
const mint = new PublicKey("GF89xJhiq9SG5avzXvDhcubBJ8MxP8vcYkwxne8paY1e");

const fromAta = new PublicKey("B9JyEvRKgEHPPbcZq6cwp5PpTJeQYDVYwJKBhaYPenDs");

const to = Keypair.generate();

console.log( " TO: ", to.publicKey.toBase58());
// Creiamo una nuova istanza di Keypair passando la chiave privata del nostro wallet come argomento
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creiamo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {

        console.log(" PublicKey : " , keypair.publicKey.toBase58());

        const tokenAccount = await getOrCreateAssociatedTokenAccount(connection,keypair, mint, to.publicKey,)
        // Attendiamo la conferma della transazione e poi logghiamo il link alla transazione sull'explorer di Solana
       // console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);

       const toAta = tokenAccount.address;

       console.log(" Associated token account : " , toAta.toBase58());

       const amount = 10e5;

       transfer(connection,keypair,fromAta,toAta,keypair,amount);

       console.log(" Transfered ",amount," from: ", fromAta.toBase58, " to ", toAta.toBase58 );
    // il nostro token ha 6 decimali quindi se voglio mintare 10 token devo fare 10 * 10^6 

    

} catch (error) {
    console.error(error);
}

})();