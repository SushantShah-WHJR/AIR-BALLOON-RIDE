var balloon,balloonImage1,balloonImage2;
var firebaseConfig = {
  apiKey: "AIzaSyCfWJeC9MAJeNd-8IPvyVFfeWQ93BSeOIM",
  authDomain: "air-balloon-ride-f85d1.firebaseapp.com",
  databaseURL: "https://air-balloon-ride-f85d1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "air-balloon-ride-f85d1",
  storageBucket: "air-balloon-ride-f85d1.appspot.com",
  messagingSenderId: "696677967108",
  appId: "1:696677967108:web:56786f8a046ec284c6dc51",
  measurementId: "G-W43WPN6Z6J"
};

fb = firebase.initializeApp(firebaseConfig);


FireDB = firebase.database();

root = FireDB.ref('BalloonLoc')

balloon_x  = parseInt(root.child('X').get());
balloon_y = parseInt(root.child('Y').get());

root.on('value', (snapshot) => {
    balloon_x  = snapshot.val().X;
    balloon_y = snapshot.val().Y;
    balloon.x = balloon_x;
    balloon.y = balloon_y;
});

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);

  balloon=createSprite(250,450,balloon_x,balloon_y);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
	  root.child('X').set(balloon_x  - 1)
  }
  else if(keyDown(RIGHT_ARROW)){
	  root.child('X').set(balloon_x + 1)
  }
  if(keyDown(UP_ARROW)){
	  root.child('Y').set(balloon_y - 1)
  }
  else if(keyDown(DOWN_ARROW)){
	  root.child('Y').set(balloon_y + 1)
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

firebase.database().ref('balloon/height').on('value', (snapshot) => {
	const data = snapshot.val();
	console.log(data.x)
	balloon.x = data.x
	balloon.y = data.y
});