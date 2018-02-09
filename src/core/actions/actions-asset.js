import constants        from 'core/types'
import contract         from 'truffle-contract'
import ProofOfExistence from 'contracts/ProofOfExistence.json'

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
  return (dispatch, getState) => {
    const { stagedAsset } = getState().asset
    const { web3Provider } = getState().provider
    const ProofOfExContract = contract(ProofOfExistence);

    /* get string representation of image */
    /* check if the image exists  */

    ProofOfExContract.setProvider(web3Provider.currentProvider);

    ProofOfExContract.deployed().then((contractInstance) => {
      // causeListContractAddress = causeListInstance.address;
      // return causeListInstance.existsCause(causeAddress, {from: accounts[0]})
      debugger

    }).then((result) => {

    })

    setTimeout(()=> {
      dispatch((() => {
        return {
          type: constants.CREATE_ASSET_HASH,
          hash: 'e5sb536c0307bbs22sd423334545345ee'
        }
      })())
    }, 15000)
  }
}
