function timeCalculate (time){
    const hour = parseInt(time / 3600);
    let second =  time % 3600;
    const min = parseInt (second / 60);
    second = second % 60;
    return `${hour} hour ${min} min ${second} sec ago`
}


const  loadCategory = async() => {
   try{
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await res.json();
    loadDisplay(data.categories);
   }
    catch(error){
        console.error(error);
    }
}

// load video from API
const loadVideo = async (searchText = "") => {
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await res.json();
        videoDisplay(data.videos);
    }
    catch(error){
        console.log(error);
    }
}

// button color remove function
const activeBtnRemove = () => {
    const removeBtn = document.getElementsByClassName('category-btn');
    for(let btn of removeBtn){
        btn.classList.remove('active');
    }
}

const loadBtnCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtnRemove();

        activeBtn.classList.add('active')
        videoDisplay(data.category)
    })
}

// Details btn section

const loadDetails = async (videoId) => {
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
        const data = await res.json();
        displayDetails(data.video);
    }
    catch(error){
        console.error(error);
    }
}

// display details section

const displayDetails = (video) => {
    console.log(video);
    const modelContainer = document.getElementById('model-container');
    modelContainer.innerHTML = `
        <img src="${video.thumbnail}"/>
        <p class="mt-1">${video.description}</p>
    `

    document.getElementById('model-btn').click();
}

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

// load video display section
const videoDisplay = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";

    if(videos.length === 0 ){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
            <div class="min-h-[300px] flex flex-col gap-5 items-center justify-center">
                <img src="./assets/Icon.png" alt="">
                <h2 class="text-center font-bold  text-2xl ">Oops!! Sorry, There is no <br> content here</h2>
            </div>
        `
    }
    else{
        videoContainer.classList.add("grid");
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML =`
           <figure class="h-[200px] relative">
            <img
              src="${video.thumbnail}"
              class="h-full w-full object-cover"
              alt="Shoes" />
              ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1"> ${timeCalculate(video.others.posted_date)}</span>`}
              
           </figure>
        <div class="py-2 flex gap-5">
            <div> <img class="h-8 w-8 object-cover rounded-full" src="${video.authors[0].profile_picture}" alt="">
            </div>
            <div>
                <h2 class="font-bold text-xl">${video.title}</h2>
                <div class="flex gap-2 items-center text-gray-400 text-xs pt-2">
                   <p>${video.authors[0].profile_name}</p> 
                   
                   ${video.authors[0].verified === true ?  `<img class="h-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt=""></img>` : ""}
                </div>
                <div class="text-sm mt-2 text-gray-400">
                   <p>${video.others.views} views</p>
                </div>
                <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error mt-2 ">Details</button>
            <div>
        </div>
        `
        videoContainer.append(card);
    })
}






// Load display section

// {
//     "category_id": "1001",
//     "category": "Music"
// }



const loadDisplay = (categories) => {
    const btnContainer = document.getElementById('btn-container');
    categories.forEach(item => {
        // create button
        const div = document.createElement('div');
        div.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadBtnCategory(${item.category_id})" class="btn category-btn">
                ${item.category}
            </button>
        `

        btnContainer.append(div);
    })
}




document.getElementById('search-input').addEventListener("keyup", (e) => {
    loadVideo(e.target.value);
})

loadCategory();
loadVideo();