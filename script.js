// var fs = require("fs");
// var wallpapers = fs.readdirSync("./wallpapers/");

const wallpapers_list = [
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/nature-wallpaper-21012223471720.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/neon-wallpaper-20070214060650.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/space-wallpaper-20082314113712.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/car-wallpaper-20072612433540.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/black-wallpaper-20091514274141.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/car-wallpaper-2007261221435.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/Wallpaper-4k-Dark-Blue-Lines-Grid-Lines-Backgrounds-P2.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/Wallpaper-4k-High-Resolution-Mac-3840x2160px-4k-Free-Dow1.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/black-wallpaper-20072315472168.jpg",
  "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/dark-wallpaper-2007281321438.jpg",
];

const n = wallpapers_list.length;

function add_wallpapers_to_html_list() {
  var bar = document.getElementById("wallpapers");

  for (let i = 0; i < n; i++) {
    //console.log(wallpapers_list[i]);
    var img = document.createElement("img");
    img.src = wallpapers_list[i];
    bar.appendChild(img);
  }
}

function hide_wallpapers() {
  var d = document.getElementById("wallpapers");

  if (d.classList.length < 2 || d.classList[1] == "animation_slide_down") {
    console.log("hidden");
    d.classList.remove("animation_slide_down");
    d.classList.add("animation_slide_up");
  } else {
    console.log("visible");
    d.classList.remove("animation_slide_up");
    d.classList.add("animation_slide_down");
  }
}

function search_google() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("+");
  url = "https://www.google.com/search?q=" + input;
  window.open(url);
}

function search_movies() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("%20");
  url =
    "https://x1337x.ws/sort-category-search/" + input + "/Movies/time/desc/1/";
  window.open(url);
}

function search_tv() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("%20");
  url = "https://x1337x.ws/sort-category-search/" + input + "/TV/size/desc/1/";
  window.open(url);
}

function search_games() {
  var input = document.getElementsByClassName("searchTerm")[0].value;
  input = input.split(" ").join("%20");
  url =
    "https://x1337x.ws/sort-category-search/" + input + "/Games/time/desc/1/";
  window.open(url);
}

function enter_handler(event) {
  if (event.key == "Enter") {
    search_google();
  }
}
