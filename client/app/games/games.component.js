'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './games.routes';

export class GamesComponent {

  favoriteGames = [];
  addNewGame = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.favoriteGames = response.data;
      });
  }

  addGame() {
    if(this.addNewGame) {
      this.$http.post('/api/games', {
        name: this.addNewGame
      });
      this.addNewGame = '';
    }
  }

  deleteGame(game) {
    this.$http.delete(`/api/games/${game._id}`);
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
