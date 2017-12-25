import constants from 'core/types';

/**
 * setProvider - Set the Provider (MetaMask)
 */
export function setProvider(provider) {
  return {
    type: constants.SET_PROVIDER,
    provider: provider
  };
}
