import constants        from 'core/types'
import contract         from 'truffle-contract'
import ProofOfExistence from 'contracts/ProofOfExistence.json'
import sha256           from 'sha256'
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
    const assetHash = sha256(assetUrl)

    ProofOfExContract.setProvider(web3Provider.currentProvider)
    ProofOfExContract.defaults({from: web3Provider.eth.defaultAccount})

    return new Promise((resolve, reject) => {
      checkIfExists(ProofOfExContract, assetHash, resolve, reject)
    })
    .then((assetExists) => {
      assetExists ? dispatchAlreadyExists(dispatch) : notarizeAsset(ProofOfExContract, assetHash, dispatch)
    })
  }
}

function checkIfExists(contract, assetHash, resolve, reject) {
  contract.deployed().then((poe) => {
    return poe.checkIfExists(assetHash)
  }).then((exists) => {
    const assetExists = exists ? true : false
    resolve(assetExists)
  }).catch((error) => {
    reject(error)
  })
}

function notarizeAsset(ProofOfExContract, assetHash, dispatch) {
  return new Promise((resolve, reject) => {
    notarize(ProofOfExContract, assetHash, resolve, reject)
  })
  .then((returnedAssetHash) => {
    dispatchAssetCreated(returnedAssetHash, dispatch)
  })
}

function notarize(contract, assetHash, resolve, reject) {
  contract.deployed().then((poe) => {
    return poe.notarize(assetHash)
  }).then(result => {
    const assetHash = (result !== null) ? result : null
    resolve(assetHash)
  }).catch((error) => {
    reject(error)
  })
}

function dispatchAlreadyExists(dispatch) {
  dispatch((() => {
    return {
      type          : constants.CREATE_ASSET_HASH,
      alreadyExists : true
    }
  })())
}

function dispatchAssetCreated(assetHash, dispatch) {
  dispatch((() => {
    return {
      type          : constants.CREATE_ASSET_HASH,
      alreadyExists : false,
      assetHash     : assetHash
    }
  })())
}
