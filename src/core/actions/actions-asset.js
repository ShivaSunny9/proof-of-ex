import constants from 'core/types';

/**
 * addAsset - Add an asset
 */
export function addAsset(asset) {
  return {
    type  : constants.ADD_ASSET,
    asset : asset
  }
}

export function createAssetHash() {
  return {
    type: constants.CREATE_ASSET_HASH,
    hash: 'e5sb536c0307bbs22sd423334545345ee'
  }
}
