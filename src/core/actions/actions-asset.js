import constants        from 'core/types'
import contract         from 'truffle-contract'
import ProofOfExistence from 'contracts/ProofOfExistence.json'
import { getString }    from 'core/utils/util-assets'

/**
 * addAsset()
 * Add an asset
 */
export function addAsset(asset) {
  return {
    type  : constants.ADD_ASSET,
    asset : asset
  }
}

/**
 * createAssetHash()
 * Check if an asset's hash already exists.
 * If not, go ahead and create the hash for the asset & notarize.
 */
export function createAssetHash() {
  return (dispatch, getState) => {
    const { stagedAsset } = getState().asset
    const { web3Provider } = getState().provider
    const ProofOfExContract = contract(ProofOfExistence)

    ProofOfExContract.setProvider(web3Provider.currentProvider);

    getString(stagedAsset, (assetURL) => {
      const assetExists = checkIfExists(ProofOfExContract, assetURL)

      if(assetExists) {
        dispatch((() => {
          return {
            type          : constants.CREATE_ASSET_HASH,
            alreadyExists : true
          }
        })())
      } else {
        const assetHash = notarize(ProofOfExContract, assetURL)

        dispatch((() => {
          return {
            type          : constants.CREATE_ASSET_HASH,
            assetHash     : assetHash,
            alreadyExists : false
          }
        })())
      }
    })
  }
}

function checkIfExists(contract, asset) {
  contract.deployed().then((poe) => {
    return poe.checkIfExists(asset)
  }).then((exists) => {
    return exists = exists ? true : false
  })
}

function notarize(contract, theAsset) {
  contract.deployed().then((poe) => {
    return poe.notarize(theAsset)
  }).then(result => {
    return (result !== null) ? result : null
  })
}
