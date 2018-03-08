import constants from 'core/types'

/**
 * setProvider - Set the Provider (MetaMask)
 */
export function setProvider(provider) {
  return (dispatch) => {
    /* Set the default account */
    provider.eth.getAccounts((error, accounts) => {
      if (error) { return }

      const userAccount = accounts[0]
      provider.eth.defaultAccount = userAccount

      dispatch((() => {
        return {
          type: constants.SET_PROVIDER,
          provider: provider
        }
      })())

      dispatch((() => {
        return {
          type: constants.SET_ACCOUNT,
          id: userAccount
        }
      })())
    })
  }
}
