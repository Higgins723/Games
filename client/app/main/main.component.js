import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  awesomeGames = [];
  newGame = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.awesomeGames = response.data;
      });
  }

  addGame() {
    if(this.newGame) {
      this.$http.post('/api/games', {
        name: this.newGame
      });
      this.newGame = '';
    }
  }

  deleteGame(game) {
    this.$http.delete(`/api/games/${game._id}`);
  }
}

export default angular.module('favoriteGamesApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
