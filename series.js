const seriesSearch = document.querySelector("#series_search");
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector("#hero_title");
const heroDescription = document.querySelector("#hero_description");
const heroGenre = document.querySelector("#hero_genre");
const heroYear = document.querySelector("#hero_year");
const heroMatch = document.querySelector("#hero_match");
const heroSeasons = document.querySelector("#hero_seasons");
const heroPlay = document.querySelector("#hero_play");
const topGrid = document.querySelector("#top_grid");
const trendingRow = document.querySelector("#trending_row");
const actionRow = document.querySelector("#action_row");
const dramaRow = document.querySelector("#drama_row");
const seriesCount = document.querySelector("#series_count");

const seriesMeta = {
    "Stranger Things": {
        description: "When a boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying forces and one very unusual girl.",
        seasons: "4 Seasons",
        match: "98% Match",
        accent: "Sci-Fi Event"
    },
    "The Boys": {
        description: "A dangerous squad of outsiders battles celebrity superheroes who hide corruption behind perfect branding.",
        seasons: "4 Seasons",
        match: "97% Match",
        accent: "Dark Satire"
    },
    "Money Heist": {
        description: "A mastermind called The Professor recruits a team of thieves for a precision heist that becomes a worldwide obsession.",
        seasons: "5 Parts",
        match: "99% Match",
        accent: "Heist Thriller"
    },
    "Moon Knight": {
        description: "A man living with fractured identities becomes caught in a supernatural war tied to ancient gods.",
        seasons: "1 Season",
        match: "90% Match",
        accent: "Psychological Action"
    },
    "Kota Factory": {
        description: "Students navigate friendship, pressure and ambition inside the fiercely competitive world of exam coaching.",
        seasons: "2 Seasons",
        match: "96% Match",
        accent: "Coming-of-age"
    },
    "Collage Romance": {
        description: "Young love, misread signals and campus chaos collide in a breezy series built around first feelings.",
        seasons: "1 Season",
        match: "87% Match",
        accent: "Campus Romance"
    },
    "The Witcher": {
        description: "A monster hunter, a runaway princess and a powerful sorceress are drawn together by destiny and war.",
        seasons: "3 Seasons",
        match: "93% Match",
        accent: "Fantasy Epic"
    },
    "Crash Landing on You": {
        description: "A South Korean heiress is swept across the border and finds unexpected safety, danger and love.",
        seasons: "1 Season",
        match: "95% Match",
        accent: "Global Hit"
    },
    "Itaewon Class": {
        description: "After devastating loss, a determined young man builds a restaurant empire and challenges an entrenched elite.",
        seasons: "1 Season",
        match: "91% Match",
        accent: "Revenge Drama"
    },
    "Hospital Playlist": {
        description: "Five longtime friends juggle medicine, music and everyday life with warmth, humor and quiet heartbreak.",
        seasons: "2 Seasons",
        match: "94% Match",
        accent: "Comfort Watch"
    },
    "Reply 1988": {
        description: "Family, friendship and first love unfold in a nostalgic neighborhood where every household feels familiar.",
        seasons: "1 Season",
        match: "98% Match",
        accent: "Classic Favorite"
    }
};

const availablePages = new Set([
    "crash landing on you.html",
    "hospital playlist.html",
    "itaewon class.html",
    "reply 1988.html",
    "series.html",
    "stranger things.html",
    "the witcher.html"
]);

const posterFallbacks = {
    "Stranger Things": {
        sposter: "img/the boys.jpg",
        bposter: "img/the boys1.jpg"
    },
    "Crash Landing on You": {
        sposter: "img/topgun.jpg",
        bposter: "img/topgun1.jpg"
    },
    "Itaewon Class": {
        sposter: "img/eesho.jpeg",
        bposter: "img/eesho1.jpg"
    },
    "Hospital Playlist": {
        sposter: "img/ant man.jpg",
        bposter: "img/ant man1.jpg"
    },
    "Reply 1988": {
        sposter: "img/avengers.jpg",
        bposter: "img/avengers1.jpg"
    },
    "The Witcher": {
        sposter: "img/jurassic world.jpg",
        bposter: "img/jurassic world1.jpg"
    }
};

function withFallback(movie) {
    const fallback = posterFallbacks[movie.name] || {};
    return {
        ...movie,
        sposter: movie.sposter || fallback.sposter || "img/the boys.jpg",
        bposter: movie.bposter || fallback.bposter || "img/the boys1.jpg"
    };
}

function getSeriesMeta(movie) {
    return seriesMeta[movie.name] || {
        description: `${movie.name} is a binge-ready ${movie.genre.toLowerCase()} series from ${movie.date}.`,
        seasons: "1 Season",
        match: "88% Match",
        accent: movie.genre
    };
}

function setHero(movie) {
    const meta = getSeriesMeta(movie);
    const safeMovie = withFallback(movie);

    hero.style.background = `
        linear-gradient(90deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.52) 42%, rgba(0, 0, 0, 0.08) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.08) 45%, rgba(20, 20, 20, 0.98) 100%),
        url("${safeMovie.bposter}") center center / cover no-repeat
    `;

    heroTitle.textContent = movie.name.toUpperCase();
    heroDescription.textContent = meta.description;
    heroGenre.textContent = meta.accent;
    heroYear.textContent = movie.date;
    heroMatch.textContent = meta.match;
    heroSeasons.textContent = meta.seasons;
    heroPlay.href = availablePages.has(movie.url) ? movie.url : "#";
}

function createFeaturedCard(movie, index) {
    const meta = getSeriesMeta(movie);
    const safeMovie = withFallback(movie);
    const href = availablePages.has(movie.url) ? movie.url : "#";
    const card = document.createElement("a");
    card.className = "featured_card";
    card.href = href;
    card.style.setProperty("--card-image", `url("${safeMovie.bposter}")`);
    card.innerHTML = `
        <span class="rank">${index + 1}</span>
        <div class="featured_copy">
            <strong>${movie.name}</strong>
            <p>${meta.description}</p>
            <div class="featured_meta">
                <span>${movie.genre}</span>
                <span>${movie.date}</span>
                <span>${meta.seasons}</span>
            </div>
        </div>
    `;
    card.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.84)), url("${safeMovie.bposter}")`;
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.addEventListener("mouseenter", () => setHero(movie));
    card.addEventListener("focus", () => setHero(movie));
    return card;
}

function createTile(movie) {
    const safeMovie = withFallback(movie);
    const href = availablePages.has(movie.url) ? movie.url : "#";
    const tile = document.createElement("a");
    tile.className = "series_tile";
    tile.href = href;
    tile.style.setProperty("--tile-image", `url("${safeMovie.sposter}")`);
    tile.style.backgroundImage = `url("${safeMovie.sposter}")`;
    tile.style.backgroundSize = "cover";
    tile.style.backgroundPosition = "center";
    tile.innerHTML = `
        <div class="tile_copy">
            <strong>${movie.name}</strong>
            <span>${movie.genre} • ${movie.date}</span>
        </div>
    `;
    tile.addEventListener("mouseenter", () => setHero(movie));
    tile.addEventListener("focus", () => setHero(movie));
    return tile;
}

function renderRows(series) {
    topGrid.innerHTML = "";
    trendingRow.innerHTML = "";
    actionRow.innerHTML = "";
    dramaRow.innerHTML = "";

    if (!series.length) {
        const empty = document.createElement("div");
        empty.className = "empty_state";
        empty.textContent = "No series available yet.";
        topGrid.appendChild(empty);
        return;
    }

    const topPicks = [...series].sort((a, b) => Number(b.imdb) - Number(a.imdb)).slice(0, 4);
    const actionPicks = series.filter((item) => ["Action", "Sci-Fi", "Fantasy"].includes(item.genre));
    const dramaPicks = series.filter((item) => ["K-Drama", "Drama"].includes(item.genre) || ["Kota Factory", "Reply 1988", "Hospital Playlist", "Crash Landing on You", "Itaewon Class", "Collage Romance"].includes(item.name));

    topPicks.forEach((movie, index) => topGrid.appendChild(createFeaturedCard(movie, index)));
    series.forEach((movie) => trendingRow.appendChild(createTile(movie)));
    actionPicks.forEach((movie) => actionRow.appendChild(createTile(movie)));
    dramaPicks.forEach((movie) => dramaRow.appendChild(createTile(movie)));
}

function filterSeries(series, query) {
    if (!query) {
        return series;
    }

    const normalized = query.trim().toLowerCase();
    return series.filter((movie) => {
        const text = `${movie.name} ${movie.genre} ${movie.date}`.toLowerCase();
        return text.includes(normalized);
    });
}

async function loadMovies() {
    try {
        const response = await fetch("http://localhost:3000/api/movies");
        if (!response.ok) {
            throw new Error("API request failed");
        }
        return await response.json();
    } catch (error) {
        const fallback = await fetch("movie.json");
        return fallback.json();
    }
}

loadMovies().then((data) => {
    const series = data.filter((item) => item.type === "series");
    seriesCount.textContent = `${series.length} series ready to watch`;

    const defaultHero = series.find((item) => item.name === "Stranger Things") || series[0];
    if (defaultHero) {
        setHero(defaultHero);
    }

    renderRows(series);

    seriesSearch.addEventListener("input", (event) => {
        const filtered = filterSeries(series, event.target.value);
        seriesCount.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;
        renderRows(filtered);

        if (filtered[0]) {
            setHero(filtered[0]);
        }
    });
});
