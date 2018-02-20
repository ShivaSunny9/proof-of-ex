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

    ProofOfExContract.setProvider(web3Provider.currentProvider)
    ProofOfExContract.defaults({from: web3Provider.eth.defaultAccount})

    return new Promise((resolve, reject) => {
      checkIfExists(ProofOfExContract, assetUrl, resolve, reject)
    })
    .then((assetExists) => {
      if(assetExists) {
        dispatch((() => {
          return {
            type          : constants.CREATE_ASSET_HASH,
            alreadyExists : true
          }
        })())
      } else {
        return new Promise((resolve, reject) => {
          notarize(ProofOfExContract, assetUrl, resolve, reject)
        })
        .then((assetHash) => {
          dispatch((() => {
            return {
              type          : constants.CREATE_ASSET_HASH,
              alreadyExists : false,
              assetHash     : assetHash
            }
          })())
        })
      }
    })
  }
}

function checkIfExists(contract, asset, resolve, reject) {
  contract.deployed().then((poe) => {
    return poe.checkIfExists(asset)
  }).then((exists) => {
    const assetExists = exists ? true : false
    resolve(assetExists)
  }).catch((error) => {
    reject(error)
  })
}

function notarize(contract, theAsset, resolve, reject) {
  contract.deployed().then((poe) => {
    return poe.notarize(theAsset)
  }).then(result => {
    const assetHash = (result !== null) ? result : null
    resolve(assetHash)
  }).catch((error) => {
    reject(error)
  })
}
