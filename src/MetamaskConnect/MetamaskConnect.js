import React from 'react'

const MetamaskConnect = () => {
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
    return (
        <div>
            <button>Connect to Metamsk</button>

        </div>
    )
}

export default MetamaskConnect