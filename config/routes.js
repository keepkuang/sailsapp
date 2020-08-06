/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'person/create' },
//view
  'GET /person/view/:id': 'PersonController.view',

//delete
  'POST /person/delete/:id': 'PersonController.delete',
// update
  'GET /person/update/:id': 'PersonController.update',
  'POST /person/update/:id': 'PersonController.update',
// login
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

//search
  'GET /search/': 'PersonController.search',
  'GET /person/search/': 'PersonController.search',
  'POST /search/': 'PersonController.search',
  'POST /person/search/': 'PersonController.search',

//information
  'GET /user/information/:uid' : 'UserController.information',

//occupants
  'GET /user/occupants/:id' : 'UserController.occupants',



  // 'GET /person/:id/worksFor': 'PersonController.populate',
  // 'GET /user/:id/supervises': 'UserController.populate',
  // 'POST /user/:id/supervises/add/:fk': 'UserController.add',
  // 'POST /user/:id/supervises/remove/:fk': 'UserController.remove',



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
