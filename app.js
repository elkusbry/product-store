(function() {
  
  var app = angular.module("sampleApp", ["firebase"]);

  app.controller("MyCtrl", ["$scope", "$firebase",
    function($scope, $firebase) {
      var ref = new Firebase('https://elkusbry-01.firebaseio.com/products');
      var sync = $firebase(ref);

      // if ref points to a data collection
      $scope.productList = sync.$asArray();
    
      var productList = sync.$asArray();
          productList.$loaded().then(function() {
            console.log("productList has " + productList.length + " item(s)");
          });

          // we can add it directly to $scope if we want to access this from the DOM
          $scope.productList = productList;
        
        
          $scope.addProduct = function() {
            if ($scope.product.name) {
              $scope.productList.$add({
                type: this.product.type,
                brand: this.product.brand,
                name: this.product.name,
                price: this.product.price,
                year: this.product.year,
                stock: this.product.stock,
                description: this.product.description,
                specs: {color: this.product.spec.color,
                createdOn: Date.now()
                }
              })
              $scope.product.name = '';
              $('#myModal').modal('toggle');
            }
          };
          $scope.predicate = '-type';
          
          
    }
  ]);



 app.controller("StoreController", ["$scope", "$firebase",
    function($scope, $firebase) {
     // this.products = gems;
   
     var rootRef = new Firebase('https://elkusbry-01.firebaseio.com/products/');
     // rootRef.child('products');
   
     var sync = $firebase(rootRef);

     var list = sync.$asArray();
     list.$loaded().then(function() {
       console.log("list has " + list.length + " item(s)");
     });

     // we can add it directly to $scope if we want to access this from the DOM
     $scope.list = list;

     
     
  }
]);

app.controller("ReviewController", ["$scope", "$firebase",
  function($scope, $firebase) {
    
    var newReview = {};

    $scope.addProductReview = function(product){
      
      var rootRef = new Firebase('https://elkusbry-01.firebaseio.com/products/' + '/' + product.$id + "/reviews");

      var sync = $firebase(rootRef);

      var reviewList = sync.$asArray();
      // reviewList.$loaded().then(function() {
    //     console.log("list has " + reviewList.length + " item(s)");
    //    });

      // we can add it directly to $scope if we want to access this from the DOM
      $scope.reviewList = reviewList;
      
      newReview = {
            stars:this.newReview.stars,
            author:this.newReview.author,
            description:this.newReview.description,
            createdOn: Date.now()
          };
      $scope.reviewList.$add(newReview);
      
      this.newReview = {};

      console.log(newReview);
    };
  }
]);


  app.controller("TabController", function(){
    this.tab = 3;
    
    this.setTab = function(newTab){
      this.tab = newTab;
    };
    
    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });


var gems = [{
      name: 'Azurite',
      description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
      shine: 8,
      price: 110.50,
      rarity: 7,
      color: '#CCC',
      faces: 14,
      images: [
        "images/gem-02.gif",
        "images/gem-05.gif",
        "images/gem-09.gif"
      ],
      reviews: [{
        stars: 5,
        body: "I love this gem!",
        author: "joe@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "This gem sucks.",
        author: "tim@example.org",
        createdOn: 1397490980837
      }]
    }, {
      name: 'Bloodstone',
      description: "Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides, however.",
      shine: 9,
      price: 22.90,
      rarity: 6,
      color: '#EEE',
      faces: 12,
      images: [
        "images/gem-01.gif",
        "images/gem-03.gif",
        "images/gem-04.gif",
      ],
      reviews: [{
        stars: 3,
        body: "I think this gem was just OK, could honestly use more shine, IMO.",
        author: "JimmyDean@example.org",
        createdOn: 1397490980837
      }, {
        stars: 4,
        body: "Any gem with 12 faces is for me!",
        author: "gemsRock@example.org",
        createdOn: 1397490980837
      }]
    }, {
      name: 'Zircon',
      description: "Zircon is our most coveted and sought after gem. You will pay much to be the proud owner of this gorgeous and high shine gem.",
      shine: 70,
      price: 1100,
      rarity: 2,
      color: '#000',
      faces: 6,
      images: [
        "images/gem-06.gif",
        "images/gem-07.gif",
        "images/gem-08.gif"
      ],
      reviews: [{
        stars: 1,
        body: "This gem is WAY too expensive for its rarity value.",
        author: "turtleguyy@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "BBW: High Shine != High Quality.",
        author: "LouisW407@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "Don't waste your rubles!",
        author: "nat@example.org",
        createdOn: 1397490980837
      }]
    }];
  
})();

