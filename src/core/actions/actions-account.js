import constants from 'core/types'

export function setEmail(email) {
  return {
    type: constants.SET_ACCOUNT_EMAIL,
    email: email
  }
}

export function clear() {
  return {
    type: constants.CLEAR_ACCOUNT
  }
}

export function getMetaMaskId() {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider

    web3Provider.eth.getAccounts((error, accounts) => {
      if (error) { return }

      const userAccount = accounts[0]

      /* Set the default account */
      web3Provider.eth.defaultAccount = userAccount

      dispatch((() => {
        return {
          type: constants.GET_METAMASK_ID,
          id: userAccount
        }
      })())
    })
  }
}
