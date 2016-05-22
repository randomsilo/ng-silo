angular.module('NgSilo', [])
  .factory('TableFactory'
    , ['filterFilter', 'orderByFilter'
    , function( filterFilter, orderByFilter) {
    var factory = this;

    // Empty Constructor
    var Table = function () {
      var instance = this;

      instance.loading = false;
      instance.searchFilter = {};
      instance.data = [];
      instance.rows = [];
      instance.totalItems = instance.rows.length;
      instance.numPerPage = 5;
      instance.sortColumn = 'name';
      instance.reverse = false;
      instance.currentPage = 1;


      // Callable Methods
      instance.update = function( sortColumn) {
        instance.applyFilter();

        if( sortColumn) {
          instance.reverse = (instance.sortColumn === sortColumn) ? !instance.reverse : false;
          instance.sortColumn = sortColumn;
        }

        instance.applyOrder();
        instance.applyPage();
      };

      instance.paginate = function( value) {
        var begin, end, index;
        begin = (instance.currentPage - 1) * instance.numPerPage;
        end = begin + instance.numPerPage;

        index = 0;
        if( instance.rows) {
          index = instance.rows.indexOf(value);
        }

        return (begin <= index && index < end);
      };

      instance.load = function( promiseOrData, rowsPerPage, defaultSortColumn) {
        instance.loadingTable = true;

        promise.resolve( promiseOrData).then(function(response) {
          instance.numPerPage = rowsPerPage || instance.numPerPage;
          instance.sortColumn = defaultSortColumn || instance.sortColumn;
          instance.changeData(response);
          instance.loadingTable = false;
        });
      };


      // Internal methods
      instance.changeData = function( data) {
        instance.data = data || [];
        instance.update();
      };

      instance.applyFilter = function() {
        instance.rows = filterFilter( instance.data, instance.searchFilter);
      };

      instance.applyOrder = function() {
        instance.rows = orderByFilter(instance.rows, instance.sortColumn, instance.reverse);
      };

      instance.applyPage = function() {
        instance.totalItems = instance.rows.length;

        var totalPages = instance.rows.length / instance.numPerPage;
        if( instance.currentPage <= totalPages + 1) {
          instance.currentPage = instance.currentPage;
        } else {
          instance.currentPage = 1;
        }

      };


      return instance;
    };


    // Expose Table Factory
    factory.getInstance = function() {
      return new Table();
    };

    return factory;
  }]);
