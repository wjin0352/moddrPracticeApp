var globManuScope;
var allCars={};
var example = [];




didFuckYeah = false;
function fuckyeah(){
  $('.carImg').off('click');


  $('.carImg').on('click', function(){
    $('.activeVids').remove();
    console.log('ss')
    title= $(this).attr('title');
    var startStr= "";
 

   if( $(this).attr('videos') !='' && $(this).attr('videos') !=null   ){
    videos = $(this).attr('videos');
    allVids = videos.split(',');


    for(i in allVids){

      startStr+='<br><iframe width="100%" height="315" src="http://www.youtube.com/embed/'+allVids[i]+'" frameborder="0" allowfullscreen></iframe><br>';
    }

  } 

  else{
    startStr="There are currently no videos available for this model";
    console.log("this had errror on vid click... no vids");
  }

  r= $('<div />').addClass('activeVids').css({'width':'100%', 'height':'auto', 'background-color':'white'}).html(startStr);
    $(this).append(r);

  })
}
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


  $scope.getVids= function(carTitle){

   console.log(carTitle);
  }

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };
  //on clickevent for maker, shows model list in new window
  $scope.showModelInfo = function() {

    $scope.taskModal.show();
  };

  $scope.showCarVids = function(car) {

   //console.log(carTitle)
   console.log("hey!");
    //$scope.taskModal.show();

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
      var projectString = '[{"title":"Moddr","tasks":[]}]';
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

  //Firebase setup

  var rootRef = new Firebase('https://moddr.firebaseio.com/');
  var makersRef = rootRef.child('makers');
  var videosRef = rootRef.child('videos');

var audiRef = makersRef.child('Audi');
var bmwRef = makersRef.child('BMW');
var volvoRef = makersRef.child('Volvo');

// javascript object we want to upload
  var audiArray = [
    {title: 'model 1', photo: 'blah.png',url: 'http://audi.com'},
    {title: 'model 2', photo: 'blah2.png',url: 'http://audi.com'},
    {title: 'model 3', photo: 'blah3.png',url: 'http://audi.com'},
    {title: 'model 4', photo: 'blah4.png', url: 'http://audi.com'},

  ];

  var audiVidArray = [
    {url: "http://audi.com"}
  ];

  var bmwArray = [
    {title: 'model 1', photo: 'blah.png'}
  ];

  //makersRef.remove();
  //videosRef.remove();

//loop through each obj in the array and push it to firebase ref
// remember to change 'audiArray' and 'audiRef'
/**
audiArray.forEach(function(entry) {
  
    console.log("title: " + entry['title'] + " and photos: " + entry['photo']);
    audiRef.push().set({
      title: entry['title'],
      photo: entry['photo'],
      url: entry['url']
    });

})
 **/
// videosArray.forEach(function(entry) {
  
//     console.log("title: " + entry['title'] + " and photos: " + entry['photo']+ entry['url']);
//     videosRef.push().set({
//       title: entry['title'],
//       photo: entry['photo'],
//       url: entry['url']
//     });

// })


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

    setTimeout(function(){fuckyeah();}, 500)
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

var rootRef = new Firebase('https://moddr.firebaseio.com/');
  var makersRef = rootRef.child('makers');
  var videosRef = rootRef.child('videos');

var audiRef = makersRef.child('Audi');
var bmwRef = makersRef.child('BMW');

$scope.audi = {};
$scope.audi.title = "";

rootRef.on('value', function(snapshot){
  var data = snapshot.val();
  allCars = data;
  console.log("data: " + Object.keys(data));
  //var eachModel = Object.keys(data);

  for (var key in data) {
    var obj = data[key]; //child of data

obj.forEach(function(entry) {

  $scope.audi.title = entry.title;
  $scope.audi.year = (entry.year || "n/a");
  $scope.audi.image = entry.image;

  //console.log("audi title: " + $scope.audi.year);
});
  
};  

  });
    
  


 // allCars = 
 //          {
 //            carModelsAcura:
 //                [{title:'RSX', image:'/img/acurarsx.jpg', year:'2000-2014'}],

 //            carModelsAudi:
 //                [{title:'A3', image:'/img/audia3.png', year:'2003-2014'},{title:'S3', image:'/img/audis3.gif'},{title:'TT', image:'/img/auditt.gif'},  ],

 //            carModelsBMW:
 //                [{title:'BMW 3 series', image:'/img/bmw3.gif'}, {title:'BMW 1 series', image:'/img/bmw1.jpg'}, {title:'BMW M3', image:'/img/bmwm3.gif'}, {title:'BMW 5 series', image:'/img/bmw5.jpg'}],

 //            carModelsCadillac:
 //                [{title:'CTS', image:'/img/cadillaccts.jpg'}],

 //            carModelsChevrolet:
 //                [{title:'Cobalt', image:'/img/cobalt.jpg'},{title:'Camero', image:'/img/camaro.jpg'} ],

 //            carModelsDodge:
 //                [{title:'Challenger', image:'/img/challenger.gif'},{title:'Charger', image:'/img/charger.gif'}],

 //            carModelsFord:
 //                [{title:'Focus', image:'/img/focus.gif'}],

 //            carModelsHonda:
 //                [{title:'Civic', image:'/img/civic.jpg'}],

 //            carModelsInfiniti:
 //                [{title:'G35', image:'/img/g35.jpg'},{title:'G37', image:'/img/g35.gif'}],

 //            carModelsJeep:
 //                [{title:'Liberty', image:'/img/wrangler.jpg'}],

 //            carModelsLexus:
 //                [{title:'IS300', image:'/img/is300.jpg'}, {title:'LS300', image:'/img/ls300.jpg'}],

 //            carModelsMercedesBenz:
 //                [{title:'C Class', image:'/img/cclass.jpg'},{title:'E Class', image:'/img/eclass.jpg'}],

 //            carModelsMitsubishi:
 //                [{title:'Lancer Evolution', image:'/img/lancer.jpg'}],

 //            carModelsNissan:
 //                [{title:'350z', image:'/img/350z.gif'},{title:'370z', image:'/img/370z.jpg'}],

 //            carModelsPorsche:
 //                [{title:'911 Turbo', image:'/img/911turbo.gif'},{title:'911 Turbo', image:'/img/carerra.jpg'}],

 //            carModelsSubaru:
 //                [{title:'WRX', image:'/img/wrx.jpg'},{title:'WRX STI', image:'/img/sti.jpg'}, {title:'Forester', image:'/img/forester.jpg'}],

 //            carModelsVolkswagon:
 //                [{title:'GOLF', image:'/img/golf.jpg'}],

 //            carModelsVolvo:
 //                [{title:'S40', image:'/img/s40.jpg'}],
 //          };



$scope.carModelsBmw = allCars.carModelsBMW;
$scope.carModelsAcura = allCars.carModelsAcura;
$scope.carModelsAudi = allCars.carModelsAudi;


});









