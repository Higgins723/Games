'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('games', {
      url: '/games',
      template: '<games></games>'
    });
}
