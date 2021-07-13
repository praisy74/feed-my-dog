var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj,h,r,s,m1,h1,s1,m3,s3,lastfed1;

//create feed and lastFed variable here
var feed ,lastfed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("FEED THE DOG ")
  feed.position(650,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
h=hour()
m=minute()
s=second()
  //writ to read fedtime value from the database 
  var geth=database.ref("Food_time")
  geth.on("value",function(data){
    hlastfeed=data.val()
    lastfed1=hlastfeed
  })
  var getm=database.ref("m2")
  getm.on("value",function(data){
    mlastfeed=data.val()
    m3=mlastfeed
  })
  var gets=database.ref("s2")
  gets.on("value",function(data){
    slastfeed=data.val()
    s3=slastfeed
  })
 
  //write code to display text lastFed time here

  drawSprites();
  
  text("hi",500,100)
 textSize(25)
 fill("yellow")
 stroke(0)
 strokeWeight(3)

  if(lastfed1<12){
    text("Last fed :"+lastfed1+":"+m3+":"+s3+"  PM",720,350)
   // text(`Lastfed:${lastfed1}:${m3}:${s3} PM`,150,150)
  }
 else if(lastfed1==0){
    text("Last fed :12:"+m3+":"+s3+"  AM",720,350)
   // text(`Last fed :12:${m3}:${s3} AM`,350,500)
  }
  if(lastfed1>12){
    text("Last fed :"+lastfed1+":"+m3+":"+s3+"  PM",720,350)
   // text(`Lastfed:${lastfed1}:${m3}:${s3} PM`,158,150)
  }
 console.log(`Lastfed:${lastfed}:${m1}:${s1} PM`,150,150)
// at=[h,":",m,":",s]
// console.log(lastfed)
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  lastfed=h
  m1=m
  s1=s

  //write code here to update food stock and last fed time
  foodS=foodS-1;
  database.ref('/').update({
    Food:foodS
  })
  database.ref('/').update({
    Food_time:lastfed,
    m2:m1,
    s2:s1
  })
  console.log(lastfed)
  
 
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
