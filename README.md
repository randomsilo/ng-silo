# ng-silo
Angular Reusable Code

## Table Factory
The TableFactory is awesome because it encapsulates all the table methods into an instance.  Multiple instances can be within a controller without causing issues.  The best part is the filtering, sorting, and paging work across the entire dataset.  Most angular table examples simply sort or filter the data you can see.  NgSilo's TableFactory can filter and sort across the entire dataset without a page reload.

Person table example from a recent sails application.
The pieces should be clear enough to use with any stack.
To use the table factory takes four things:
1. Include the NgSilo module in your application
2. Define the table instance within your controller
3. Load the table instance with data
4. Write the table html to use the table instance methods.


### TableFactory - Include NgSilo
File: assets/js/app.js

```javscript
var app = angular.module('App', ['ngRoute', 'ui.bootstrap', 'NgSilo']);
```

### TableFactory - Controller
File: assets/js/controller/NameGeneratorCtrl.js

```javscript
app.controller('NameGeneratorCtrl'
  , ['$scope', '$rootScope', 'TableFactory', 'NameGeneratorService'
  , function($scope, $rootScope, TableFactory, NameGeneratorService) {
    var ctrl = this;

    // Form
    ctrl.formData = {};

    // Table
    ctrl.peopleTable = TableFactory.getInstance();
    ctrl.peopleTable.load( NameGeneratorService.getRandomNames(), 10, 'name');

}]);
```

#### TableFactory - Service
File: assets/js/service/NameGeneratorService.js

```javscript
app.service('NameGeneratorService', function($q, $http) {
  var service = this;

  service.getRandomNames = function() {
      var defer = $q.defer();
      $http.post('/randomnames/fetch').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    };

});
```

### TableFactory - HTML
File: assets/templates/name-generator/table.html

```
<div ng-class="{'whirl ringed': ctrl.peopleTable.loadingTable}">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>
          <a href="" ng-click="ctrl.peopleTable.update('last_name')">
            Last Name
            <span
              class="glyphicon sort-icon"
              ng-show="ctrl.peopleTable.sortColumn=='last_name'"
              ng-class="{'glyphicon-chevron-up': !ctrl.peopleTable.reverse,'glyphicon-chevron-down': ctrl.peopleTable.reverse}">
            </span>
          </a>
        </th>
        <th>
          <a href="" ng-click="ctrl.peopleTable.update('first_name')">
            First Name
            <span
              class="glyphicon sort-icon"
              ng-show="ctrl.peopleTable.sortColumn=='first_name'"
              ng-class="{'glyphicon-chevron-up': !ctrl.peopleTable.reverse,'glyphicon-chevron-down': ctrl.peopleTable.reverse}">
            </span>
          </a>
        </th>
        <th>
          <a href="" ng-click="ctrl.peopleTable.update('gender')">
            Gender
            <span
              class="glyphicon sort-icon"
              ng-show="ctrl.peopleTable.sortColumn=='gender'"
              ng-class="{'glyphicon-chevron-up': !ctrl.peopleTable.reverse,'glyphicon-chevron-down': ctrl.peopleTable.reverse}">
            </span>
          </a>
        </th>
        <th>
          <a href="" ng-click="ctrl.peopleTable.update('age')">
            Age
            <span
              class="glyphicon sort-icon"
              ng-show="ctrl.peopleTable.sortColumn=='age'"
              ng-class="{'glyphicon-chevron-up': !ctrl.peopleTable.reverse,'glyphicon-chevron-down': ctrl.peopleTable.reverse}">
            </span>
          </a>
        </th>
        <th>
          <a href="" ng-click="ctrl.peopleTable.update('profession')">
            Profession
            <span
              class="glyphicon sort-icon"
              ng-show="ctrl.peopleTable.sortColumn=='profession'"
              ng-class="{'glyphicon-chevron-up': !ctrl.peopleTable.reverse,'glyphicon-chevron-down': ctrl.peopleTable.reverse}">
            </span>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="text" ng-model="ctrl.peopleTable.searchFilter.last_name" ng-change="ctrl.peopleTable.update()"/></td>
        <td><input type="text" ng-model="ctrl.peopleTable.searchFilter.first_name" ng-change="ctrl.peopleTable.update()"/></td>
        <td><input type="text" ng-model="ctrl.peopleTable.searchFilter.gender" ng-change="ctrl.peopleTable.update()"/></td>
        <td><input type="text" ng-model="ctrl.peopleTable.searchFilter.age" ng-change="ctrl.peopleTable.update()"/></td>
        <td><input type="text" ng-model="ctrl.peopleTable.searchFilter.profession" ng-change="ctrl.peopleTable.update()"/></td>
     </tr>
      <tr ng-repeat="row in ctrl.peopleTable.rows | filter: ctrl.peopleTable.paginate" ng-class-odd="'odd'">
        <td>{{ row.last_name }}</td>
        <td>{{ row.first_name }}</td>
        <td>{{ row.gender }}</td>
        <td>{{ row.age | number}}</td>
        <td>{{ row.profession }}</td>
      </tr>
    </tbody>
  </table>
  <pagination
    total-items="ctrl.peopleTable.totalItems"
    ng-model="ctrl.peopleTable.currentPage"
    max-size="10"
    boundary-links="true"
    items-per-page="ctrl.peopleTable.numPerPage"
    class="pagination-sm">
 </pagination>
</div>
```
