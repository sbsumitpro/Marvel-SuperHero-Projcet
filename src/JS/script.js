
const character_c = document.querySelector(".character-container");
const inp_field = document.querySelector(".search-bar input");
const search_result = document.querySelector("#search_results");
const x_btn = document.querySelector("#xmark");
inp_text=""

// ------handelling all the click events thorough event delegation ---------//

document.body.addEventListener("click",function(e){

    // Except anchor tags clickevent is prevented for all other elements
        if(e.target.tagName != 'A'){
            e.preventDefault()
        }

    // Handelling the "X" button event inside search inputbox
        if(e.target.className=="fa fa-thin fa-rectangle-xmark"){
            search_result.innerHTML = "";
            inp_field.value = ""
        }

    // Handeling add to favourite button event to store the data in localstorage
        if(e.target.className=="fa-regular fa-heart"){
            let favId = e.target.parentElement.getAttribute("data_id")
            // Here we are checking if any past history of Favourite character is there, if no then we are storing it(the particular id) in the localstorage as an array. Also checked for the same id, it will not get added
            let fav_id_list = JSON.parse(localStorage.getItem("fav_id_list"))
            if(fav_id_list != null){
                if( !(fav_id_list.includes(favId))){
                    alert("added to favourite")
                    fav_id_list.push(favId)
                }
                else{
                    alert("Already present in Favourite")
                }
            }else{
                alert("added to favourite")
                fav_id_list=[]
                fav_id_list.push(favId)
            }

            localStorage.setItem("fav_id_list",JSON. stringify(fav_id_list))

        }

    // Handelling the click event on the search result to open more-info page
        if(e.target.className=="s_result"){
            let char_id = e.target.getAttribute("data_id")
            sessionStorage.setItem("char_id", char_id);
            window.open("more-info.html")
        }

    // Handelling the click event on the homepage list of characters to open more-info page
        if(e.target.className=="character-img"){
            let char_id = e.target.getAttribute("data_id_home")
            sessionStorage.setItem("char_id", char_id);
            window.open("more-info.html")
        }
})


// ---using setInterval to check the given input in every 50 miliseconds & based on that hitting API to get the result---//

setInterval(
    inp_field.addEventListener("keyup",(e)=>{
            inp_text = inp_field.value
            console.log(inp_field.value);
            search_result.innerHTML = ""
            if(inp_text){
                fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=${inp_text}&apikey=c7335f58691ddffafea09ebfe3817987&hash=64e2fbd1070cc75d65a1ff04d4d87b4c&limit=4`)
                .then(res=>res.json())
                .then((data)=>{
                    // console.log(data);
                    let results = data.data.results
                    for(let result of results){
                        id = result.id;
                        nm = result.name;
                        url = result.thumbnail.path+"."+result.thumbnail.extension;
                        console.log(id,nm);
                        showCharacterSuggestions(nm,url,id)
                    }
                }).catch((err)=>{
                    console.error("error",err)
                })
            }

        })
,50)


// ----on page loading dynamically fetching the list of characters----- //

fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=04adf16f7efea679035b3655927373b6&hash=fba10fab034af1b66fe7f6819571fed6&limit=24")
.then((res)=>{
    // console.log(res.json());
    return res.json()
}).then((data)=>{
    // console.log(data.data.results)
    let results = data.data.results
    for(let result of results){
        nm = result.name;
        id = result.id;
        console.log(id, nm);
        url = result.thumbnail.path+"."+result.thumbnail.extension;
        // console.log(url);
        showHomePageCharcters(nm,url,id)
    }

})


function showHomePageCharcters(nm,url,id){
    // let n = results.length;
    character_c.innerHTML += `
    <div class="characters" >
        <div>
            <img class="character-img" data_id_home="${id}" src="${url}" alt="">
        </div>
        <span class="character-name">${nm}</span>
   </div> 
    `
}

function showCharacterSuggestions(nm,url,id){
    search_result.innerHTML += (`
        <li class="s_result" data_id="${id}">
            <div class="poster-div">
                <img src="${url}" alt="">
            </div>
            <span>${nm}</span>
            <span data_id="${id}" class="add-to-favourite"><i class="fa-regular fa-heart"></i></span>
        </li>
    `)
    
}


