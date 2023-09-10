function getAngle(x1,y1,x2,y2) {
    var angle = Math.atan2(y1-y2,x1-x2);
    var xangle = Math.cos(angle);
    var yangle = Math.sin(angle);
    return {x:xangle, y:yangle}
}
function randomArray(arr) {
  var rand = Math.floor(Math.random()*arr.length);
  return arr[rand];
}
function randomArraySplice(arr){
  var rand = Math.floor(Math.random()*arr.length);
  return arr.splice(rand, 1);
}
function randomObject(obj){
  var arr = [];
  for(item in obj){arr.push(item);}
  return randomArray(arr);
}
function objToArray(obj) {
  var arr = [];
  for(item in obj){arr.push(item);}
  return arr;
}
function randInt(minInclusive, maxExclusive) {
var num = Math.random();
num*=(maxExclusive-minInclusive);
num = Math.floor(num+minInclusive);
return num;
}
function randweighted(nums) {
  var standings=Object.keys(nums);
  var total=1;
  standings.forEach((item, i) => {
    total+=nums[item];
  });
  var random=randInt(0, total);
  var ret="";
  standings.forEach((item, i) => {
    random -=(nums[item]);
    if(random<=0 && ret==""){ret=item};
  })
  return ret;

}
