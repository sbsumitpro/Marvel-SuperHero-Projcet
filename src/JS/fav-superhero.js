const canvas = document.querySelector(".canvas");
const fav_superhero_ids= JSON.parse(localStorage.getItem("fav_id_list"))
console.log(fav_superhero_ids);


document.addEventListener("click",function(e){
    // console.log(e.target.className);
    if(e.target.className == "fa-solid fa-heart"){
        alert("removed from Favourite")
        fav_id_tobe_removed = e.target.parentElement.getAttribute("data_id");
        index = fav_superhero_ids.indexOf(fav_id_tobe_removed)
        // console.log(index);
        fav_superhero_ids.splice(index,1)
        localStorage.setItem("fav_id_list",JSON. stringify(fav_superhero_ids))
        location.reload();

    }
})


// Fetching the fav character in details and render it dynamically:-
for(let id of fav_superhero_ids){

    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=04adf16f7efea679035b3655927373b6&hash=fba10fab034af1b66fe7f6819571fed6`)
    .then((res)=>{
        // console.log(res.json());
        return res.json()
    }).then((data)=>{
        // console.log(data.data.results)
        let results = data.data.results
        for(let result of results){
            nm = result.name;
            url = result.thumbnail.path+"."+result.thumbnail.extension;
            id = result.id;
            // bio = result.description 
            // console.log(nm)
            // console.log(url);
            showFavChar(nm,url,id)
        }
    
    })
}

function showFavChar(nm,url,id){
    // let n = results.length;
    canvas.innerHTML += `
    <div class="fav-superhero-div">
        <img src="${url}" alt="">
        <div>
            <span>${nm}</span>
            <span data_id="${id}"><i class="fa-solid fa-heart"></i></span>
        </div>
    </div>
     `

}