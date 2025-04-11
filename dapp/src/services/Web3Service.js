import ABI from "./ABI.json";
import Web3 from "web3";

const CONTRACT_ADDRESS = "0x9C2015fb9B99bA5E0701A621f28eF39e65c87307";

export async function doLogin(){
    if(!window.ethereum) throw new Error("MetaMask não encontrada!");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Carteira não encontrada/autorizada");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

function getContract(){
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addCampaign(campaign){
    const contract = getContract();
    return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}

export async function getLastCampaignId(){
    const contract = getContract();
    return contract.methods.nextId().call();
}

export async function getCampaign(id){
    const contract = getContract();
    return contract.methods.campaigns(id).call();
}

export async function donate(id, donation){
    await doLogin();
    const contract = getContract();
    return contract.methods.donate(id).send({
        value: Web3.utils.toWei(donation, "ether")
    })
}