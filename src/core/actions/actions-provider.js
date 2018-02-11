import constants from 'core/types';

/**
 * setProvider - Set the Provider (MetaMask)
 */
export function setProvider(provider) {

  /* Set the default account */
  provider.eth.getAccounts((error, accounts) => {
    if(error) { return }
    provider.eth.defaultAccount = accounts[0]
  })

  return {
    type    : constants.SET_PROVIDER,
    provider: provider
  };
}
