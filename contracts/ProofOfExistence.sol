pragma solidity ^0.4.15;

contract ProofOfExistence {
  mapping (bytes32 => bool) private proofs;

  function storeProof(bytes32 proof) {
    proofs[proof] = true;
  }

  function notarize(string assetHash) {
    storeProof(proof);
  }

  function checkIfExists(string assetHash) constant returns (bool) {
    return proofs[proof];
  }

}
