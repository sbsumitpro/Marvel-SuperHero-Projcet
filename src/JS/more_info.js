// alert("hello")
const canvas = document.querySelector(".canvas");
const home_btn = document.querySelector(".home");
let char_id = sessionStorage.getItem("char_id");
// console.log(char_id);

// Fetching the specific character in detaails:-

fetch(`https://gateway.marvel.com:443/v1/public/characters/${char_id}?ts=1&apikey=04adf16f7efea679035b3655927373b6&hash=fba10fab034af1b66fe7f6819571fed6`)
.then((res)=>{
    // console.log(res.json());
    return res.json()
}).then((data)=>{
    // console.log(data.data.results)
    let results = data.data.results
    for(let result of results){
        nm = result.name;
        url = result.thumbnail.path+"."+result.thumbnail.extension;
        bio = result.description 
        // console.log(nm)
        // console.log(url);
        showMoreInfo(nm,url,bio)
    }

})

function showMoreInfo(nm,url,bio){
    // let n = results.length;
    canvas.innerHTML += `

     <div class="character-img-div">
         <img src="${url}" alt="">
    </div>
    <div class="character-info">
        <h2>${nm}</h3>
        <h3>Bio:</h3>
        <p>${bio}</p>
        <h3>Comics</h3>
        <a href="http://marvel.com/comics/characters/1011334/3-d_man?utm_campaign=apiRef&utm_source=04adf16f7efea679035b3655927373b6">Comics</a>
    </div>`

}


