# Lendsqr
MVP (Minimum viable product)  wallet service
Wallet functionality, for lending and borrowing services

A user can create an account: POST request
  - Expects an email, password and pin in the body for a new user and creates a new user, sets balance to $0.00 and returns a wallet ID which is then used for subsequent transaction by the user along with the transaction pin. 
  
A user can fund their account: POST request
  - Expects a walletID and amount in the body to deposite, this funds the account of the account associated with the wallet ID.

A user can transfer funds to another user’s account: POST request
  - Expects a receiverID, senderID, amount and pin in the body to complete a successful transfer of funds from the senders wallet to the receivers wallet. 
  
A user can withdraw funds from their account: POST request
- Expects a walletID, amount, pin to withdraw funds from a users wallet.
