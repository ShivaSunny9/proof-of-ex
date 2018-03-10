pragma solidity ^0.4.15;

contract ProofOfExistence {
  mapping (string => bool) private proofs;

  function storeProof(string proof) {
    proofs[proof] = true;
  }

  function notarize(string assetHash) {
    storeProof(assetHash);
  }

  function checkIfRegistered(string assetHash) constant returns (bool) {
    return proofs[assetHash];
  }

}
