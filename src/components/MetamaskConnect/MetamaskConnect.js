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
            console.log(currentProvider)
            if (currentProvider) {
                if (currentProvider !== window.ethereum) {
                    console.log(
                        'Non-Ethereum browser detected. You should consider trying MetaMask!'
                    );
                }
                if (window.ethereum) {
                    await window.ethereum.enable();
                }
                let account;
                await currentProvider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                    account = accounts[0]
                })
                saveUserData(account)


            }

        } catch (err) {
            console.log(err)
        }
    }

    const saveUserData = (account) => {
        let user = {
            account: account,

        }
        console.log(user)
        localStorage.setItem('userAccount', JSON.stringify(user))
        const userData = JSON.parse(localStorage.getItem('userAccount'))
        setUserInfo(userData)
        setIsConnected(true);

    }

    return (
        <div>
            <button onClick={connectMetamask}>Connect to Metamsk</button>
            {userInfo && <p>{userInfo.account}</p>}

        </div>
    )
}

export default MetamaskConnect