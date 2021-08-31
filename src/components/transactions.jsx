import React from 'react';
import web3 from 'web3'

const Transaction = ({transactionChild}) => {
    return(
      <div>
        <table class="styled-table">
            <thead>
                <tr>
                  <th>Transaction Hash</th>
                  <th>Block Number</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Eth Value</th>
                </tr>
            </thead>
              <tbody>
                {transactionChild.map(transaction => (
                    <tr key = {transaction.hash}>
                    <td>{transaction.hash}</td>
                    <td>{transaction.blockNumber}</td>
                    <td>{transaction.from}</td>
                    <td>{transaction.to}</td>
                    <td>{web3.utils.fromWei(transaction.value)}</td>
                  </tr>
                ))}
            </tbody>
        </table>
        </div>
)}

export default Transaction;