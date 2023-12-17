/*
var courses = [
    {
        id: 1,
        coin: 100,
        name: 'Javascript'
    },
    {
        id: 2,
        coin: 200,
        name: 'HTML,CSS'
    },
    {
        id: 3,
        coin: 300,
        name: 'PHP'
    },
    {
        id: 4,
        coin: 400,
        name: 'Ruby'
    }
]


var i=0;

function coinHandler(accumulator, currentValue, currentIndex, originArray){
    i++;
    console.table({
        'Lượt chạy: ' : i,
        'Biến tích trữ: ' : accumulator
    });
    return accumulator += accumulator;
}
var totalCoin = courses.reduce(coinHandler, 1); */

/* preview avatar
    <div class="avatar__selector">
        <img src="" />
        <input type="file" />
    </div>
    <style>
    avatar selector 
    .avatar__selector{
        margin: 10px;
    }

    .avatar__selector img {
        height: 150px;
        width: 150px;
        border-radius: 50%;
        object-fit: cover;
        background: #dfdfdf;
    }
    Simple Scroll Snap 
    .Scroll{
        width: 350px;
        height: 350px;
        border-radius: 5%;
        display: flex;
        overflow: auto;
        scroll-snap-type: x mandatory;
    }
    .Scroll > .Scroll__item{
        min-width: 100%;
        scroll-snap-align: star;
    }
    .Scroll__item:nth-child(1){
        background-color: rgb(0,119,255)
    }
    .Scroll__item:nth-child(2){
        background-color: rgb(81,255,0);
    }
    .Scroll__item:nth-child(3){
        background-color: rgb(0,247,255);
    }
    .Scroll__item{
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style>
     const image = document.querySelector("img"),
     input = document.querySelector("input");

    input.addEventListener("change", () => {
     image.src = URL.createObjectURL(input.files[0]);
    }) */
//---------------------------------------------------------------------------------------------
/* reduce
// const result = numbers.reduce(callback,initialValue)
// Có truyền initialValue
Array.prototype.reduce2 = function(callback,result){
    let i = 0
    if(arguments.length<2){
        i = 1
        result = this[0]
    }
    for(;i<this.length;i++){
        result = callback(result, this[i],i,this)
    }
    return result
}
const numbers = [1,2,3,4,5]

const result = numbers.reduce2((total,number,index,array) =>{
    console.log(total,number,index,array)
    return total +number
})
console.log(result)

var arr = [
    ['name', 'Sơn Đặng'],
    ['age', 18],
];
function arrToObj(arr){
    return arr.reduce(function(acc,curr){
        acc[curr[0]] = curr[1];
        return acc;
    },{});
}
console.log(arrToObj(arr)); // { name: 'Sơn Đặng', age: 18 } 
*/
//---------------------------------------------------------------------------------------------
/*includes method
// có sẵn arrray và string
var title = 'reponsive web design';
console.log(title.includes('web',13));
// array
var courses = ['Javascript','PHP','Dart']
console.log(courses.includes('PHP',2)) */
//---------------------------------------------------------------------------------------------
//Call back
/* function myFunction(param){
    if(typeof param === 'function'){
        param('Học lập trình');
    }
}
function myCallback(value){
    console.log('Value: ',value);
}
myFunction(myCallback); */
// phần 2 CallBack Map()
/* Array.prototype.map2 =  function(callback){ // dinh nghia map2 cho mang
    var output = [];
    var arrayLength = this.length;
    for(var i = 0;i < arrayLength ; ++i){
        var result = callback(this[i],i); // i la so danh dau tu 0 , this la [] courses 
        output.push(result);
    }
    return output;
}

var courses = [
    'javascript',
    'PHP',
    'Ruby',
    'CSS'
];

courses.map(function(courses){ // ham map mac dinh cua array 
    console.log(courses);
});

courses.map2(function(courses, index){ // tu dinh nghia phuong thuc map 2
    console.log(index,courses);
}); */

// forEach
/* Array.prototype.forEach2 = function(callback){ // dinh nghia forEach2 cho mang
    for(var index in this){
        if(this.hasOwnProperty(index)){ // tai vi forEach2 nam trong proto
           callback(this[index], index, this);
        }
    }
}

var courses = new Array(100);
courses.push('JavaScript','PHP')

courses.forEach2(function(course, index, array){
    console.log(course, index, array)
}) */

// filter giống với phương thức Where trong SQL
/* Array.prototype.myFilter = function (cb) {
    var output = [];
    for (var index in this) {
        if (this.hasOwnProperty(index)) { // tai vi forEach2 nam trong proto
            var result = cb(this[index], index, this);
            if (result) {
                output.push(this[index]);
            }
        }
    }
    return output;
}

const numbers = [1, 2, 3, 4];

console.log(numbers.myFilter(function (number) {
    return number % 2 === 0;
})); 

console.log(numbers.myFilter(function (number, index) {
    return index % 2 === 0;
})); 
console.log(numbers.myFilter(function (number, index, array) {
    return array.length % 2 === 0;
})); */

// some: true or false tối thiểu 1 điều kiện trả về true
// every: true or false tất cả đều phải trả về true nếu có false lập tức dừng vòng lập và trả về false