// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// interface
import {IDiamond, Diamond} from "contracts/src/diamond/Diamond.sol";

// libraries

// contracts
import {DiamondHelper} from "contracts/test/diamond/Diamond.t.sol";
import {Deployer} from "contracts/scripts/common/Deployer.s.sol";

// helpers
import {DeployOwnable} from "contracts/scripts/deployments/facets/DeployOwnable.s.sol";
import {DeployDiamondCut} from "contracts/scripts/deployments/facets/DeployDiamondCut.s.sol";
import {DeployDiamondLoupe} from "contracts/scripts/deployments/facets/DeployDiamondLoupe.s.sol";
import {DeployIntrospection} from "contracts/scripts/deployments/facets/DeployIntrospection.s.sol";
import {DeployMetadata} from "contracts/scripts/deployments/facets/DeployMetadata.s.sol";
import {DeploySpaceOwnerFacet} from "contracts/scripts/deployments/facets/DeploySpaceOwnerFacet.s.sol";
import {DeployGuardianFacet} from "contracts/scripts/deployments/facets/DeployGuardianFacet.s.sol";
import {DeployMultiInit, MultiInit} from "contracts/scripts/deployments/utils/DeployMultiInit.s.sol";

contract DeploySpaceOwner is DiamondHelper, Deployer {
  DeployDiamondCut diamondCutHelper = new DeployDiamondCut();
  DeployDiamondLoupe diamondLoupeHelper = new DeployDiamondLoupe();
  DeployOwnable ownableHelper = new DeployOwnable();
  DeployIntrospection introspectionHelper = new DeployIntrospection();
  DeploySpaceOwnerFacet spaceOwnerHelper = new DeploySpaceOwnerFacet();
  DeployMetadata metadataHelper = new DeployMetadata();
  DeployGuardianFacet guardianHelper = new DeployGuardianFacet();
  DeployMultiInit multiInitHelper = new DeployMultiInit();

  address multiInit;
  address diamondCut;
  address diamondLoupe;
  address introspection;
  address ownable;

  address metadata;
  address spaceOwner;
  address guardian;

  function versionName() public pure override returns (string memory) {
    return "spaceOwner";
  }

  function addImmutableCuts(address deployer) internal {
    multiInit = multiInitHelper.deploy(deployer);

    diamondCut = diamondCutHelper.deploy(deployer);
    diamondLoupe = diamondLoupeHelper.deploy(deployer);
    introspection = introspectionHelper.deploy(deployer);
    ownable = ownableHelper.deploy(deployer);

    addFacet(
      diamondCutHelper.makeCut(diamondCut, IDiamond.FacetCutAction.Add),
      diamondCut,
      diamondCutHelper.makeInitData("")
    );
    addFacet(
      diamondLoupeHelper.makeCut(diamondLoupe, IDiamond.FacetCutAction.Add),
      diamondLoupe,
      diamondLoupeHelper.makeInitData("")
    );
    addFacet(
      introspectionHelper.makeCut(introspection, IDiamond.FacetCutAction.Add),
      introspection,
      introspectionHelper.makeInitData("")
    );
    addFacet(
      ownableHelper.makeCut(ownable, IDiamond.FacetCutAction.Add),
      ownable,
      ownableHelper.makeInitData(deployer)
    );
  }

  function diamondInitParams(
    address deployer
  ) public returns (Diamond.InitParams memory) {
    metadata = metadataHelper.deploy(deployer);
    spaceOwner = spaceOwnerHelper.deploy(deployer);
    guardian = guardianHelper.deploy(deployer);

    addFacet(
      spaceOwnerHelper.makeCut(spaceOwner, IDiamond.FacetCutAction.Add),
      spaceOwner,
      spaceOwnerHelper.makeInitData("Space Owner", "OWNER", "1")
    );

    addFacet(
      guardianHelper.makeCut(guardian, IDiamond.FacetCutAction.Add),
      guardian,
      guardianHelper.makeInitData(7 days)
    );

    addFacet(
      metadataHelper.makeCut(metadata, IDiamond.FacetCutAction.Add),
      metadata,
      metadataHelper.makeInitData(bytes32("Space Owner"), "")
    );

    return
      Diamond.InitParams({
        baseFacets: baseFacets(),
        init: multiInit,
        initData: abi.encodeWithSelector(
          MultiInit.multiInit.selector,
          _initAddresses,
          _initDatas
        )
      });
  }

  function __deploy(address deployer) public override returns (address) {
    addImmutableCuts(deployer);

    Diamond.InitParams memory initDiamondCut = diamondInitParams(deployer);

    vm.broadcast(deployer);
    Diamond diamond = new Diamond(initDiamondCut);

    return address(diamond);
  }
}