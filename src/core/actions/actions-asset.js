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

  /*
    step 1 - get the bytes of the image
    step 2 - pass it to the check() function in the smart contract
          - if the hash already exists, notify the user
          - if the hash DOES NOT already exist, create the hash and notify user
  */

  return (dispatch, getState) => {
    const { stagedAsset } = getState().asset


    /* get string representation of image */
    /* check the contract */




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
