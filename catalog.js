const TMDB_API_KEY = "07c582f1834adfef59fdc993d392ccd4";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const tmdbCache = new Map();

const detailCopy = {
  "THE BOYS": "A brutal superhero satire where power, fame, and revenge collide in explosive style.",
  "HOUSE OF THE DRAGON": "A royal fantasy drama built on family rivalry, dragon fire, and the fight for the throne.",
  "GAME OF THRONES": "Noble houses battle for power while a darker threat rises beyond the wall.",
  "STRANGER THINGS": "A group of friends face supernatural danger, secret labs, and a mystery that changes their town.",
  "THE WITCHER": "A monster hunter crosses paths with destiny in a world of magic, danger, and uneasy kingdoms.",
  "MICHAEL": "A cinematic story made for a dramatic movie-night watch.",
  "DUNE": "A grand sci-fi epic of desert worlds, family legacy, and a fight for survival.",
  "TOP GUN MAVERICK": "High-speed aerial action with rivalry, legacy, and impossible missions.",
  "AVATAR": "A visually rich sci-fi adventure set in a world full of wonder, conflict, and discovery.",
  "SCREAM 7": "A sharp horror ride where old fears return with a new mask.",
  "MORTAL KOMBAT": "Fighters enter a deadly tournament packed with brutal action and supernatural power.",
  "HARRY POTTER": "A magical adventure filled with friendship, mystery, and a battle against darkness.",
  "DARK KNIGHT": "A tense superhero crime story about chaos, justice, and sacrifice.",
  "SUPERMAN": "A heroic adventure about hope, strength, and protecting the world.",
  "AYYAPPANUM KOSHIYUM": "Ayyappan, a police officer, is an upright man who always strives to do the right thing. However, things change when a retired army havildar, Koshy, settles in his village and the two egos clash.",
  "KGF":"A period drama set in the 1970s, KGF follows the story of a fierce rebel who rises against the brutal oppression in Kolar Gold Fields and becomes the symbol of hope to legions of downtrodden people.",
  "URI":"Following the roguish terrorist attacks at Uri Army Base camp in Kashmir, India takes the fight to the enemy, in its most successful covert operation till date with one and only one objective of avenging their fallen heroes.",
  "96":"A travel photographer visits his hometown for a school reunion and reconnects with his childhood sweetheart, leading to a bittersweet night of reminiscing about their unfulfilled love and the past.",
  "BAHUBALI":"When a mysterious child is found by a tribal couple near a roaring waterfall, they raise him as their own. As he grows, Sivudu is drawn to the world beyond the cliffs, where he discovers the ancient kingdom of Mahishmati, ruled by a cruel tyrant, haunted by rebellion, and bound to his past. What begins as a quest for love soon unravels a legacy of betrayal, sacrifice, and a forgotten prince.",
  "RATSASAN":"A serial killer is murdering school girls, and a newbie cop has to track him down before the victim count increases.",
  "12TH FAIL":"Based on the true story of IPS officer Manoj Kumar Sharma, 12th Fail sheds limelight on fearlessly embracing the idea of restarting the academic journey despite the setbacks and challenges and reclaiming one's destiny at a place where millions of students attempt the world's toughest competitive exam: UPSC.",
  "ROCKETRY":"The story of the great Indian rocket scientist, Shri Nambi Narayanan's life, a true patriot, who was turned into a villain in the blink of an eye after being falsely accused of treason.",
  "KAITHI":"Dilli, a convicted criminal, is out on parole to meet his daughter. However, a drug bust sets him off on a mission to save the life of police officers.",
  "SOORARAI POTTRU":"Nedumaaran Rajangam Maara sets out to make the common man fly and in the process takes on the world's most capital intensive industry and several enemies who stand in his way.",
  "ASURAN":"A family from the underprivileged class is on the run after the teenaged son kills a rich man from the upper caste. Can the pacifist father be able to save his hot-blooded son?",
  "DANGAL":"Dangal is an extraordinary true story based on the life of Mahavir Singh and his two daughters, Geeta and Babita Phogat. The film traces the inspirational journey of a father who trains his daughters to become world class wrestlers.",
  "THE GRAY MAN":"When a shadowy CIA agent uncovers damning agency secrets, he's hunted across the globe by a sociopathic rogue operative who's put a bounty on his head.",
  "MAHARAJA":"A barber seeks vengeance after his home is burglarized, cryptically telling police his Lakshmi has been taken, leaving them uncertain if it's a person or object, jeer at his request until they learn what they're really looking for.",
  "VIKRAM VEDHA":"A notorious gangster Vedha surrenders himself to encounter specialist Vikram whom he challenges every step of the way by narrating his life events in the form of riddles that needs to be solved in order to capture him.",
  "VIKRAM":"Amar is assigned to investigate a case of serial killings. When Amar investigates the case, he realizes it is not what it seems to be and following down this path will lead to nothing but war between everyone involved.",
  "FIGHT CLUB":"A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground fight clubs forming in every town, until an eccentric gets in the way and ignites an out-of",
  "VADA CHENNAI":"Anbu, a young carrom player in North Chennai becomes inadvertently involved in an ongoing conflict between two local gangsters.",
  "MS DHONI THE UNTOLD STORY":"Based on the life story of Mahendra Singh Dhoni, and his journey to being the world cup winning captain of the Indian cricket team.",
  "LUCKY BASKHAR":"A cash-strapped bank cashier embarks on a risky investment scheme and soon gets drawn into the murky world of money laundering.",
  "RRR":"A fictional history of two legendary revolutionaries' journey away from home before they began fighting for their country in the 1920s.",
  "JAILER":"Following the events of Jailer, former ruthless police officer Muthuvel Pandian must come face-to-face with a larger threat, while handling the shame, guilt and sorrow of taking the life of his own son.",
  "JAI BHIM":"A pregnant woman from a primitive tribal community, searches desperately for her husband, who is missing from police custody. So as to find her husband and seek justice for them, as their voice, a High Court advocate rises in support. Will their battle for justice succeed?",
  "INCEPTION":"Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: inception, the implantation of another person's idea into a target's",
  "DEADPOOL AND WOLVERINE":"A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
  "EXTRACTION":"A hardened gun-for-hire's latest mission becomes a soul-searching race to survive when he's sent into Bangladesh to rescue a drug lord's kidnapped son.",
  "EXTRACTION 2":"Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: saving the imprisoned family of a ruthless gangster.",
  "LEO":"Parthiban, a cafe owner, lives with his family in Himachal Pradesh. Things take an absurd turn for him when he gets in the way of a drug cartel.",
  "777 CHARLIE":"Dharma is stuck in a rut with his negative and lonely lifestyle and spends each day in the comfort of his loneliness. A pup named Charlie who is naughty and energetic which is a complete contrast with the Dharma’s character enters his life and gives him a new perspective towards it.",
  "HOWL":"When passengers on a train are attacked by a creature, they must band together in order to survive until morning.",
  "VAAZHA":"Four friends deemed 'losers' face immense pressure from parents and society upon entering adulthood. Their emotional tale sees them embark on a journey of self-discovery and acceptance, where love ultimately triumphs over judgment.",
  "MAAVEERAN":"After a head injury, cowardly newspaper cartoonist Sathya hears a voice in his mind, foretells events and puts him in precarious situations and forces him to take on a corrupt politician.",
  "FORD VS FERRARI":"American car designer Carroll Shelby and the British-born driver Ken Miles work together to battle corporate interference, the laws of physics, and their own personal demons to build a revolutionary race car for Ford Motor Company and take on the dominating race cars of Enzo Ferrari at the 24 Hours of Le Mans in France in 1966.",
  "PUSHPA THE RISE":"As Pushpa, a labourer, rises in the world of red sandalwood smuggling, he ends up making many enemies. However, violence ensues when the police try to topple his illegal business.",
  "3 IDIOTS":"Rascal. Joker. Dreamer. Genius... You've never met a college student quite like Rancho. From the moment he arrives at India's most prestigious university, Rancho's outlandish schemes turn the campus upside down—along with the lives of his two newfound best",
  "NOBODY":"Hutch Mansell, a suburban dad, overlooked husband, nothing neighbor — a nobody. When two thieves break into his home one night, Hutch's unknown long-simmering rage is ignited and propels him on a brutal path that will uncover dark secrets he fought to leave behind.",
  "THE RAID":"Deep in the heart of Jakarta's slums lies an impenetrable safe house for the world's most dangerous killers and gangsters. Until now, the run-down apartment block has been considered untouchable to even the bravest of police. Cloaked under the cover of pre-dawn darkness and silence, an elite swat team is tasked with raiding the safe house in order to take down the notorious drug lord that runs it. But when a chance encounter with a spotter blows their cover and news of their assault reaches the drug lord, the building's lights are cut and all the exits blocked. Stranded on the sixth floor with no way out, the unit must fight their way through the city's worst to survive their mission. Starring Indonesian martial arts sensation Iko Uwais.",
  "THE RAID 2":"After fighting his way through an apartment building populated by an army of dangerous criminals and escaping with his life, SWAT team member Rama goes undercover, joining a powerful Indonesian crime syndicate to protect his family and uncover corrupt members of his own force.",
  "KUMBALANGI NIGHTS":"Four brothers living in the fishing hamlet of Kumbalangi share a love-hate relationship with each other. Their relationship progresses when Saji, Boney and Franky decide to help Bobby stand by his love.",
  "JERSEY":"After his career fails to take off, a gifted cricketer in his mid-thirties decides that he’s not ready to give up quite yet.",
  "MEIYAZHAGAN":"Twenty-two years after losing his home, Arulmozhi Varman returns to his native Thanjavur to attend his cousin's wedding. Amidst the celebrations, Arul is reintroduced to an upbeat man whom he cannot recall. With the help of the unknown man, Arul reconnects with his past.",
  "SITA RAMAM":"Afreen, a rebellious Pakistani student sets ablaze the car of an Indian in London. Angered Afreen returns to Pakistan to ask for money from her grandfather that she has to pay in a month's time as damages. However, she gets to know that he is no more and the only thing he has left for her is a letter-delivering task, written by Ram to Sita. As Afreen sets out to find Ram, there begins her journey of discovering the secret behind the 20-year-old letter.",
  "HI NANNA":"Six-year-old Mahi, a spirited child with cystic fibrosis, shares a deep yet complex bond with her father, Viraj, a dedicated single parent and successful fashion photographer. Her curiosity about her absent mother leads to a journey of discovery when she runs away with her loyal dog, Pluto. A chance encounter with a kind woman named Yashna sparks unexpected revelations, intertwining their lives in ways they never anticipated. Set against a backdrop of love, sacrifice, and redemption, Mahi’s story is a heartfelt exploration of family, resilience, and the enduring power of connection.",
  "SUPER DELUXE":"An unfaithful newly-wed wife, an estranged parent, a priest and an angry son suddenly find themselves in the most unexpected predicaments, each poised to experience their destiny, all on one fateful day.",
  "F1":"Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.",
  
  
  
  "BAHUBALI 2":"When Mahendra, the son of Bāhubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
  "SQUID GAME":"Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
  "THE WALKING DEAD":"Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
  "FROM":"Unravel the mystery of a nightmarish town in middle America that traps all those who enter. As the unwilling residents fight to keep a sense of normalcy and search for a way out, they must also survive the threats of the surrounding forest – including the terrifying creatures that come out when the sun goes down.",
  "MONEY HEIST":"To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose. Five months of seclusion - memorizing every step, every detail, every probability - culminate in eleven days locked up in the National Coinage and Stamp Factory of Spain, surrounded by police forces and with dozens of hostages in their power, to find out whether their suicide wager will lead to everything or nothing.",
  "PEAKY BLINDER":"After his estranged son gets embroiled in a Nazi plot, self-exiled gangster Tommy Shelby must return to Birmingham to save his family — and his nation.",
  "CHERNOBYL":"The true story of one of the worst man-made catastrophes in history: the catastrophic nuclear accident at Chernobyl. A tale of the brave men and women who sacrificed to save Europe from unimaginable disaster.",
  "THE BOYS":"A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
  "SUZHALAL THE VERTEX":"A minor girl goes missing in a small town in Tamilnadu and an investigation follows. A sub inspector investigating a missing girl's case in a uncovers some shocking revelations and dirty truths those threaten to shake up the cultural societal fabric.",
  "KUTTRAM PURINDHAVAN":"In a small-town, when a girl goes missing, Retiree Baskaran takes extreme measures to protect his grandson, Esther is consumed by guilt, and powerless constable Gautham races to find the truth. Secrets surface, leading to an uneasy alliance between Baskaran and Gautham, to a final showdown, justice is served, but guilt leaves some with closure and others haunted.",
  "HEART BEAT":"RK Multispeciality Hospital is a beacon of hope and healing. Its doctors are resilient even when they have to deal with medical and personal challenges.",
  "NADUCENTER":"They fight, they fall, they rise... together!",
  "AFSOS":"Nakul's only goal in life is to finish it. After several failed suicide attempts, he pays for his own death. Upadhyay, a deadly assassin is assigned to get the job done. But Nakul has a change of heart. He chooses to live, however Upadhyay never leaves a job undone. An riveting cat and mouse chase ensues while a divine intervention flips everything upside down in this black comedy thriller.",
  "12 MONKEYS":"The provocative story of Cole, a time traveler from a decimated future in a high-stakes race against the clock. Utilizing a dangerous and untested method of time travel, he journeys from 2043 to the present day on a mission to locate and eradicate the source of a deadly plague that will all but annihilate the human race.",
  "OFFICE":"Two types of work ethics clash when analogue meets digital in a rural government workplace, propelling the mundane to hilarious.",
  "FARZI":"Sunny, a brilliant small-time artist is catapulted into the high-stakes world of counterfeiting when he creates the perfect fake currency note, even as Michael, a fiery, unorthodox task force officer wants to rid the country of the counterfeiting menace. In this thrilling cat-and-mouse race, losing is not an option!",
  "SCAM 1992":"Set in 1980's & 90's Bombay, Scam 1992 follows the life of Harshad Mehta - a stockbroker who single-handedly took the stock market to dizzying heights & his catastrophic downfall. Being directed by National Award-winning filmmaker Hansal Mehta, the series is based on journalist Debashis Basu & Sucheta Dalal's book The Scam.",

};

const pageInfo = {
  movie: {
    title: "Movies",
    copy: "Big-screen action, fantasy, horror, and blockbuster picks collected in one cinematic row.",
    hero: "url(https://images.hdqwalls.com/download/the-long-walk-movie-bb-1920x1080.jpg)"
  },
  tv: {
    title: "TV Shows",
    copy: "Binge-ready series, dramatic worlds, and fan-favorite stories made for one more episode.",
    hero: "url(https://images.hdqwalls.com/download/dune-paul-on-arrakis-mv-1920x1080.jpg)"
  },
  kids: {
    title: "Kids",
    copy: "Bright adventures, animated favorites, and easy family picks for a lighter watch.",
    hero: "url(https://images.hdqwalls.com/download/how-to-train-your-dragon-2025-1m-1920x1080.jpg)"
  }
};

function getSectionKey() {
  const title = document.title.toLowerCase();
  if (title.includes("kid")) return "kids";
  if (title.includes("tv")) return "tv";
  return "movie";
}

function enhancePageChrome() {
  const section = getSectionKey();
  const info = pageInfo[section];
  const nav = document.createElement("nav");
  nav.className = "catalog-nav";
  nav.innerHTML = `
    <a class="catalog-brand" href="index.html">MOVIEFLIX</a>
    <div class="catalog-links">
      <a href="index.html">Home</a>
      <a href="Movies.html" class="${section === "movie" ? "active" : ""}">Movies</a>
      <a href="TV SHOWS.html" class="${section === "tv" ? "active" : ""}">TV Shows</a>
      <a href="kids.html" class="${section === "kids" ? "active" : ""}">Kids</a>
      <a href="login.htm">Login</a>
    </div>
  `;

  const hero = document.createElement("section");
  hero.className = "catalog-hero";
  hero.style.setProperty("--hero-image", info.hero);
  hero.innerHTML = `<div><h1>${info.title}</h1><p>${info.copy}</p></div>`;

  document.body.prepend(hero);
  document.body.prepend(nav);

  document.body.querySelectorAll("h1").forEach((heading) => {
    if (!hero.contains(heading)) {
      heading.remove();
    }
  });
}

enhancePageChrome();

function initSectionSearch() {
  const section = getSectionKey();
  const info = pageInfo[section];
  const gallery = document.querySelector(".gallery");
  const posters = Array.from(document.querySelectorAll(".poster"));

  if (!gallery || !posters.length) {
    return;
  }

  const searchPanel = document.createElement("section");
  searchPanel.className = "catalog-search-panel";
  searchPanel.innerHTML = `
    <label class="catalog-search" for="catalogSectionSearch">
      <span class="catalog-search-icon" aria-hidden="true"></span>
      <input id="catalogSectionSearch" type="search" autocomplete="off" placeholder="Search ${info.title}">
    </label>
    <p class="catalog-search-count" id="catalogSearchCount">${posters.length} titles available</p>
  `;

  gallery.before(searchPanel);

  const input = searchPanel.querySelector("#catalogSectionSearch");
  const count = searchPanel.querySelector("#catalogSearchCount");
  const empty = document.createElement("div");
  empty.className = "catalog-empty-search";
  empty.textContent = "No titles found. Try another search.";
  gallery.after(empty);

  function searchableText(poster) {
    const title = poster.querySelector(".title")?.textContent || "";
    const alt = poster.querySelector("img")?.alt || "";
    return `${title} ${alt}`.toLowerCase();
  }

  function applySearch() {
    const query = input.value.trim().toLowerCase();
    let visibleCount = 0;

    posters.forEach((poster) => {
      const isMatch = !query || searchableText(poster).includes(query);
      poster.classList.toggle("catalog-hidden", !isMatch);
      if (isMatch) {
        visibleCount += 1;
      }
    });

    count.textContent = query
      ? `${visibleCount} result${visibleCount === 1 ? "" : "s"} found`
      : `${posters.length} titles available`;
    empty.classList.toggle("active", visibleCount === 0);
  }

  input.addEventListener("input", applySearch);
}

initSectionSearch();

const modal = document.createElement("div");
modal.className = "catalog-modal";
modal.innerHTML = `
  <div class="catalog-dialog" role="dialog" aria-modal="true" aria-labelledby="catalogTitle">
    <div class="catalog-art">
      <img id="catalogPoster" src="" alt="">
    </div>
    <section class="catalog-info">
      <button class="catalog-close" type="button" aria-label="Close details">&times;</button>
      <p class="catalog-kicker" id="catalogType">Movie</p>
      <h2 class="catalog-title" id="catalogTitle"></h2>
      <div class="catalog-meta">
        <span id="catalogYear">2026</span>
        <span id="catalogQuality">HD</span>
        <span id="catalogMood">Top pick</span>
      </div>
      <p class="catalog-desc" id="catalogDesc"></p>
      <div class="catalog-actions">
        <a class="catalog-watch" id="catalogWatch" href="#">Watch now</a>
        <button class="catalog-trailer" id="catalogTrailer" type="button">Watch Trailer</button>
        <button class="catalog-secondary catalog-close-secondary" type="button">Not now</button>
      </div>
    </section>
  </div>
`;

document.body.appendChild(modal);

const playerModal = document.createElement("div");
playerModal.className = "catalog-player-modal";
playerModal.innerHTML = `
  <div class="catalog-player-dialog" role="dialog" aria-modal="true" aria-label="Video player">
    <button class="catalog-player-close" type="button" aria-label="Close player">&times;</button>
    <iframe id="catalogPlayerFrame" title="Movie player" allowfullscreen></iframe>
  </div>
`;

document.body.appendChild(playerModal);

const posterImage = modal.querySelector("#catalogPoster");
const titleElement = modal.querySelector("#catalogTitle");
const typeElement = modal.querySelector("#catalogType");
const descElement = modal.querySelector("#catalogDesc");
const watchButton = modal.querySelector("#catalogWatch");
const trailerButton = modal.querySelector("#catalogTrailer");
const yearElement = modal.querySelector("#catalogYear");
const qualityElement = modal.querySelector("#catalogQuality");
const moodElement = modal.querySelector("#catalogMood");
const closeButtons = modal.querySelectorAll(".catalog-close, .catalog-close-secondary");
const playerFrame = playerModal.querySelector("#catalogPlayerFrame");
const playerClose = playerModal.querySelector(".catalog-player-close");
let activeWatchUrl = "#";
let activeTmdbTitle = null;
let activeTitleText = "";

function getPageType() {
  const title = document.title.toLowerCase();
  return title.includes("tv") ? "TV Show" : "Movie";
}

function getTmdbMediaType() {
  return getSectionKey() === "tv" ? "tv" : "movie";
}

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

async function fetchTmdb(path, params) {
  const response = await fetch(tmdbUrl(path, params));
  if (!response.ok) {
    throw new Error("TMDB request failed");
  }
  return response.json();
}

function cleanTmdbQuery(title) {
  return title
    .replace(/\bTRIOLOGY\b/g, "TRILOGY")
    .replace(/\bJHON\b/g, "JOHN")
    .replace(/\bCARRABIAN\b/g, "CARIBBEAN")
    .replace(/\bSCARED GAMES\b/g, "SACRED GAMES")
    .replace(/\bTHE LOST OF US\b/g, "THE LAST OF US")
    .replace(/\bSQUIDGAME\b/g, "SQUID GAME")
    .trim();
}

function tmdbTitleName(item) {
  return item?.title || item?.name || item?.original_title || item?.original_name || "";
}

function tmdbYear(item) {
  const date = item?.release_date || item?.first_air_date;
  return date ? date.slice(0, 4) : "Year N/A";
}

function tmdbRating(item) {
  return item?.vote_average ? `TMDB ${item.vote_average.toFixed(1)}` : "TMDB N/A";
}

function tmdbGenres(item) {
  if (Array.isArray(item?.genres) && item.genres.length) {
    return item.genres.slice(0, 2).map((genre) => genre.name).join(", ");
  }
  return "Top pick";
}

async function findTmdbTitle(title) {
  const mediaType = getTmdbMediaType();
  const cacheKey = `${mediaType}:${title}`;

  if (tmdbCache.has(cacheKey)) {
    return tmdbCache.get(cacheKey);
  }

  const query = cleanTmdbQuery(title);
  const search = await fetchTmdb(`/search/${mediaType}`, {
    query,
    include_adult: "false",
    page: "1"
  });
  const match = search.results?.[0];

  if (!match) {
    tmdbCache.set(cacheKey, null);
    return null;
  }

  const details = await fetchTmdb(`/${mediaType}/${match.id}`);
  const enriched = { ...match, ...details, media_type: mediaType };
  tmdbCache.set(cacheKey, enriched);
  return enriched;
}

async function findTmdbTrailer(item) {
  if (!item?.id || !item?.media_type) {
    return null;
  }

  const videos = await fetchTmdb(`/${item.media_type}/${item.id}/videos`);
  const options = videos.results || [];
  return options.find((video) => video.site === "YouTube" && video.type === "Trailer" && video.official)
    || options.find((video) => video.site === "YouTube" && video.type === "Trailer")
    || options.find((video) => video.site === "YouTube" && /trailer|teaser/i.test(video.name));
}

function getTitle(poster) {
  const title = poster.querySelector(".title")?.textContent.trim();
  const imageAlt = poster.querySelector("img")?.alt.trim();
  return (title || imageAlt || "Featured title").toUpperCase();
}

function getDescription(title, type) {
  return detailCopy[title] || `A featured ${type.toLowerCase()} selected for your watchlist. Open the player when you are ready to start streaming.`;
}

function setFallbackDetails(title, type) {
  activeTmdbTitle = null;
  yearElement.textContent = "Year N/A";
  qualityElement.textContent = "HD";
  moodElement.textContent = "Top pick";
  descElement.textContent = getDescription(title, type);
  trailerButton.disabled = false;
  trailerButton.textContent = "Watch Trailer";
}

async function hydrateTmdbDetails(title, type) {
  trailerButton.disabled = true;
  trailerButton.textContent = "Loading trailer...";

  try {
    const tmdbTitle = await findTmdbTitle(title);
    if (!tmdbTitle || title !== activeTitleText) {
      return;
    }

    activeTmdbTitle = tmdbTitle;
    titleElement.textContent = tmdbTitleName(tmdbTitle).toUpperCase() || title;
    typeElement.textContent = tmdbTitle.media_type === "tv" ? "TV Show" : "Movie";
    yearElement.textContent = tmdbYear(tmdbTitle);
    qualityElement.textContent = tmdbRating(tmdbTitle);
    moodElement.textContent = tmdbGenres(tmdbTitle);
    descElement.textContent = tmdbTitle.overview || getDescription(title, type);
    trailerButton.disabled = false;
    trailerButton.textContent = "Watch Trailer";
  } catch (error) {
    if (title === activeTitleText) {
      trailerButton.disabled = false;
      trailerButton.textContent = "Watch Trailer";
    }
  }
}

function openDetails(event) {
  const link = event.currentTarget;
  const poster = link.closest(".poster");
  const image = link.querySelector("img");
  const title = getTitle(poster);
  const type = getPageType();

  event.preventDefault();

  posterImage.src = image.src;
  posterImage.alt = image.alt || title;
  titleElement.textContent = title;
  typeElement.textContent = type;
  activeTitleText = title;
  setFallbackDetails(title, type);
  activeWatchUrl = link.href;
  watchButton.href = "#";
  watchButton.removeAttribute("target");

  modal.classList.add("active");
  document.body.classList.add("catalog-lock");
  hydrateTmdbDetails(title, type);
}

function closeDetails() {
  modal.classList.remove("active");
  document.body.classList.remove("catalog-lock");
}

function openPlayer(event) {
  event.preventDefault();
  modal.classList.remove("active");
  playerFrame.src = activeWatchUrl;
  playerModal.classList.add("active");
  document.body.classList.add("catalog-lock");
}

async function openTrailer(event) {
  event.preventDefault();
  trailerButton.disabled = true;
  trailerButton.textContent = "Finding trailer...";

  try {
    const tmdbTitle = activeTmdbTitle || await findTmdbTitle(activeTitleText);
    const trailer = await findTmdbTrailer(tmdbTitle);

    if (!trailer?.key) {
      throw new Error("Trailer unavailable");
    }

    modal.classList.remove("active");
    playerFrame.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`;
    playerModal.classList.add("active");
    document.body.classList.add("catalog-lock");
  } catch (error) {
    trailerButton.textContent = "Trailer unavailable";
  } finally {
    trailerButton.disabled = false;
  }
}

function closePlayer() {
  playerFrame.removeAttribute("src");
  playerModal.classList.remove("active");
  document.body.classList.remove("catalog-lock");
}

document.querySelectorAll(".poster a").forEach((link) => {
  link.addEventListener("click", openDetails);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeDetails);
});

watchButton.addEventListener("click", openPlayer);
trailerButton.addEventListener("click", openTrailer);
playerClose.addEventListener("click", closePlayer);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeDetails();
  }
});

playerModal.addEventListener("click", (event) => {
  if (event.target === playerModal) {
    closePlayer();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetails();
    closePlayer();
  }
});
