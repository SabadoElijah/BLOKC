"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
  //<Import Token>
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0x65B0158Db7b8477FeE406c8fe206766C740777B8";
    const tokenSymbol = "EOC";
    const tokenDecimal = 18;
    const tokenImage = "https://github.com/aaronbened/ERC20/blob/main/door%20(1).png";

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
            image: tokenImage,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };
  //</Import Token>

  return (
    <main>
        <p  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,fontSize: '24px'}}>Welcome to Mint/Staking of Entrance Only Coin</p>
         
      <div style={{minHeight: '30vh' }}> 
        <button onClick={() => {connectWallet();}}
        className="p-3 bg-slate-800 text-white rounded">
        {walletKey != "" ? walletKey : " Connect wallet"}
        </button>
        
        <button onClick={importToken}
        className="p-3 bg-slate-800 text-white rounded">
        Import Token
        </button>

      </div>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <br></br>
      <form>
        <label> Input Amount To Mint</label><br></br>
        </form>
      <input
        type="number"
        value = {mintingAmount}
        onChange = {(e) => mintAmountChange(e)}
        style={{color:"Black"}}
      />
      <button 
        onClick={() => {mintCoin();}}
        className="p-3 bg-slate-800 text-white rounded"
      >
        {"Mint Token"}
      </button> 
      
    </div>
    <br></br>

    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
    <form>
        <label> Input Amount To Stake</label><br></br>
        </form>
      <input
        type="number"
        value = {stakingAmount}
        onChange = {(e) => stakeAmountChange(e)}
        style={{color:"Black"}}
      />
    
      <button 
        onClick={stakeCoin}
        className="p-3 bg-slate-800 text-white rounded"
      >
        {"Stake It"}
      </button> 
    </div>

  <div>
    <br></br>
    <label>Wait for Atleast 1 min before Withdrawing </label>
    <br></br>
    <button 
        onClick={withdrawCoin}
        className="p-3 bg-slate-800 text-white rounded"
      >
        {"Withdraw"}
      </button> 
      </div>

    </main>
  );
}
