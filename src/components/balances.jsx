import React from 'react';
import web3 from 'web3'
import './components.css'

const Balances = ({balance, date, address}) => {

    return(
        <div>
        <table class="styled-table">
            <thead>
                <tr>
                  <th>Wallet</th>
                  <th>Date</th>
                  <th>Token</th>
                  <th>Balance</th>
                </tr>
            </thead>
              <tbody>
                    <tr>
                    <td>{address}</td>
                    <td>{date}</td>
                    <td>Eth</td>
                    <td>{web3.utils.fromWei(balance)}</td>
                  </tr>
            </tbody>
        </table>
        </div>
    )
}

export default Balances