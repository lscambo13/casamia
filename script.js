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
var holdTimeout = null;

// BOOKMARKs -- start

let custom_bookmarks = [
  {
    link: "",
    name: "",
  },
];

function load_bookmarks() {
  custom_bookmarks = JSON.parse(localStorage.getItem("saved_bookmarks"));
  if (custom_bookmarks == null) {
    custom_bookmarks = [];
    return;
  }
  for (let n of custom_bookmarks) {
    add_bookmark_to_html(n.link, n.name);
  }
}

function add_bookmark_to_html(link, name) {
  var bookmark_container = document.getElementsByClassName(
    "flex-sub-container-horizontal"
  )[0];

  var new_bookmark = document.createElement("a");
  var i = document.createElement("span");
  new_bookmark.className = "custom_bookmark";
  new_bookmark.setAttribute("href", link);
  new_bookmark.setAttribute("onmouseenter", "remove_bookmark(event)");
  new_bookmark.setAttribute("onmouseleave", "remove_timeout(event)");
  i.textContent = name;
  new_bookmark.appendChild(i);
  bookmark_container.appendChild(new_bookmark);
}

function create_new_bookmark() {
  var link = prompt("Type link");
  if (link == null) return;
  while (!isUrlValid(link)) {
    alert("Please type a website link");
    link = prompt("Type link");
  }

  var name = prompt("Type name");
  if (name == null) return;
  if (name == "") {
    name = link.replace("www.", "");
    if (name.includes("//")) {
      name = name.split("//")[1];
    }
  }
  name = name.substring(0, 3).toUpperCase();

  if (!link.includes("http")) {
    link = "https://" + link;
  }
  add_bookmark_to_html(link, name);
  save_bookmarks(link, name);
}

function save_bookmarks(link, name) {
  custom_bookmarks.push({
    link: link,
    name: name,
  });
  localStorage.setItem("saved_bookmarks", JSON.stringify(custom_bookmarks));
}

function remove_bookmark(event) {
  if (holdTimeout != null) {
    clearTimeout(holdTimeout);
  }
  holdTimeout = setTimeout(() => {
    if (confirm("Remove this bookmark?")) {
      remove_bookmark_from_localstorage(event.target.href);
      event.target.style.display = "none";
    }
  }, 1000);
}

function remove_timeout(event) {
  clearTimeout(holdTimeout);
}

function remove_bookmark_from_localstorage(link) {
  custom_bookmarks = custom_bookmarks.filter((elem) => {
    return !link.includes(elem.link);
  });
  localStorage.setItem("saved_bookmarks", JSON.stringify(custom_bookmarks));
}

// BOOKMARKs -- end

var selected_wallpaper = localStorage.getItem("wallpaper");
if (selected_wallpaper == null) {
  selected_wallpaper = wallpapers_list[4].file;
}

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
  localStorage.setItem("wallpaper", selected_wallpaper);
}

function change_wallpaper(event) {
  event.stopPropagation();
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

function enable_blur(event) {
  event.stopPropagation();
  var checkbox_blur = document.getElementById("blur-setting");
  var overlay = document.getElementById("overlay");
  if (checkbox_blur.checked == true) {
    overlay.style.backdropFilter = "blur(1em)";
    localStorage.setItem("blur_wallpaper", "blur(1em)");
  } else {
    overlay.style.backdropFilter = "blur(0em)";
    localStorage.setItem("blur_wallpaper", "blur(0em)");
  }
}

function enable_wallpaper(event) {
  event.stopPropagation();
  var checkbox_wall = document.getElementById("wallpaper-setting");
  var overlay = document.getElementById("overlay");
  if (checkbox_wall.checked == false) {
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    localStorage.setItem("disable_wallpaper", "rgba(0, 0, 0, 0.5)");
  } else {
    overlay.style.backgroundColor = "rgb(0, 0, 0)";
    localStorage.setItem("disable_wallpaper", "rgb(0, 0, 0)");
  }
}

function load_settings() {
  var checkbox_wall = document.getElementById("wallpaper-setting");
  var checkbox_blur = document.getElementById("blur-setting");
  var overlay = document.getElementById("overlay");
  console.log("load");
  // Blur
  var blur = localStorage.getItem("blur_wallpaper");
  if (blur != null) {
    console.log("not null");

    overlay.style.backdropFilter = blur;
    if (blur == "blur(1em)") {
      console.log("blur on");
      checkbox_blur.checked = true;
    } else {
      console.log("blur off");
      checkbox_blur.checked = false;
    }
  } else {
    checkbox_blur.checked = false;
  }

  // Lights out
  var wall = localStorage.getItem("disable_wallpaper");
  if (wall != null) {
    overlay.style.backgroundColor = wall;
    if (wall != "rgba(0, 0, 0, 0.5)") {
      checkbox_wall.checked = true;
    } else {
      checkbox_wall.checked = false;
    }
  } else {
    checkbox_wall.checked = false;
  }
}

function hide_wallpapers(event, noevent = false) {
  if (!noevent) {
    event.stopPropagation();
  }

  const film_roll = document.getElementById("wallpapers");
  const wrap = document.getElementById("wrap");
  film_roll.style.display = "flex";
  if (
    film_roll.classList.length < 2 ||
    film_roll.classList[1] == "animation_slide_down"
  ) {
    film_roll.classList.remove("animation_slide_down");
    film_roll.classList.add("animation_slide_up");
    wrap.classList.remove("animation2_slide_down");
    wrap.classList.remove("startup_slide_down");
    wrap.classList.add("animation2_slide_up");
  } else {
    film_roll.classList.remove("animation_slide_up");
    film_roll.classList.add("animation_slide_down");
    wrap.classList.remove("animation2_slide_up");
    wrap.classList.add("animation2_slide_down");
    //window.open("#", "_self");
  }
}

function hide_wallpapers_alt() {
  console.log("click bg");
  const film_roll = document.getElementById("wallpapers");
  const wrap = document.getElementById("wrap");
  if (
    film_roll.classList.length == 2 &&
    film_roll.classList[1] == "animation_slide_up"
  ) {
    //window.open("#", "_self");
    film_roll.classList.remove("animation_slide_up");
    film_roll.classList.add("animation_slide_down");
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

function isUrlValid(userInput) {
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
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
  load_bookmarks();
  load_settings();
});

window.addEventListener("hashchange", () => {
  var url = document.URL;

  if (!url.includes("#wallpapers")) {
    console.log("url found");
    hide_wallpapers_alt();
  }
  console.log("go back");
});
