import constants from 'core/types';

/**
 * addAsset - Add an asset
 */
export function addAsset(asset) {
  return {
    type    : constants.ADD_ASSET,
    provider: asset
  };
}
