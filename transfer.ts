import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey
} from "@solana/web3.js";

// Importiamo la chiave privata del nostro wallet che abbiamo salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "./test.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey("4xG6fB11gVZBBmmdMTrLtpabnjYswpYRCTCrfqB1hTBf");

const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    try {
        
        const transferInstruction = SystemProgram.transfer({
            fromPubkey: from.publicKey, 
            toPubkey: to, 
            lamports: 0.2 * LAMPORTS_PER_SOL
        });
        
        const transaction = new Transaction().add(transferInstruction);

        transaction.feePayer= from.publicKey;
        
        //skipPreFlight serve per postare on chain la nostra transazione anche quando fallisce, per esempio fallisce per
        // insufficient credit dato però che sto postando la tsx on chain allora devo pagare la fee 
        const txHash = await sendAndConfirmTransaction(connection, transaction, [from], {commitment: "finalized", skipPreflight: true });
        // Attendiamo la conferma della transazione e poi logghiamo il link alla transazione sull'explorer di Solana
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();