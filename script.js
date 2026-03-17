const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

// Sidebar toggle for mobile
const hamburgerBtn = document.querySelector('.hamburger-btn');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

hamburgerBtn.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar--open');
    sidebarOverlay.classList.toggle('sidebar-overlay--active');
});

sidebarOverlay.addEventListener('click', function () {
    sidebar.classList.remove('sidebar--open');
    sidebarOverlay.classList.remove('sidebar-overlay--active');
});

// Artist data inlined — no server or fetch needed
const allArtists = [
    { id: 1, name: "Foo Fighters",         genre: "Rock",      urlImg: "https://i.scdn.co/image/ab67616100005174c884df599abc793c116cdf15" },
    { id: 2, name: "Michael Jackson",       genre: "Pop",       urlImg: "https://i.scdn.co/image/ab676161000051740e08ea2c4d6789fbf5cbe0aa" },
    { id: 3, name: "Emicida",               genre: "Hip Hop",   urlImg: "https://i.scdn.co/image/ab67616100005174908b4b4bc90e1518b68b4068" },
    { id: 4, name: "Chitãozinho e Xororó",  genre: "Sertanejo", urlImg: "https://i.scdn.co/image/ab676161000051744606c59411c57f7b49588be4" },
    { id: 5, name: "Mc Coringa",            genre: "Funk",      urlImg: "https://i.scdn.co/image/ab67616d00001e02fe8f6dd361ad0f12b88c7f56" },
    { id: 6, name: "Arlindo Cruz",          genre: "Samba",     urlImg: "https://i.scdn.co/image/ab67616100005174181873f93056642d7b340839" },
    { id: 7, name: "Caetano Veloso",        genre: "MPB",       urlImg: "https://i.scdn.co/image/ab67616100005174e98de50f36cf1aa4bf047757" }
];

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23535353'/%3E%3Cellipse cx='100' cy='85' rx='35' ry='35' fill='%23b3b3b3'/%3E%3Cellipse cx='100' cy='175' rx='60' ry='45' fill='%23b3b3b3'/%3E%3C/svg%3E";

function displayResults(results) {
    const gridContainer = resultArtist.querySelector('.grid-container');
    const cards = results.map((artist) => `
        <div class="artist-card">
            <div class="card-img">
                <img class="artist-img"
                    src="${artist.urlImg}"
                    alt="${artist.name}"
                    onerror="this.onerror=null;this.src='${FALLBACK_IMG}'" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artist</span>
            </div>
        </div>`).join('');

    gridContainer.innerHTML = cards;
    resultPlaylist.classList.add('hidden');
    resultArtist.classList.remove('hidden');
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return;
    }

    const filtered = allArtists.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm)
    );

    displayResults(filtered);
});