let wallpapers_list = [
	{
		file: "car-wallpaper-20072612433540.jpg",
		title: "Anime",
		color: "pink",
		theme: "light",
	},
	{
		file: "neon-wallpaper-20070214060650.jpg",
		title: "Neon",
		color: "pink",
		theme: "light",
	},
	{
		file: "Wallpaper-4k-High-Resolution-Mac-3840x2160px-4k-Free-Dow1.jpg",
		title: "Abstract",
		color: "earth",
		theme: "light",
	},
	{
		file: "nature-wallpaper-21012223471720.jpg",
		title: "Nature",
		color: "red",
		theme: "light",
	},
	{
		file: "space-wallpaper-20082314113712.jpg",
		title: "Space",
		color: "earth",
		theme: "light",
	},
	{
		file: "car-wallpaper-2007261221435.jpg",
		title: "Night",
		color: "yellow",
		theme: "light",
	},
	{
		file: "black-wallpaper-20072315472168.jpg",
		title: "Lucifer",
		color: "earth",
		theme: "light",
	},
	{
		file: "black-wallpaper-20091514274141.jpg",
		title: "Superheroes",
		color: "yellow",
		theme: "light",
	},
	{
		file: "Wallpaper-4k-Dark-Blue-Lines-Grid-Lines-Backgrounds-P2.jpg",
		title: "Grid",
		color: "earth",
		theme: "light",
	},
	{
		file: "desert-wallpaper-3840x2160.jpg",
		title: "Desert",
		color: "earth",
		theme: "light",
	},
	{
		file: "cute_anime_girl_2-wallpaper-3840x2160.jpg",
		title: "Anime 2",
		color: "pink",
		theme: "light",
	},
	{
		file: "bicycle_aesthetic-wallpaper-3840x2160.jpg",
		title: "Bicycle",
		color: "light-pink",
		theme: "light",
	},
	{
		file: "pink_aesthetic-wallpaper-3840x2160.jpg",
		title: "Pink",
		color: "light-pink",
		theme: "light",
	},
	{
		file: "peaceful-wallpaper-3840x2160.jpg",
		title: "Desert 2",
		color: "red",
		theme: "light",
	},
	{
		file: "coast_aerial_view_beautiful_landscape-wallpaper-3840x2160.jpg",
		title: "Beach",
		color: "green",
		theme: "light",
	},
	{
		file: "batman_car_night-wallpaper-3840x2160.jpg",
		title: "Batman",
		color: "red",
		theme: "light",
	},
	{
		file: "1440p-Wallpaper-Free-Download.jpg",
		title: "Neon 2",
		color: "pink",
		theme: "light",
	},
	{
		file: "1440p-HD-Wallpaper-Free-download.png",
		title: "Neon 3",
		color: "pink",
		theme: "light",
	},
	{
		file: "arrival_at_saturn-wallpaper-7680x4320.jpg",
		title: "Saturn",
		color: "earth",
		theme: "light",
	},
	{
		file: "HP-Wallpaper.jpg",
		title: "HP",
		color: "pink",
		theme: "light",
	},
	{
		file: "pink_desert_blue_sky-wallpaper-2880x1620.jpg",
		title: "Pink 2",
		color: "light-pink",
		theme: "light",
	},
	{
		file: "pink_sea_aesthetic-wallpaper-2880x1620.jpg",
		title: "Pink 3",
		color: "light-pink",
		theme: "light",
	},
	{
		file: "bay_10-wallpaper-3840x2160.jpg",
		title: "Beach 2",
		color: "green",
		theme: "light",
	},
	{
		file: "pink_umbrellas-wallpaper-5120x2880.jpg",
		title: "Umbrellas",
		color: "pink",
		theme: "light",
	},
	{
		file: "peter_morales-wallpaper-3840x2160.jpg",
		title: "Spiderman",
		color: "red",
		theme: "light",
	},
	{
		file: "miles_morales_night_spark-wallpaper-3840x2160.jpg",
		title: "Spiderman 2",
		color: "yellow",
		theme: "light",
	},
	{
		file: "pastel_macarons_aesthetic-wallpaper-5120x2880.jpg",
		title: "Macarons",
		color: "light-pink",
		theme: "light",
	},
	{
		file: "billie_eilish-wallpaper-5120x2880.jpg",
		title: "Billie Eilish",
		color: "earth",
		theme: "light",
	},
];

const wallpapers_url = "./wallpapers/";
// "https://github.com/lscambo13/my-home-page/raw/main/wallpapers/";

// BOOKMARKs -- start

let custom_bookmarks = [
	{
		link: "",
		name: "",
		id: 0,
	},
];

function load_bookmarks() {
	custom_bookmarks = JSON.parse(localStorage.getItem("saved_bookmarks"));
	if (custom_bookmarks == null) {
		custom_bookmarks = [];
		return;
	}
	for (let n of custom_bookmarks) {
		add_bookmark_to_html(n.link, n.name, n.id);
	}
}

function add_bookmark_to_html(link, name, id) {
	var bookmark_container = document.getElementsByClassName(
		"flex-sub-container-horizontal"
	)[0];

	var new_bookmark = document.createElement("a");
	var i = document.createElement("span");
	var d = document.createElement("div");
	new_bookmark.setAttribute("onclick", "display_loading(event)");
	new_bookmark.className = "custom_bookmark";
	new_bookmark.setAttribute("href", link);
	new_bookmark.setAttribute("id", id);
	// new_bookmark.setAttribute("onmouseenter", "remove_bookmark(event)");
	// new_bookmark.setAttribute("onmouseleave", "remove_timeout(event)");
	i.textContent = name;
	i.className = "custom_link_name";
	d.innerHTML = "&#215;";
	d.classList.add("cross");
	d.setAttribute("onclick", "remove_bookmark(event)");
	new_bookmark.appendChild(i);
	new_bookmark.appendChild(d);
	bookmark_container.appendChild(new_bookmark);
}

function save_bookmarks(link, name, id) {
	custom_bookmarks.push({
		link: link,
		name: name,
		id: id,
	});
	localStorage.setItem("saved_bookmarks", JSON.stringify(custom_bookmarks));
}

function remove_bookmark_from_localstorage(id) {
	custom_bookmarks = custom_bookmarks.filter((elem) => {
		return id != elem.id;
	});
	localStorage.setItem("saved_bookmarks", JSON.stringify(custom_bookmarks));
}

// BOOKMARKs -- end

var selected_wallpaper = localStorage.getItem("wallpaper");
if (selected_wallpaper == null) {
	selected_wallpaper = wallpapers_list[4].file;
	// var color = wallpapers_list[4].color;
}
var color = wallpapers_list.filter((item) => {
	return item.file == selected_wallpaper;
})[0].color;

function set_wallpaper(fileName, color) {
	selected_wallpaper = fileName;
	var glow_color = color;
	var overlay = document.getElementById("overlay");
	console.log("test " + overlay.style.backdropFilter);
	overlay.style.backdropFilter = "blur(1em)";
	var temp = new Image();
	temp.src = wallpapers_url + fileName;
	temp.onload = (e) => {
		apply_wallpaper(selected_wallpaper);
		localStorage.setItem("wallpaper", selected_wallpaper);
		loadBlur();
	};

	change_glow(glow_color);
	var input_thumb = fileName.split(".").join("-thumb.");
	apply_wallpaper(input_thumb);
}

function apply_wallpaper(input) {
	document.body.style.backgroundImage = "url(" + wallpapers_url + input + ")";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundSize = "cover";
	document.body.style.backgroundAttachment = "fixed";
	document.body.style.backgroundPosition = "center";
}

function change_glow(color, opacity) {
	var glow_overlay = document.getElementById("gradient_overlay");
	var wallpapers_roll_overlay = document.getElementById("wallpapers");
	var glow_setting = localStorage.getItem("glow");
	if (opacity != null) {
		if (glow_setting != "1") glow_overlay.style.opacity = opacity;
	}
	if (color != null) {
		wallpapers_roll_overlay.style.background = `var(--${color}-gradient)`;
		glow_overlay.style.background = `var(--${color}-gradient)`;
	}
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

function loadLabs() {
	// Labs
	var checkbox_labs = document.getElementById("labs-setting");
	var labs_div = document.getElementById("labs");

	var labs = localStorage.getItem("labs");
	if (labs != null) {
		labs_div.style.display = labs;
		if (labs == "block") {
			checkbox_labs.checked = true;
		} else {
			checkbox_labs.checked = false;
		}
	} else {
		checkbox_labs.checked = false;
	}
}

function loadLights() {
	// Lights out
	var checkbox_wall = document.getElementById("wallpaper-setting");
	var overlay = document.getElementById("overlay");

	var wall = localStorage.getItem("disable_wallpaper");
	if (wall != null) {
		overlay.style.backgroundColor = wall;
		if (wall != "rgba(0, 0, 0, 0.375)") {
			checkbox_wall.checked = true;
		} else {
			checkbox_wall.checked = false;
		}
	} else {
		checkbox_wall.checked = false;
	}
}

function loadBlur() {
	// Blur
	var checkbox_blur = document.getElementById("blur-setting");
	var overlay = document.getElementById("overlay");

	var blur = localStorage.getItem("blur_wallpaper");
	if (blur != null) {
		overlay.style.backdropFilter = blur;
		if (blur == "blur(1em)") {
			checkbox_blur.checked = true;
		} else {
			checkbox_blur.checked = false;
		}
	} else {
		checkbox_blur.checked = false;
		overlay.style.backdropFilter = "blur(0em)";
	}
}

function load_settings() {
	loadBlur();
	loadLights();
	loadLabs();
}

function toggle_remove_indicators(visible) {
	var custom_bookmark = document.getElementsByClassName("custom_bookmark");
	var cross = document.getElementsByClassName("cross");
	var n = custom_bookmark.length;
	switch (visible) {
		case "show": {
			for (var i = 0; i < n; i++) {
				custom_bookmark[i].classList.add("removable");
				cross[i].style.display = "block";
			}
			break;
		}
		case "hide": {
			for (var i = 0; i < n; i++) {
				custom_bookmark[i].classList.remove("removable");
				cross[i].style.display = "none";
			}
			break;
		}
	}
}

var previous_click = null;
function hide_loading() {
	if (previous_click) {
		previous_click.classList.toggle("loader");
	}
	previous_click = null;
}
function display_loading(event) {
	// element.stopPropagation();
	event.preventDefault();
	hide_loading();

	var click = event.target;
	previous_click = click;

	click.classList.toggle("loader");
}

function isUrlValid(userInput) {
	var res = userInput.match(
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
	);
	if (res == null) return false;
	else return true;
}

function download_bookmarks_plain(filename, text) {
	var element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function download_wallpaper(filename, text) {
	var element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

// User interactable click events ---

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
	var id = Date.now();

	add_bookmark_to_html(link, name, id);
	save_bookmarks(link, name, id);
}

function remove_bookmark(event) {
	event.preventDefault();
	console.log("click " + event.target.parentNode.id);
	event.stopPropagation();
	if (confirm("Remove this bookmark?")) {
		remove_bookmark_from_localstorage(event.target.parentNode.id);
		event.target.parentNode.style.display = "none";
		//event.target.style.display = "none";
	}
	return;
}

function change_wallpaper(event) {
	event.stopPropagation();
	let selection = event.target.title;
	var wall = get_wallpaper_details(selection);
	set_wallpaper(wall[0], wall[1]);
	highlight_set_wallpaper();
}

function get_wallpaper_details(title) {
	let wallpaper = wallpapers_list.filter((item) => {
		return item.title == title;
	})[0].file;
	let color = wallpapers_list.filter((item) => {
		return item.title == title;
	})[0].color;
	return [wallpaper, color];
}

function hide_wallpapers(event, noevent = false) {
	if (!noevent) {
		event.stopPropagation();
	}
	hide_loading();

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
		change_glow(null, 1);
		toggle_remove_indicators("show");
	} else {
		film_roll.classList.remove("animation_slide_up");
		film_roll.classList.add("animation_slide_down");
		wrap.classList.remove("animation2_slide_up");
		wrap.classList.add("animation2_slide_down");
		//window.open("#", "_self");
		change_glow(null, 0);

		toggle_remove_indicators("hide");
	}
}

function toggle_blur(event) {
	//event.stopPropagation();
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

function toggle_wallpaper(event) {
	event.stopPropagation();
	var checkbox_wall = document.getElementById("wallpaper-setting");
	var overlay = document.getElementById("overlay");
	if (checkbox_wall.checked == false) {
		overlay.style.backgroundColor = "rgba(0, 0, 0, 0.375)";
		localStorage.setItem("disable_wallpaper", "rgba(0, 0, 0, 0.375)");
	} else {
		overlay.style.backgroundColor = "rgb(0, 0, 0)";
		localStorage.setItem("disable_wallpaper", "rgb(0, 0, 0)");
	}
}

function toggle_dim(event) {
	event.stopPropagation();
	var checkbox_wall = document.getElementById("dim-setting");
	var overlay = document.getElementById("overlay");
	if (checkbox_wall.checked == false) {
		overlay.style.backgroundColor = "rgba(0, 0, 0, 0.375)";
		localStorage.setItem("dim_wallpaper", "rgba(0, 0, 0, 0.375)");
	} else {
		overlay.style.backgroundColor = "rgb(0, 0, 0, 0.25)";
		localStorage.setItem("dim_wallpaper", "rgb(0, 0, 0, 0.25)");
	}
}

function hide_wallpapers_alt() {
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
		toggle_remove_indicators("hide");
		change_glow(null, 0);
	}
}

function enter_handler(event) {
	if (event.key == "Enter") {
		search.default();
	}
}

function toggle_labs(event) {
	event.stopPropagation();
	var checkbox_labs = document.getElementById("labs-setting");
	var labs_div = document.getElementById("labs");

	if (checkbox_labs.checked == true) {
		labs_div.style.display = "block";
		localStorage.setItem("labs", "block");
	} else {
		labs_div.style.display = "none";
		localStorage.setItem("labs", "none");
	}
}

function export_bookmarks(event) {
	event.stopPropagation();
	var bookmarks_string = localStorage.saved_bookmarks;
	var d = new Date();
	download_bookmarks_plain(
		`home-page-bookmarks-${d.getFullYear()}-${
			d.getMonth() + 1
		}-${d.getDate()}.json`,
		bookmarks_string
	);
}

function wait(ms) {
	var now = Date.now();
	var end = now + ms;
	while (now < end) {
		now = Date.now();
	}
}

function import_bookmarks(event) {
	event.stopPropagation();
	var file = event.target.files[0].text();

	function result(file) {
		var imported_bookmarks = JSON.parse(file);
		var ids = [];

		for (let bookmark of custom_bookmarks) {
			ids.push(bookmark.id);
		}

		for (let i of imported_bookmarks) {
			if (ids.includes(i.id)) {
				wait(1);
				i.id = Date.now();
			}
			ids.push(i.id);
			save_bookmarks(i.link, i.name, i.id);
		}

		window.location.reload();
	}

	file.then(result);
}

function reset_bookmarks(event) {
	if (
		confirm(
			"This will reset bookmarks.\nMake sure you have a backup to import later on.\n\nAre you sure?"
		)
	) {
		localStorage.removeItem("saved_bookmarks");
		window.location.reload();
	}
}

function reset_all(event) {
	if (
		confirm(
			"This will reset everything.\nThere is no going back.\n\nAre you sure?"
		)
	) {
		localStorage.clear();
		window.location.reload();
	}
}

function download_wallpaper() {
	console.log(wallpapers_url + selected_wallpaper);
	var element = document.createElement("a");
	element.setAttribute("href", wallpapers_url + selected_wallpaper);
	element.setAttribute("download", selected_wallpaper);
	element.style.display = "none";
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
	/* alert(
    "If the download doesn't start, disable the pop-up blocker extensions."
  ); */
}

function toggle_favicons(event) {
	// http://www.google.com/s2/favicons?domain=google.com
	var custom_bookmarks = document.getElementsByClassName("custom_bookmark");
	var spans = document.getElementsByClassName("custom_link_name");

	for (let i = 0; i < custom_bookmarks.length; i++) {
		spans[i].style.display = "none";

		var new_icon = document.createElement("img");
		new_icon.className = "ext_favicon";
		var domain = custom_bookmarks[i].href;
		new_icon.src =
			"http://www.google.com/s2/favicons?sz=32&domain=" + domain;
		custom_bookmarks[i].appendChild(new_icon);
	}
}

function toggle_glow() {
	var gradient_overlay = document.getElementById("gradient_overlay");
	var glow = localStorage.getItem("glow");
	if (glow == null || glow == "0") {
		glow = "1";
		gradient_overlay.style.opacity = 1;
		localStorage.setItem("glow", "1");
	} else if (glow == "1") {
		glow = "0";
		gradient_overlay.style.opacity = 0;
		localStorage.setItem("glow", "0");
	}
}

// Event Listeners ---

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
	load_settings();
	set_wallpaper(selected_wallpaper, color);
	highlight_set_wallpaper();
	load_bookmarks();

	// Make the DIV element draggable:
	dragElement(document.getElementById("labs"));
});

window.addEventListener("hashchange", () => {
	var url = document.URL;

	if (!url.includes("#wallpapers")) {
		console.log("url found");
		hide_wallpapers_alt();
	}
	console.log("go back");
});

window.addEventListener("wheel", function (e) {
	var item = document.getElementById("wallpapers");
	if (e.deltaY > 0) {
		if (item.classList[1] == "animation_slide_up") item.scrollLeft += 100;
	} else {
		if (item.classList[1] == "animation_slide_up") item.scrollLeft -= 100;
	}
});

// Classes ---

class utils {
	static getSearchTerm() {
		return document.getElementsByClassName("searchTerm")[0];
	}
}

class search {
	constructor() {}
	static ext_domain = "https://x1337x.ws/sort-category-search/";
	static default_domain = "https://www.google.com/search?q=";
	static x1337x = "https://x1337x.ws/home/";

	static default = function () {
		var input = utils.getSearchTerm().value;
		if (input != "") {
			input = input.split(" ").join("+");
			var url = search.default_domain + input;
			window.open(url);
		} else {
			alert("You need to enter a search query.");
		}
	};

	static movies = function () {
		var input = utils.getSearchTerm().value;
		if (input != "") {
			input = input.split(" ").join("%20");
			var url = search.ext_domain + input + "/Movies/time/desc/1/";
			window.open(url);
		} else {
			alert("You need to enter a search query.");
		}
	};

	static tv = function () {
		var input = utils.getSearchTerm().value;
		if (input != "") {
			input = input.split(" ").join("%20");
			var url = search.ext_domain + input + "/TV/size/desc/1/";
			window.open(url);
		} else {
			alert("You need to enter a search query.");
		}
	};

	static games = function () {
		var input = utils.getSearchTerm().value;
		if (input != "") {
			input = input.split(" ").join("%20");
			var url = search.ext_domain + input + "/Games/time/desc/1/";
			window.open(url);
		} else {
			alert("You need to enter a search query.");
		}
	};
	static ebooks() {
		var input = utils.getSearchTerm().value;
		if (input != "") {
			input = input.split(" ").join("%20");
			var url = search.ext_domain + input + "/Other/seeders/desc/1/";
			window.open(url);
		} else {
			alert("You need to enter a search query.");
		}
	}
}

// Objects ---

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "header").onmousedown =
			dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + "px";
		elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
