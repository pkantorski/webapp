angular.module("jquery",[]).factory("$",["$window",function(o){return o.$}]);var hackathonApp=angular.module("hackathonApp",["ngRoute","ngAnimate","jquery","ui.bootstrap","ngMap"]);hackathonApp.config(["$routeProvider",function(o){var t=o.when;o.when=function(e,r){return r.resolve=r.resolve||(r.resolve={}),t.call(o,e,r)},o.when("/",{templateUrl:"main",controller:"MainController"}).otherwise({redirectTo:"/"})}]),hackathonApp.controller("GlobalController",["$scope","$rootScope",function(o,t){t.hideFilters=!1,o.showFilters=function(){t.hideFilters=!1,t.rightBar=!1}}]),hackathonApp.controller("HeaderController",["$scope","$rootScope","$http",function(o,t,e){o.cities=[],o.parameters=[],t.marker=[],t.markerDetail=[],o.search={},o.showInfo=!1,t.parametersList=[{param1:"oferty pracy"},{param2:"interpelacje"}],e.get("/cities").then(function(t){o.cities=t.data,o.parameters=t.data.parameters}),o.showResult=function(){if(o.search.city=JSON.parse(o.search.city),t.actualCoords=[o.search.city.lat,o.search.city["long"]],o.search.city){o.showInfo=!1;var r=[];angular.forEach(o.search,function(o,e){if("city"!==e){var a=e.split("param"),n=t.parametersList[a[1]-1];r.push(n)}});var a={city:o.search.city.city,parameter:r};e.get("/markers",a).then(function(o){t.marker=o.data,t.markerDetail=o.data},function(o){console.log(o)}),t.markerDetail&&(t.hideFilters=!0,t.rightBar=!0,t.mapZoom=12)}else o.showInfo=!0}}]),hackathonApp.controller("MainController",["$scope","$rootScope","$","NgMap","$http","$uibModal",function(o,t,e,r,a,n){"geolocation"in navigator?(t.geolocation=!0,navigator.geolocation.getCurrentPosition(function(o){t.actualCoords=[o.coords.latitude,o.coords.longitude]},function(o){console.log(o),t.actualCoords=[52.4064,16.9252]})):t.geolocation=!1,t.mapZoom=12,t.rightBar=!1,o.showBackButton=!1,o.icon={path:"CIRCLE",scale:8,strokeColor:"#F00",fillColor:"#F00"},r.getMap().then(function(o){o.getCenter()}),o.showDescription=function(e,r){t.markerDetail=[t.marker[r]],t.markerDetail&&(t.actualCoords=[t.markerDetail[0].lat,t.markerDetail[0].lng],t.mapZoom=16,t.rightBar=!0,o.showBackButton=!0)},o.showDescriptionFromList=function(e,r){t.markerDetail.length>1&&(t.markerDetail=[t.marker[r]],t.markerDetail&&(t.actualCoords=[t.markerDetail[0].lat,t.markerDetail[0].lng],t.mapZoom=16,t.rightBar=!0,o.showBackButton=!0))},o.showAllMarker=function(){o.showBackButton=!1,t.mapZoom=11,t.markerDetail=t.marker,t.geolocation&&navigator.geolocation.getCurrentPosition(function(o){t.actualCoords=[o.coords.latitude,o.coords.longitude]},function(o){console.log(o),t.actualCoords=[52.4064,16.9252]})},o.showModal=function(o){t.modalRedirect=n.open({templateUrl:"modal",controller:"ModalController",size:"lg modal",resolve:{response:function(){return o}}})},e(window).on("load",function(){e(".right-bar").mCustomScrollbar()})}]),hackathonApp.controller("ModalController",["$scope","$rootScope","$uibModal","$uibModalInstance","response","$http",function(o,t,e,r,a,n){o.response=a.oferta,console.log(o.response),o.ok=function(){r.close()},o.cancel=function(){r.dismiss("cancel")},o.close=function(){r.close()},t.modalRedirect.result.then(function(){},function(){})}]),hackathonApp.filter("unsafe",["$sce",function(o){return o.trustAsHtml}]);