# Transaction Scanner

## Objective:
The main purpose of this app is to retrieve user's wallet transactions through an specific time period determined by block numbers. An additional function can be found that fetches the ETH Balance of a wallet on an specific date.

# How to get started:

You can interact with the hosted react app at 

<link>https://guille-block.github.io/TransactionScanner/</link>

For development purpose, first clone the project in your local repository.
Then install the node dependencies:

```{js}
npm install
```

Finally, run the following command to start the app: 

```{js}
npm start
```
# Improvements:
There are some limitations, specially regarding the balance fetching compenent as it will render you back to the transaction explorer table if not connected to an archive node.
This approach could be improved as it would be a better solution to explore an ethereum node through a graphQL API and not with the etherscan API and web3.


