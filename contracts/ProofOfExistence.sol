pragma solidity ^0.4.15;

contract ProofOfExistence {
  mapping (bytes32 => bool) private proofs;

  function storeProof(bytes32 proof) {
    proofs[proof] = true;
  }

  function notarize(string asset) {
    var proof = proofFor(asset);
    storeProof(proof);
  }

  function proofFor(string asset) constant returns (bytes32) {
    return sha256(asset);
  }

  function checkIfExists(string asset) constant returns (bool) {
    var proof = proofFor(asset);
    return hasProof(proof);
  }

  function hasProof(bytes32 proof) constant returns(bool) {
    return proofs[proof];
  }
}
