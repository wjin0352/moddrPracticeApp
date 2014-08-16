var globManuScope;
var allCars={};
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



angular.module('todo', ['ionic'])

.controller('TodoCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.tasks = [];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {

    alert($scope.brandName)
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();
    task.title = "";
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };
  //on clickevent for maker, shows model list in new window
  $scope.showModelInfo = function() {

    $scope.taskModal.show();
  };

  $scope.showMakerTitle = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
});

angular.module('todo', ['ionic'])
/*
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})






.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;


  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  //on clickevent for maker, shows model list in new window
  $scope.showModelInfo = function(type) {

    theCars = allCars['carModels'+type];


    globManuScope.currentCar = theCars;
    console.log(globManuScope.currentCar)
   $scope.brandName= type;
    $scope.taskModal.show();
  };

  $scope.showMakerTitle = function(type) {
    $scope.brandModel= type;
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };



  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  })


globManuScope = $scope;
 allCars = 
          {
            carModelsAcura:
                [{title:'Acura', image:'/img/BMWGIF.gif'}, {title:'TSX', image:'/'}],

            carModelsAudi:
                [{title:'A3', image:'/img/BMWGIF.gif'}],

            carModelsBMW:
                [{title:'BMW 3 series', image:'/img/BMWGIF.gif'}],

            carModelsCadillac:
                [{title:'CTS', image:'/img/BMWGIF.gif'}],

            carModelsChevrolet:
                [{title:'Cobalt', image:'/img/BMWGIF.gif'}],

            carModelsDodge:
                [{title:'Challenger', image:'/img/BMWGIF.gif'},{title:'Charger', image:'/img/BMWGIF.gif'}],

            carModelsFord:
                [{title:'Focus', image:'/img/BMWGIF.gif'}],

            carModelsHonda:
                [{title:'Civic', image:'/img/BMWGIF.gif'}],

            carModelsInfiniti:
                [{title:'G35', image:'/img/BMWGIF.gif'}],

            carModelsJeep:
                [{title:'Liberty', image:'/img/BMWGIF.gif'}],

            carModelsLexus:
                [{title:'IS300', image:'/img/BMWGIF.gif'}],

            carModelsMercedesBenz:
                [{title:'C Class', image:'/img/BMWGIF.gif'},{title:'E Class', image:'/img/BMWGIF.gif'}],

            carModelsMitsubishi:
                [{title:'Lancer Evolution', image:'/img/BMWGIF.gif'}],

            carModelsNissan:
                [{title:'350z', image:'/img/BMWGIF.gif'},{title:'370z', image:'/img/BMWGIF.gif'}],

            carModelsPorsche:
                [{title:'911 Turbo', image:'/img/BMWGIF.gif'}],

            carModelsSubaru:
                [{title:'WRX', image:'/img/BMWGIF.gif'},{title:'WRX STI', image:'/img/BMWGIF.gif'}, {title:'Forester', image:'/img/BMWGIF.gif'}],

            carModelsVolkswagon:
                [{title:'GTI', image:'/img/BMWGIF.gif'}],

            carModelsVolvo:
                [{title:'S60', image:'/img/BMWGIF.gif'}],
          };



$scope.carModelsBmw = allCars.carModelsBMW;
$scope.carModelsAcura = allCars.carModelsAcura;
$scope.carModelsAudi = allCars.carModelsAudi;


});









