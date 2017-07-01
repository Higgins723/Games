/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Game from '../api/game/game.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Game.find({}).remove()
      .then(() => {
        let game = Game.create({
          name: 'Halo 5',
          platform: 'Xbox One',
          genre: 'Shooter'
        }, {
          name: 'Fallout 4',
          platform: 'PlayStation 4',
          genre: 'Role-Playing'
        }, {
          name: 'Super Smash Bros.',
          platform: 'Wii U',
          genre: 'Fighting'
        }, {
          name: 'Pokemon X',
          platform: '3DS',
          genre: 'Role-Playing'
        }, {
          name: 'Halo 4',
          platform: 'Xbox 360',
          genre: 'Shooter'
        });
        return game;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));
  }
}
