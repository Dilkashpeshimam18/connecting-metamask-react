import React, { useState } from 'react'
import Web3 from 'web3';

const MetamaskConnect = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const detectProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log(
                'Non-Ethereum browser detected. You should consider trying MetaMask!'
            );
        }
        return provider
    }
    const connectMetamask = async () => {
        try {
            const currentProvider = detectProvider()
            if (currentProvider) {
                if (currentProvider !== window.ethereum) {
                    console.log(
                        'Non-Ethereum browser detected. You should consider trying MetaMask!'
                    );
                }
            }
            await currentProvider.request({ method: 'eth_requestAccounts' })
            const web3 = new Web3(currentProvider)
            let userAccount = web3.eth.getAccounts()
            let account = userAccount[0]
            const chainId = web3.eth.getChainId()
            let ethBalance = web3.eth.getBalance(account)
            ethBalance = web3.utils.fromWei(ethBalance, 'ether')
            saveUserData(ethBalance, account, chainId)
            if (userAccount.length === 0) {
                console.log('Please connect to meta mask');
            }
        } catch (err) {
            console.log('There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
            )
        }
    }

    const saveUserData = (balance, account, chainId) => {
        let user = {
            account: account,
            balance: balance,
            connectionid: chainId,
        }
        localStorage.setItem('userAccount', JSON.stringify(user))
        const userData = JSON.parse(localStorage.getItem('userAccount'))
        setUserInfo(userData)
        setIsConnected(true);

    }
    return (
        <div>
            <button onClick={connectMetamask}>Connect to Metamsk</button>

        </div>
    )
}

export default MetamaskConnect