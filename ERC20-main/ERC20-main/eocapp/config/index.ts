import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x65B0158Db7b8477FeE406c8fe206766C740777B8",
        abi as any,
        signer
    );
}