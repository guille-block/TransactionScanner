import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import Transaction from './components/transactions'
import Balances from './components/balances'
import './App.css';



const App = () => {
  
  //Set a lazy address to initialize computations (no need for update function)
  const address= '0xAc1cC3E2be6a0267a4feb54190bFC2c06D4AE3dd'


  //Variables with unique modifier
  const [transactions, setTransactions] = useState([])
  const [searchTrans, setSearchTrans] = useState('')
  const [searchBlock, setSearchBlock] = useState('')
  const [blockNum, setBlockNum] = useState('')
  const [web3, setWeb3] = useState({})
  const [query, setQuery] = useState([address, '0'])
  const [date, setDate] = useState('')
  const [finder, setFinder] = useState(true)
  const [balance, setBalance] = useState('')

  // Etherscan lazy API to get transactions
  const url = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${query[0]}&startblock=${query[1]}&endblock=99999999&sort=asc&apikey=YourApiKeyToken`

  useEffect(() => {
    console.log('Effect is running')
    loadBlockchain()
    getTransactions()
  }, [query])

  //Initialize and enable web3 provider 
  const loadBlockchain = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3)
      try {
        await window.ethereum.enable()
      } catch (error) {
        // User denied account access
        console.log(error);
      }
    }
  }

//Balance retriever function
//Gets the timestamp from an specific date
//Fetches the block number at specific timestamp
//Via web3 you get the balance of ETH from intAddress at specific block number
const getEthBalance = async () => {
    const historicTimestamp = new Date(date).getTime();
    const timestamp = historicTimestamp/1000
    setBlockNum(`https://api-rinkeby.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=YourApiKeyToken`)
    let callResult = await fetch(blockNum)
    let blockJson = await callResult.json()
    const intAddress = searchTrans == '' ? address : searchTrans
    const balancePre = await web3.eth.getBalance(intAddress, blockJson.result)
    const balanceAct = balancePre != 'undefined' ? balancePre : 0
    setBalance(balanceAct)
}

//Transactions explorer

  const getTransactions = async () => {
    let result = await fetch(url)
    let json = await result.json()
    setTransactions(json.result)
  }

  //Update wallet address
  const updateSearchTrans = e => {
    setSearchTrans(e.target.value)
  }

  //Update block number
  const updateSearchBlock = e => {
    setSearchBlock(e.target.value)
  }
  
  //Update Search of the transaction explorer
  const getSearch = e => {
    e.preventDefault()
    setQuery([searchTrans, searchBlock])
    setSearchTrans('')
    setSearchBlock('0')
  }


  //Balances explorer

  const updateSetDate = e => {
    setDate(e.target.value)
  }

  //Set trans table
  const finderSetterTrans = () => {
    setFinder(true)
  }

  //Set balance table
  const finderSetterBal = () => {
    setFinder(false)
  }


  return (
    <div>
      <header>
        <span className = "trans-header">Transaction Scanner</span>
      </header>
      <body>
        <div className = "row-ordering">
          <form onSubmit ={getSearch} className = "form-transaction">
            <div >
            <span>Transactions by wallet</span>
              <div class="input-group trans-input">
                <span class="input-group-text">Wallet</span>
                <input type="text" placeholder="e.g. 0x7b9b6897b09AFac20186FE4aA8e54021B43175E6" value = {searchTrans} onChange ={updateSearchTrans} className= "form-control" required></input>
              </div>
              <div class="input-group trans-input">
                <span class="input-group-text">Starting Block</span>
                <input type="text" placeholder="e.g. 0" value = {searchBlock} onChange ={updateSearchBlock} className= "form-control"></input>
              </div>
            </div>
            <button  type="submit" class="btn btn-secondary" onClick= {finderSetterTrans}>Search Transactions</button>
          </form>
          <form onSubmit ={getEthBalance} className = "form-transaction">
            <div >
            <span> ETH Balances by wallet (Make sure you have access to archive node)</span>
              <div class="input-group trans-input">
                <span class="input-group-text">Date</span>
                <input type="text" placeholder="e.g. July 24, 2021 00:00:00" value = {date} onChange ={updateSetDate} className= "form-control" required></input>
              </div>
            </div>
            <button  type="submit" class="btn btn-secondary" onClick= {finderSetterBal}>Search Balance</button>
          </form>
        </div>
        <div className = "div-table">
          {
          finder 
          ? <Transaction
          transactionChild = {transactions}/> 
          : <Balances
          balance = {balance}
          date = {date}
          address = {searchTrans == '' ? address : searchTrans}/>
          }
        </div>
      </body>
    </div>
  );
}

export default App;