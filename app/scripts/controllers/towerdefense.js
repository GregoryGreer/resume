'use strict';

/*jslint node: true */
/*jshint strict:false */
/**
 * @ngdoc function
 * @name resumeApp.controller:TowerdefenseCtrl
 * @description
 * # TowerdefenseCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('TowerdefenseCtrl', ['$scope', '$interval', '$location', '$document', 'canvastower', 'equip', 'links',
      function ($scope, $interval, $location, $document, canvastower, equip, links) {
          $document[0].title = 'Simple broken trivial tower defense game.';
          var save, soldier, mySoldiers;

          $scope.selectlink = links.links[links.indexFromView('Tower')];
          $scope.links = links.links;
          $scope.go = function(link) {
              if (link.view !== 'Tower') {
                  links.go(link);
              }
          };

          canvastower.init();

          $scope.tlinks = [
              {'view':'Fight', 'link':'/'},
              {'view':'Generate', 'link':'/generate'},
              {'view':'Equip', 'link':'/equip'},
              {'view':'About', 'link':'/about'} ];

          $scope.tselectlink = $scope.tlinks[0];
          $scope.tgo = function(link) {
              if (link.view !== 'Fight') {
                  $location.path( link.link );
              }
          };

          $scope.selectequip = equip.getEquipment();
          $scope.selectpriority = equip.getGenerator();

          $scope.turn = function() {

              save = $scope.fight;

              canvastower.updateBattlefield(
                  equip.generateSoldier($scope.selectpriority, $scope.selectequip),
                  equip.generateSoldier(
                      { 'score':'Balanced',
                          'str': {'dice': 2, 'type': 6, 'plus': 6},
                          'dex': {'dice': 2, 'type': 6, 'plus': 6},
                          'con': {'dice': 2, 'type': 6, 'plus': 6}
                      },
                      {'type':'Balanced',
                          'weapontypeodds': [1, 2, 2, 2, 1],
                          'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
                      }
                  )
              );

              $scope.fight = canvastower.getFight();

              if (($scope.fight === null) || ($scope.fight.length === 0)) {
                  $scope.fight = save;
              }

              $scope.showSoldiers();

              canvastower.showGraphic(canvastower.getBattlefield, canvastower.getCtx());
          };

          $scope.getSoldiers = function(whichType) {
              for (soldier in canvastower.getBattlefield) {
                  soldier = canvastower.getBattlefield[soldier];
                  if (soldier !== null) {
                      if (soldier.mine === whichType) {
                          mySoldiers.push(soldier);
                      }
                  }
              }
              return mySoldiers;
          };

          $scope.getMine = function() {
              return $scope.getSoldiers('true');
          };

          $scope.getTheirs = function() {
              return $scope.getSoldiers('false');
          };

          $scope.showSoldiers = function() {
              $scope.mySoldiers = $scope.getMine();
              $scope.theirSoldiers = $scope.getTheirs();
          };

          $scope.updatePromise = $interval(
              function() {
                  console.log('Update');
                  canvastower.updateBattlefield( null, null );
                  if (canvastower.fight !== undefined) {
                      if (canvastower.fight.length > 0) {$scope.fight = canvastower.fight;}
                  }

                  canvastower.showGraphic(canvastower.getBattlefield, canvastower.getCtx());
              }, 1000);

          canvastower.showGraphic(canvastower.getBattlefield(), canvastower.getCtx());
  }]);
