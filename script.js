let wallpapers_list = [
  {
    file: "car-wallpaper-20072612433540.jpg",
    title: "Anime",
  },
  {
    file: "neon-wallpaper-20070214060650.jpg",
    title: "Neon",
  },
  {
    file: "Wallpaper-4k-High-Resolution-Mac-3840x2160px-4k-Free-Dow1.jpg",
    title: "Abstract",
  },
  {
    file: "nature-wallpaper-21012223471720.jpg",
    title: "Nature",
  },
  {
    file: "space-wallpaper-20082314113712.jpg",
    title: "Space",
  },
  {
    file: "car-wallpaper-2007261221435.jpg",
    title: "Night",
  },
  {
    file: "black-wallpaper-20072315472168.jpg",
    title: "Lucifer",
  },
  {
    file: "black-wallpaper-20091514274141.jpg",
    title: "Superheroes",
  },
  {
    file: "Wallpaper-4k-Dark-Blue-Lines-Grid-Lines-Backgrounds-P2.jpg",
    title: "Grid",
  },
];

var selected_wallpaper = wallpapers_list[1].file;

const wallpapers_url =
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/";

function set_wallpaper(fileName) {
  document.body.style.backgroundImage =
    "url(" + wallpapers_url + fileName + ")";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  selected_wallpaper = fileName;
}

function change_wallpaper(event) {
  let selection = event.target.title;
  let wallpaper = wallpapers_list.filter((item) => {
    return item.title == selection;
  })[0].file;
  set_wallpaper(wallpaper);
  highlight_set_wallpaper();
}

function highlight_set_wallpaper() {
  var available_wallpapers = document.getElementsByClassName("thumb-group");
  for (let n of available_wallpapers) {
    var thumbnail = n.getElementsByClassName("thumbnail")[0];
    var title = n.getElementsByClassName("thumb-title")[0];
    n.classList.add("animate");

    if (thumbnail.src.replace("-thumb", "").includes(selected_wallpaper)) {
      title.style.opacity = "1";
      n.classList.remove("animate");
    } else {
      title.style.opacity = "0";
      n.classList.add("animate");
    }
  }
}

function hide_wallpapers() {
  const film_roll = document.getElementById("wallpapers");
  const wrap = document.getElementById("wrap");
  if (
    film_roll.classList.length < 2 ||
    film_roll.classList[1] == "animation_slide_down"
  ) {
    film_roll.classList.remove("animation_slide_down");
    film_roll.classList.add("animation_slide_up");

    wrap.classList.remove("animation2_slide_down");
    wrap.classList.remove("startup_slide_down");
    wrap.classList.add("animation2_slide_up");
    // wrap.style.paddingTop = "0px";
  } else {
    film_roll.classList.remove("animation_slide_up");
    film_roll.classList.add("animation_slide_down");

    // wrap.style.paddingTop = "90px";
    wrap.classList.remove("animation2_slide_up");
    wrap.classList.add("animation2_slide_down");
  }
}

const ext_domain = "https://x1337x.ws/sort-category-search/";

function search_google() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  if (document.getElementsByClassName("searchTerm")[0].value != "") {
    input = input.split(" ").join("+");
    url = "https://www.google.com/search?q=" + input;
    window.open(url);
  } else {
    alert("You need to enter a search query.");
  }
}

function search_movies() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("%20");
  url = ext_domain + input + "/Movies/time/desc/1/";
  window.open(url);
}

function search_tv() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("%20");
  url = ext_domain + input + "/TV/size/desc/1/";
  window.open(url);
}

function search_games() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("%20");
  url = ext_domain + input + "/Games/time/desc/1/";
  window.open(url);
}

function search_ebooks() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("%20");
  url = ext_domain + input + "/Other/seeders/desc/1/";
  window.open(url);
}

function enter_handler(event) {
  if (event.key == "Enter") {
    search_google();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Add wallpapers to HTML
  const n = wallpapers_list.length;
  var bar = document.getElementById("wallpapers");

  for (let n of wallpapers_list) {
    var input = n.file;
    input = input.split(".").join("-thumb.");

    var thumb = document.createElement("div");
    thumb.className = "thumb-group";
    thumb.setAttribute("onclick", "change_wallpaper(event)");

    var div = document.createElement("div");
    div.innerHTML = n.title;
    div.className = "thumb-title";
    thumb.appendChild(div);

    var img = document.createElement("img");
    img.src = wallpapers_url + input;
    img.className = "thumbnail";
    img.title = n.title;
    thumb.appendChild(img);

    bar.appendChild(thumb);
  }

  set_wallpaper(selected_wallpaper);
  highlight_set_wallpaper();
});
