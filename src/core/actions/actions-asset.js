import constants        from 'core/types'
import contract         from 'truffle-contract'
import ProofOfExistence from 'contracts/ProofOfExistence.json'

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
export function createAssetHash(assetUrl) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const ProofOfExContract = contract(ProofOfExistence)

    ProofOfExContract.setProvider(web3Provider.currentProvider);

    const assetExists = checkIfExists(ProofOfExContract, assetUrl)

    if(assetExists) {
      dispatch((() => {
        return {
          type          : constants.CREATE_ASSET_HASH,
          alreadyExists : true
        }
      })())
    } else {
      const assetHash = notarize(ProofOfExContract, assetUrl)

      dispatch((() => {
        return {
          type          : constants.CREATE_ASSET_HASH,
          assetHash     : assetHash,
          alreadyExists : false
        }
      })())
    }
  }
}

function checkIfExists(contract, asset) {
  contract.deployed().then((poe) => {
    return poe.checkIfExists(asset)
  }).then((exists) => {
    return exists = exists ? true : false
  }).catch((error) => {
    console.log('error', error)
  })
}

function notarize(contract, theAsset) {
  contract.deployed().then((poe) => {
    return poe.notarize(theAsset)
  }).then(result => {
    return (result !== null) ? result : null
  })
}
