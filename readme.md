## Lightweight, headless CMS fromework for NodeJS

## Quick Start

Installation -> `npm install @bared/core`

File Structure, see demoApp folder as an example, we only support mysql for now, databases supported by knex should be supported in the future
```
/src
  index.js
  /database
    config.js
  /apis
    /page
      page.router.js
      page.schema.js
      controller.js


# index.js
require('dotenv').config()
const Bared = require('@bared/core')

Bared.start()
```

## Admin Panel

You can go to public admin panel site here: https://cms.baredigit.com or build your own admin panel.

Clone Admin panel here: https://github.com/baredigit/bared-admin
```
cd bared-admin

npm install // or yarn
npm start // or yarn
```

API endpoint is set when you login, for example -> `http://localhost:8080`

## Progress

Inspired by strapi (https://strapi.io/) but want to be more lightweighted and mobile friendly, developer friendly.

- [x] Connect mysql database
- [x] Use knex to dynamicly create databases / tables
- [x] Better folder structure
- [x] Services, routes for DAPI (developer api, CRUD operations)
- [x] Basic auth process
- [x] Register routes for application developers
- [x] Policy management, config application router policy in router config file.
- [x] Basic developer dashboard frontend (WIP)
- [x] Basic register process
- [x] Alert column if anything changed in schema file
  * `required` and `default` is editable
  * `type` and `unique` need migration and TBD
- [x] Error logging in database
- [ ] Plugin system
  * [x] Defined basic layout of plugin files and exports
  * [ ] Write email plugin and register from main library
  * [ ] Research to see if there are good ways to add custom plugin page in admin panel
- [ ] Joins / Relation fields
- [ ] 3rd party auth (wechat)
- [ ] Expose config outside (CORS or some other configs)
- [ ] Basic server security check

## Global bared object

* bared.services - basic query services
  * `bared.services.get('post', { id: 1 })` Get post for ID = 1
  * `bared.services.getList('post', { _sort: 'created_at:desc' })` Get list with query, _limit, _start, _sort
  * `bared.services.getList('user', { age~gt: 17 })` Get user where age > 17

* bared.knex - knex instance
* bared.app - koa app instance

## API category:

`/api` for enduser, public API, all users can access

`/papi` for enduser, private API, need to login (with authorization header "Bearer xxxxx")

`/dapi` for developer, general CURD operations

## DAPI (Developer API endpoint):

Exposed by library out of box, need authorization and user auth_type=developer

`GET - /dapi/{content-type}/1` get content where id=1

`GET - /dapi/{content-type}` get list of content
  * `/dapi/user?_limit=2&_start=2` set limit and start
  * `/dapi/user?_sort=age:desc` sort
  * `/dapi/user?age~eq=21` select user age=21
  * `/dapi/user?age~gt=21` select user age>21, gte for >=
  * `/dapi/user?age~lt=21` select user age<21, lte for <=
  * `/dapi/user?id~in=[1,2,3]` select user id in [1,2,3], nin for not in
  * `/dapi/user?_q=username:test` search users with column username contains `test`

`GET - /dapi/{content-type}/count` count table, query same as get list

`POST - /dapi/{content-type}` create a new content item

`DELETE - /dapi/{content-type}/1` delete content where id=1

`PUT - /dapi/{content-type}/1` update data for content where id=1

`GET - /dapi/routes/{content-type}` get routes config for post, to generate API document for developer in dev dashboard

`GET - /dapi/schema/all` get routes config for post, to generate API document for developer in dev dashboard
