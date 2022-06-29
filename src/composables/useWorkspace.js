import { computed } from "vue";
import { useAnchorWallet } from "solana-wallets-vue";
import { Connection, PublicKey } from "@solana/web3.js";
import * as Anchor from "@project-serum/anchor";
import idl from "../../../target/idl/solana_twitter.json";

const programID = new PublicKey(idl.metadata.address);
let workspace = null;

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection("http://127.0.0.1:8899");
  const provider = computed(
    () => new Anchor.Provider(connection, wallet.value)
  );

  // console.log({ provideer: provider.value });
  const program = computed(
    () => new Anchor.Program(idl, programID, provider.value)
  );

  // console.log({ program: program.value });

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};
