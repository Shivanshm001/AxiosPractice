let searchBar = document.querySelector('select');
let searchBtn = document.getElementById('searchBtn')
let breedLists = document.querySelector('breedOpt');
let dogImg = document.querySelector(".img");
let breedName = document.querySelector(".breed-name");

//For subsection
let bredFor = document.querySelector(".bred-for");
let height = document.querySelector(".height");
let weight = document.querySelector(".weight");
let lifeSpan = document.querySelector(".life-sp");
let origin = document.querySelector('.origin');
let temper = document.querySelector('.temper');

const fillSelect = async () => {
    try {
        let { data } = await axios({
            method: 'get',
            url: 'https://api.thedogapi.com/v1/breeds',
            withCredentials: false
        })
        data.forEach((item) => {
            let option = document.createElement('option');
            option.innerText = `${item.name}`;
            searchBar.appendChild(option);
        });

    } catch (error) {
        if (error) console.log(error);
    }
}
fillSelect();

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    breedName.textContent = searchBar.value;
    try {
        const { data } = await axios({
            method: 'get',
            url: `https://api.thedogapi.com/v1/breeds/search?q=${searchBar.value}`
        })
        console.log(data);
        bredFor.innerText = `${data[0].bred_for}`;
        height.innerText = `${data[0].height.metric} meters`;
        weight.innerText = `${data[0].weight.metric} kg`;
        lifeSpan.innerText = `${data[0].life_span}`
        temper.innerText = `${data[0].temperament}`
        if (!data[0].origin) origin.innerText = "Unknown";
        else if (data[0].origin != "") origin.innerText = `${data[0].origin}`;

        const img = await axios({
            method: 'get',
            url: `https://api.thedogapi.com/v1/images/${data[0].reference_image_id}`
        })
        if (!img.data.url) {
            console.log("Image no avilable or unable to load.");
            dogImg.setAttribute("src","");
        }
        dogImg.setAttribute('src',img.data.url);
        dogImg.setAttribute('alt',data[0].name)
    } catch (error) {
        if (error) console.log(error);
    }
});