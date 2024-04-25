function createList(data) {
    data.forEach(({ artistName, trackName }) => {
        const listItem = document.createElement("li")
        listItem.innerHTML = `${artistName} - ${trackName}`
        list.append(listItem)
    })
}

async function getList(url) {
    const rawData = await fetch(url)
    const { results } = await rawData.json()
    musicList = results
    loader.classList.add("no-display")
    createList(musicList)
}

function searchHandler(e) {
    const searchText = e.target.value
    const filteredList = musicList.filter(song => song.artistName.toLowerCase().includes(searchText.toLowerCase()) || song.trackName.toLowerCase().includes(searchText.toLowerCase()))
    list.innerHTML = ""
    if (filteredList.length === 0) {
        alert("Ne postoji traženi pojam!")
        return
    }
    createList(filteredList)
}

let musicList = []

const searchField = document.getElementById("search-field")
searchField.addEventListener("input", searchHandler)

const loader = document.getElementById("loader")

const list = document.getElementById("song-list")

getList("https://itunes.apple.com/search?term=indie&entity=song")