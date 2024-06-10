import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";
// Importiamo la chiave privata del nostro wallet che abbiamo salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "../test.json";

import { createMint } from "@solana/spl-token";

// Creiamo una nuova istanza di Keypair passando la chiave privata del nostro wallet come argomento
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creiamo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {
        
        const mint = await createMint(connection,keypair,keypair.publicKey,null,6,);


        // Attendiamo la conferma della transazione e poi logghiamo il link alla transazione sull'explorer di Solana    
        //console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    
        console.log("Mint address: ",mint.toBase58());

    } catch (error) {
        console.error(error);
    }
})();