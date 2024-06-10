import { 
    Keypair, 
    Connection, 
    PublicKey,
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";
// Importiamo la chiave privata del nostro wallet che abbiamo salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "../test.json";

import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

//mettiamo la publicKey creata con spl_init 
/*C:\Users\ion.mita\Desktop\masterz-basics>yarn createMint
yarn run v1.22.22
$ ts-node ./lezione5/spl_init.ts
bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)
Mint address:  GF89xJhiq9SG5avzXvDhcubBJ8MxP8vcYkwxne8paY1e
Done in 4.06s.*/
const mint = new PublicKey("GF89xJhiq9SG5avzXvDhcubBJ8MxP8vcYkwxne8paY1e");

// Creiamo una nuova istanza di Keypair passando la chiave privata del nostro wallet come argomento
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creiamo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {

        console.log(" PublicKey : " , keypair.publicKey.toBase58());

        const tokenAccount = await getOrCreateAssociatedTokenAccount(connection,keypair, mint, keypair.publicKey,)
        // Attendiamo la conferma della transazione e poi logghiamo il link alla transazione sull'explorer di Solana
       // console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);

       const ata = tokenAccount.address;

       console.log(" Associated token account : " , ata.toBase58());
    
 

    // il nostro token ha 6 decimali quindi se voglio mintare 10 token devo fare 10 * 10^6 

    const amount = 10e6;

    await mintTo(connection,keypair,mint,ata,keypair.publicKey,amount);

    console.log(" Minted : " ,amount, " to : ", ata.toBase58());

} catch (error) {
    console.error(error);
}

})();