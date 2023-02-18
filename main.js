song1="";
song2="";
scoreleftWrist=0;
scorerightWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1status="";
song2status="";
function preload(){
song1=loadSound("song1.mp3");
song2=loadSound("song2.mp3");
}
function setup(){
canvas=createCanvas(600,600);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotResult);
}
function draw(){
image(video, 0,0,600,600);
fill("red");
stroke("red");
song1status=song1.isPlaying();
if(scoreleftWrist>0.2){
circle(leftWristX, leftWristY, 20);
song2.stop();
if(song1status==false){
song1.play();
document.getElementById("song").innerHTML="song1 is playing";
}
}
if(scorerightWrist>0.2){
circle(rightWristX, rightWristY,20);
song1.stop();
if(song2status==false){
song2.play();
document.getElementById("song").innerHTML="song2 is playing";
}
}
}
function modelLoaded(){
console.log("poseNet is initalized");
}
function gotResult(results){
if(results.length>0){
console.log(results);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
scoreleftWrist=results[0].pose.keypoints[9].score;
scorerightWrist=results[0].pose.keypoints[10].score;
console.log("leftWrist="+leftWristX+"leftWrist="+leftWristY);

}
}