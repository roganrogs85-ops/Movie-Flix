const TMDB_API_KEY = "07c582f1834adfef59fdc993d392ccd4";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";
const FALLBACK_BACKDROP = "img/Stranger Things poster backdrop.webp";
const FALLBACK_POSTER = "img/StrangerThings1.jpg";

const topbar = document.querySelector("#topbar");
const rowsRoot = document.querySelector("#rows");
const billboardStrip = document.querySelector("#billboard_strip");
const searchInput = document.querySelector("#search_input");
const searchResults = document.querySelector("#search_results");
const detailModal = document.querySelector("#detail_modal");
const trailerModal = document.querySelector("#trailer_modal");
const trailerFrame = document.querySelector("#trailer_frame");
const trailerStatus = document.querySelector("#trailer_status");

const hero = {
    background: document.querySelector("#hero_background"),
    kicker: document.querySelector("#hero_kicker"),
    title: document.querySelector("#title"),
    meta: document.querySelector("#hero_meta"),
    description: document.querySelector("#description"),
    trailer: document.querySelector("#play"),
    moreInfo: document.querySelector("#more_info")
};

const detail = {
    backdrop: document.querySelector("#detail_backdrop"),
    title: document.querySelector("#detail_title"),
    meta: document.querySelector("#detail_meta"),
    overview: document.querySelector("#detail_overview"),
    trailer: document.querySelector("#detail_trailer")
};

let activeTitle = null;
let homeTitles = [];
let searchTimer = null;

const fallbackTitles = [
    {
        id: 66732,
        media_type: "tv",
        title: "Stranger Things",
        name: "Stranger Things",
        overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying forces and one strange little girl.",
        backdrop_path: null,
        poster_path: null,
        vote_average: 8.7,
        first_air_date: "2016-07-15",
        genre_ids: [18, 10765]
    },
    {
        id: 76479,
        media_type: "tv",
        title: "The Boys",
        name: "The Boys",
        overview: "A vigilante group takes on corrupt superheroes who abuse their celebrity, power and corporate backing.",
        backdrop_path: null,
        poster_path: null,
        vote_average: 8.4,
        first_air_date: "2019-07-25",
        genre_ids: [10765, 10759]
    },
    {
        id: 245891,
        media_type: "movie",
        title: "John Wick",
        overview: "An ex-hitman comes out of retirement to track down the gangsters that took everything from him.",
        backdrop_path: null,
        poster_path: null,
        vote_average: 7.4,
        release_date: "2014-10-22",
        genre_ids: [28, 53]
    }
];

const rows = [
    {
        title: "Trending Now",
        path: "/trending/all/week"
    },
    {
        title: "Popular on MovieFlix",
        path: "/movie/popular",
        mediaType: "movie"
    },
    {
        title: "TV Shows Worth a Binge",
        path: "/tv/popular",
        mediaType: "tv"
    },
    {
        title: "Top Rated Movies",
        path: "/movie/top_rated",
        mediaType: "movie"
    },
    {
        title: "New Releases",
        path: "/movie/now_playing",
        mediaType: "movie"
    }
];

const localTrailerLibrary = {
    "The Boys": "video/theboys.webm",
    "John Wick": "video/john wick.webm",
    "Jurassic World": "video/jurasic world.webm"
};

function tmdbUrl(path, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}${path}`);
    url.searchParams.set("api_key", TMDB_API_KEY);
    url.searchParams.set("language", "en-US");
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, value);
        }
    });
    return url.toString();
}

async function fetchJson(path, params) {
    const response = await fetch(tmdbUrl(path, params));
    if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
    }
    return response.json();
}

function titleName(item) {
    return item.title || item.name || item.original_title || item.original_name || "Untitled";
}

function mediaType(item, fallback = "movie") {
    return item.media_type === "tv" || item.media_type === "movie" ? item.media_type : fallback;
}

function imageUrl(path, size, fallback) {
    return path ? `${IMAGE_BASE}/${size}${path}` : fallback;
}

function yearOf(item) {
    const date = item.release_date || item.first_air_date;
    return date ? date.slice(0, 4) : "New";
}

function ratingOf(item) {
    return item.vote_average ? item.vote_average.toFixed(1) : "NR";
}

function metaMarkup(item) {
    const type = mediaType(item) === "tv" ? "Series" : "Movie";
    return `
        <span class="match">${Math.round((item.vote_average || 8.1) * 10)}% Match</span>
        <span>${yearOf(item)}</span>
        <span class="badge">HD</span>
        <span>${type}</span>
        <span><i class="bi bi-star-fill"></i> ${ratingOf(item)}</span>
    `;
}

function normalizeItems(items, fallbackType) {
    const seen = new Set();
    return items
        .filter((item) => (item.poster_path || item.backdrop_path || item.title || item.name) && mediaType(item, fallbackType) !== "person")
        .map((item) => ({ ...item, media_type: mediaType(item, fallbackType) }))
        .filter((item) => {
            const key = `${item.media_type}-${item.id}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
}

function setHero(item, label = "Now streaming") {
    activeTitle = item;
    hero.background.style.setProperty("--hero-image", `url("${imageUrl(item.backdrop_path, "original", FALLBACK_BACKDROP)}")`);
    hero.kicker.textContent = label;
    hero.title.textContent = titleName(item);
    hero.meta.innerHTML = metaMarkup(item);
    hero.description.textContent = item.overview || "A featured title from TMDB, ready for your next movie night.";
}

function createTitleCard(item, rowLabel) {
    const card = document.createElement("button");
    card.className = "title_card";
    card.type = "button";
    card.innerHTML = `
        <img src="${imageUrl(item.poster_path, "w500", FALLBACK_POSTER)}" alt="${titleName(item)} poster" loading="lazy">
        <span class="title_overlay">
            <strong>${titleName(item)}</strong>
            <span>${yearOf(item)} · ${mediaType(item) === "tv" ? "Series" : "Movie"} · ${ratingOf(item)}</span>
        </span>
    `;
    card.addEventListener("mouseenter", () => setHero(item, rowLabel));
    card.addEventListener("focus", () => setHero(item, rowLabel));
    card.addEventListener("click", () => openDetail(item));
    return card;
}

function renderRow(row, items) {
    const section = document.createElement("section");
    section.className = "row";
    section.innerHTML = `
        <div class="row_header">
            <h2>${row.title}</h2>
            <div class="row_controls">
                <button class="row_btn" type="button" aria-label="Scroll ${row.title} left"><i class="bi bi-chevron-left"></i></button>
                <button class="row_btn" type="button" aria-label="Scroll ${row.title} right"><i class="bi bi-chevron-right"></i></button>
            </div>
        </div>
        <div class="row_scroller"></div>
    `;

    const scroller = section.querySelector(".row_scroller");
    const buttons = section.querySelectorAll(".row_btn");
    items.forEach((item) => scroller.appendChild(createTitleCard(item, row.title)));

    buttons[0].addEventListener("click", () => scroller.scrollBy({ left: -Math.round(scroller.clientWidth * 0.82), behavior: "smooth" }));
    buttons[1].addEventListener("click", () => scroller.scrollBy({ left: Math.round(scroller.clientWidth * 0.82), behavior: "smooth" }));

    rowsRoot.appendChild(section);
}

function renderBillboards(items) {
    billboardStrip.innerHTML = "";
    items.slice(0, 3).forEach((item, index) => {
        const card = document.createElement("button");
        card.className = "billboard";
        card.type = "button";
        card.innerHTML = `
            <img src="${imageUrl(item.backdrop_path, "w780", FALLBACK_BACKDROP)}" alt="${titleName(item)} backdrop" loading="lazy">
            <span class="billboard_content">
                <span>Top ${index + 1} Today</span>
                <strong>${titleName(item)}</strong>
            </span>
        `;
        card.addEventListener("mouseenter", () => setHero(item, "Top picks today"));
        card.addEventListener("click", () => openDetail(item));
        billboardStrip.appendChild(card);
    });
}

function showLoadingRows() {
    rowsRoot.innerHTML = "";
    rows.forEach((row) => {
        const section = document.createElement("section");
        section.className = "row";
        section.innerHTML = `
            <div class="row_header"><h2>${row.title}</h2></div>
            <div class="row_scroller">
                <div class="loading_card">Loading from TMDB...</div>
                <div class="loading_card">Building your row...</div>
                <div class="loading_card">Finding trailers...</div>
            </div>
        `;
        rowsRoot.appendChild(section);
    });
}

function openDetail(item) {
    activeTitle = item;
    detail.backdrop.style.setProperty("--detail-image", `url("${imageUrl(item.backdrop_path, "original", FALLBACK_BACKDROP)}")`);
    detail.title.textContent = titleName(item);
    detail.meta.innerHTML = metaMarkup(item);
    detail.overview.textContent = item.overview || "No synopsis is available yet.";
    detailModal.classList.add("active");
    detailModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal_open");
}

function closeDetail() {
    detailModal.classList.remove("active");
    detailModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal_open");
}

async function findTrailer(item) {
    const type = mediaType(item);
    const videos = await fetchJson(`/${type}/${item.id}/videos`);
    const matches = videos.results || [];
    return matches.find((video) => video.site === "YouTube" && video.type === "Trailer" && video.official)
        || matches.find((video) => video.site === "YouTube" && video.type === "Trailer")
        || matches.find((video) => video.site === "YouTube" && /trailer|teaser/i.test(video.name));
}

async function openTrailer(item) {
    if (!item) {
        return;
    }

    closeDetail();
    trailerFrame.innerHTML = "";
    trailerStatus.classList.remove("active");
    trailerStatus.textContent = "";
    trailerModal.classList.add("active");
    trailerModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal_open");

    try {
        const trailer = await findTrailer(item);
        if (trailer?.key) {
            trailerFrame.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0"
                    title="${titleName(item)} trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            `;
            return;
        }
        throw new Error("No YouTube trailer found");
    } catch (error) {
        const localTrailer = localTrailerLibrary[titleName(item)];
        if (localTrailer) {
            trailerFrame.innerHTML = `<video src="${localTrailer}" controls autoplay playsinline></video>`;
            return;
        }
        trailerStatus.textContent = "Trailer is not available for this title right now.";
        trailerStatus.classList.add("active");
    }
}

function closeTrailer() {
    trailerFrame.innerHTML = "";
    trailerStatus.textContent = "";
    trailerStatus.classList.remove("active");
    trailerModal.classList.remove("active");
    trailerModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal_open");
}

function renderSearch(items) {
    searchResults.innerHTML = "";
    if (!items.length) {
        searchResults.innerHTML = `<div class="empty_card">No titles found.</div>`;
        searchResults.classList.add("active");
        return;
    }

    items.slice(0, 10).forEach((item) => {
        const button = document.createElement("button");
        button.className = "search_card";
        button.type = "button";
        button.innerHTML = `
            <img src="${imageUrl(item.poster_path, "w185", FALLBACK_POSTER)}" alt="${titleName(item)} poster">
            <span>
                <strong>${titleName(item)}</strong>
                <span>${yearOf(item)} · ${mediaType(item) === "tv" ? "Series" : "Movie"} · ${ratingOf(item)}</span>
            </span>
        `;
        button.addEventListener("click", () => {
            searchResults.classList.remove("active");
            searchInput.value = "";
            setHero(item, "Search result");
            openDetail(item);
        });
        searchResults.appendChild(button);
    });
    searchResults.classList.add("active");
}

async function runSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) {
        searchResults.classList.remove("active");
        searchResults.innerHTML = "";
        return;
    }

    try {
        const data = await fetchJson("/search/multi", {
            query: trimmed,
            include_adult: "false"
        });
        renderSearch(normalizeItems(data.results || []).filter((item) => mediaType(item) !== "person"));
    } catch (error) {
        const localMatches = homeTitles.filter((item) => titleName(item).toLowerCase().includes(trimmed.toLowerCase()));
        renderSearch(localMatches);
    }
}

async function loadHome() {
    showLoadingRows();
    try {
        const rowResponses = await Promise.all(rows.map(async (row) => {
            const data = await fetchJson(row.path);
            return {
                row,
                items: normalizeItems(data.results || [], row.mediaType)
            };
        }));

        homeTitles = rowResponses.flatMap(({ items }) => items);
        rowsRoot.innerHTML = "";
        rowResponses.forEach(({ row, items }) => renderRow(row, items));
        renderBillboards(rowResponses[0]?.items || homeTitles);

        const heroTitle = rowResponses[0]?.items?.find((item) => item.backdrop_path && item.overview)
            || homeTitles.find((item) => item.backdrop_path)
            || homeTitles[0];
        if (heroTitle) {
            setHero(heroTitle, "Trending now");
        }
    } catch (error) {
        const local = normalizeItems(fallbackTitles);
        homeTitles = local;
        rowsRoot.innerHTML = "";
        renderRow({ title: "MovieFlix Picks" }, local);
        renderBillboards(local);
        setHero(local[0], "Featured fallback");
    }
}

window.addEventListener("scroll", () => {
    topbar.classList.toggle("scrolled", window.scrollY > 20);
});

searchInput.addEventListener("input", () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => runSearch(searchInput.value), 250);
});

document.addEventListener("click", (event) => {
    if (!searchResults.contains(event.target) && !searchInput.contains(event.target)) {
        searchResults.classList.remove("active");
    }
});

hero.trailer.addEventListener("click", () => openTrailer(activeTitle));
hero.moreInfo.addEventListener("click", () => activeTitle && openDetail(activeTitle));
detail.trailer.addEventListener("click", () => openTrailer(activeTitle));

document.querySelector("[data-close-modal]").addEventListener("click", closeDetail);
document.querySelector("[data-close-trailer]").addEventListener("click", closeTrailer);

detailModal.addEventListener("click", (event) => {
    if (event.target === detailModal) {
        closeDetail();
    }
});

trailerModal.addEventListener("click", (event) => {
    if (event.target === trailerModal) {
        closeTrailer();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeTrailer();
        closeDetail();
        searchResults.classList.remove("active");
    }
});

loadHome();
