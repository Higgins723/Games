'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './games.routes';

export class GamesComponent {

  favoriteGames = [];
  newGame = [];

  /*@ngInject*/
  constructor($http, $scope) {
    this.$http = $http;
    this.$scope = $scope;
  }

  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.favoriteGames = response.data;
        this.$scope.gamesList = response.data;
        this.$scope.originalGames = response.data;
        this.$scope.filter = 'none';
      });
  }

  addNewGame() {
    if(this.newGame) {
      this.$http.post('/api/games', {
        name: this.newGame.name,
        platform: this.newGame.platform,
        genre: this.newGame.genre
      });
      console.log(this.newGame);
      this.$onInit();
      this.newGame = [];
    }
  }

  deleteGame(game) {
    this.$http.delete(`/api/games/${game._id}`);
    this.$onInit();
  }

  toggleEdit(index) {
    this.$scope.gamesList[index].edit = !this.$scope.gamesList[index].edit;
  }

  saveGame(index) {
    this.$http.put('/api/games/' + this.$scope.gamesList[index]._id, this.$scope.gamesList[index]);
    this.$scope.gamesList[index].edit = false;
    this.$onInit();
  }

  resetGames() {
    this.$scope.gamesList = this.$scope.originalGames;
    this.$scope.filter = 'none';
  }

  filterByGenre(genre) {
    this.resetGames();
    this.$scope.gamesList = this.$scope.gamesList.filter(function(game) {
      return game.genre === genre;
    });
    this.$scope.filter = 'Genre: ' + genre;
  }

  filterByPlatform(platform) {
    this.resetGames();
    this.$scope.gamesList = this.$scope.gamesList.filter(function(game) {
      return game.platform === platform;
    });
    this.$scope.filter = 'Platform: ' + platform;
  }
}

export default angular.module('meanTutorialApp.games', [uiRouter])
  .config(routes)
  .component('games', {
    template: require('./games.html'),
    controller: GamesComponent,
    controllerAs: 'gamesCtrl'
  })
  .name;
