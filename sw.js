if (!self.define) { let e, a = {}; const l = (l, p) => (l = new URL(l + ".js", p).href, a[l] || new Promise((a => { if ("document" in self) { const e = document.createElement("script"); e.src = l, e.onload = a, document.head.appendChild(e) } else e = l, importScripts(l), a() })).then((() => { let e = a[l]; if (!e) throw new Error(`Module ${l} didn’t register its module`); return e }))); self.define = (p, r) => { const b = e || ("document" in self ? document.currentScript.src : "") || location.href; if (a[b]) return; let s = {}; const c = e => l(e, b), i = { module: { uri: b }, exports: s, require: c }; a[b] = Promise.all(p.map((e => i[e] || c(e)))).then((e => (r(...e), s))) } } define(["./workbox-88c87e7e"], (function (e) { "use strict"; self.addEventListener("message", (e => { e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting() })), e.precacheAndRoute([{ url: "casamia/animations.css", revision: "c8eb7ab5331b36c1ebab8ccffb7955f8" }, { url: "casamia/custom_bookmarks_sample/home-page-bookmarks-2023-1-23.json", revision: "85f0b2c5f296f9440c29b3305e9dc771" }, { url: "casamia/favicon_io.zip", revision: "105c413d69ade9c75d1ea2f232b78a99" }, { url: "casamia/favicon.ico", revision: "41ac07922adedd6b725488b5d66963c9" }, { url: "casamia/icons.css", revision: "101fbbb5088ae1b886abc95e626d0836" }, { url: "casamia/icons/android-chrome-192x192.png", revision: "44512d3aa6e2a34932356b94b2ae9e32" }, { url: "casamia/icons/android-chrome-512x512.png", revision: "ee9ab295a7c4ca4fa8837b67cdcd1a67" }, { url: "casamia/icons/apple-touch-icon.png", revision: "8f882078d675ac979c30b68e87fb09ba" }, { url: "casamia/icons/bing.svg", revision: "fc257c80aea8e6c979587933bbeaa005" }, { url: "casamia/icons/favicon-16x16.png", revision: "ef80d010a6cee9d73c04c5bcd68a311e" }, { url: "casamia/icons/favicon-32x32.png", revision: "8c841101c792ce6ea08bb4d5786325b6" }, { url: "casamia/icons/maskable_icon_x128.png", revision: "d1760ead3582d743f3c83307d9d3d219" }, { url: "casamia/icons/maskable_icon_x192.png", revision: "d6e5df9af440f30d4b65f97bace1622b" }, { url: "casamia/icons/maskable_icon_x384.png", revision: "6a6a2af731bb494df6cf2836371c5df4" }, { url: "casamia/icons/maskable_icon_x48.png", revision: "a2fadf3fb59907c9f83237c4c1bd7dda" }, { url: "casamia/icons/maskable_icon_x512.png", revision: "57401369771b79923eed0765e064d998" }, { url: "casamia/icons/maskable_icon_x72.png", revision: "766206cef5d647433a1cb55521b66c05" }, { url: "casamia/icons/maskable_icon_x96.png", revision: "2f296f3980aa272b704891146be1821c" }, { url: "casamia/icons/maskable_icon.png", revision: "f001b02a86e6f918a788f8649ef15860" }, { url: "casamia/icons/question-mark.png", revision: "7961d479dc5428b3c0c73cc0fe85bdb5" }, { url: "casamia/icons/Sad-Anime-Girl-PNG-Image-Background.png", revision: "420610afda81b34817af3bb765654ac5" }, { url: "casamia/icons/warning_notice_error-512.png", revision: "b1c99b2cde820f1d9c8eab69671d0e85" }, { url: "casamia/index.html", revision: "399ae97c7f835686d62ba1d5ac3495ee" }, { url: "casamia/index.js", revision: "60d783b0e7507dfe30e5c0c4b6e4306b" }, { url: "casamia/js_modules/cli.js", revision: "3097fab2b0e55ed52ef1cf417e61f093" }, { url: "casamia/js_modules/colors.js", revision: "839a48c2c49c619bd65f6b6c06e8474c" }, { url: "casamia/js_modules/constants.js", revision: "c9a2a65fda7eeafa76c2542e6d567451" }, { url: "casamia/js_modules/custom_bookmarks.js", revision: "99b23e977d0f87f8272d8628b0213ed6" }, { url: "casamia/js_modules/database.js", revision: "c2c058ceb76a75be48bfb46f8fb72df0" }, { url: "casamia/js_modules/load_preferences.js", revision: "e25bb49b181003748c50a3c01e714c66" }, { url: "casamia/js_modules/loading_spinner.js", revision: "7a4bc0db2292c0116b72910e3e94d705" }, { url: "casamia/js_modules/modals/advanced_settings.js", revision: "07efb1b2031a5ea118c3deb714b7f166" }, { url: "casamia/js_modules/onboarding.js", revision: "1c8e6470facbcb1fdbe70a42ae5fda37" }, { url: "casamia/js_modules/preferences.js", revision: "e1edccf18f07f6d1cfaadd4bf5206ba2" }, { url: "casamia/js_modules/save_preferences.js", revision: "335901ebeef12175b239e298bb1033bc" }, { url: "casamia/js_modules/search.js", revision: "2c2338bfed7669c916bb6520f77f0f2f" }, { url: "casamia/js_modules/strings.js", revision: "d428bc9ac90e40bfd688bf52ce92d22b" }, { url: "casamia/js_modules/styles.js", revision: "436f4a1c365e48d1075092aec41fd85e" }, { url: "casamia/js_modules/utils.js", revision: "83758bd0d5fdebfd15f9a5aa2648aafb" }, { url: "casamia/js_modules/utils/addZero.js", revision: "cc0806eaa8bcee4cce76b14272f558ad" }, { url: "casamia/js_modules/utils/displayCarouselAnimation.js", revision: "b97d6dd2c689b681709a5c102570f689" }, { url: "casamia/js_modules/utils/downloadFile.js", revision: "741df5bdcb8005ec5484700b78b82a30" }, { url: "casamia/js_modules/utils/dragElement.js", revision: "d9a96db3eb0c72f405fddb94ca0f7c0e" }, { url: "casamia/js_modules/utils/redoOnboarding.js", revision: "634aee03aa09ecee33ef0aab21c602bf" }, { url: "casamia/js_modules/utils/scrollPosition.js", revision: "b90f3e695babb1d7ab8fe34c35be4bc8" }, { url: "casamia/js_modules/utils/wait.js", revision: "85380e4cb75e456fda84c169635827ee" }, { url: "casamia/js_modules/validators.js", revision: "f5b0a257acf8ca3575339f26b5db19e5" }, { url: "casamia/js_modules/wallpapers.js", revision: "65ebfd8987b4533b29cb4c34a25302e7" }, { url: "casamia/jsconfig.json", revision: "f2cd63b1cb6070a38f4979ec42011a0a" }, { url: "casamia/manifest.json", revision: "5e919209bfd3227ead3645231a0ac7c1" }, { url: "casamia/package-lock.json", revision: "aa48c77273b94041596ca67fbb4afe40" }, { url: "casamia/package.json", revision: "4378076ee357981d77e4772c27c7c52c" }, { url: "casamia/pages/error/index.html", revision: "b42e6b4ce49a07da2e5f2a84ce9c8834" }, { url: "casamia/pages/error/style.css", revision: "ba2adaf511d2affe9d04a31c6d34f0d8" }, { url: "casamia/pages/help/index.html", revision: "68203bdbc844d49dd8e64cb4d9238bf7" }, { url: "casamia/pages/help/style.css", revision: "2fc3f74eb0d29df976c00d5b268173c2" }, { url: "casamia/README.md", revision: "ffd627ea642b797ee36803736a46d72f" }, { url: "casamia/screenshots/casa-mia-banner-1.jpg", revision: "0c2554cd05c02181e41d76183613e59b" }, { url: "casamia/screenshots/casa-mia-banner-2.jpg", revision: "027664e104e445d29780d5d0e7f1fdf3" }, { url: "casamia/screenshots/Screenshot (166).png", revision: "469507f9e0b9cb014537860a71d592a8" }, { url: "casamia/screenshots/Screenshot (167).png", revision: "ef64dd6cf076915e75166c30b4532517" }, { url: "casamia/screenshots/Screenshot (168).png", revision: "fe8f13441dc6be6b77dcbce09090d049" }, { url: "casamia/screenshots/Screenshot (170).png", revision: "c18da59d776a5483dc2c593d8eb21e6d" }, { url: "casamia/style.css", revision: "014ae3397247afcabbcc6ea46001c29e" }, { url: "casamia/sw.js.bak", revision: "18a4f34fb53b878bfe862f794ae56089" }, { url: "casamia/wallpapers/1440p-HD-Wallpaper-Free-download-thumb.webp", revision: "89bc8f0150e9491ec15edc92530a1553" }, { url: "casamia/wallpapers/1440p-HD-Wallpaper-Free-download.webp", revision: "313ed0b0c7aca693c867b45dcf15e675" }, { url: "casamia/wallpapers/1440p-Wallpaper-Free-Download-thumb.webp", revision: "d1de4e0a933fbf33c344c774a00c0dc9" }, { url: "casamia/wallpapers/1440p-Wallpaper-Free-Download.webp", revision: "12f88959a28f215d3ca857ade1e65f68" }, { url: "casamia/wallpapers/arrival_at_saturn-wallpaper-7680x4320-thumb.webp", revision: "53d09eaa6a944912b091fa70cc91c8f2" }, { url: "casamia/wallpapers/arrival_at_saturn-wallpaper-7680x4320.webp", revision: "0f4f4510d9703a15fe48acaed6919bfd" }, { url: "casamia/wallpapers/backup_jpg/1440p-HD-Wallpaper-Free-download-thumb.png", revision: "7611f3429f18ffb055173146306d25a2" }, { url: "casamia/wallpapers/backup_jpg/1440p-HD-Wallpaper-Free-download.png", revision: "b53d1b6f5a86d711be37d0425699a685" }, { url: "casamia/wallpapers/backup_jpg/1440p-Wallpaper-Free-Download-thumb.jpg", revision: "d4cba2cfa7c65519462f1c0645525ba9" }, { url: "casamia/wallpapers/backup_jpg/1440p-Wallpaper-Free-Download.jpg", revision: "8d39efd55916dc0c708a84223290a1ae" }, { url: "casamia/wallpapers/backup_jpg/arrival_at_saturn-wallpaper-7680x4320-thumb.jpg", revision: "f987a213288a1eade0046fac610aa48c" }, { url: "casamia/wallpapers/backup_jpg/arrival_at_saturn-wallpaper-7680x4320.jpg", revision: "ab0132f12a7a56b7015d54fafe3da90d" }, { url: "casamia/wallpapers/backup_jpg/batman_car_night-wallpaper-3840x2160-thumb.jpg", revision: "1e35f4e4ead879177294aba6949c644d" }, { url: "casamia/wallpapers/backup_jpg/batman_car_night-wallpaper-3840x2160.jpg", revision: "ffc7975cef76d90cb1c296fcf06cb79c" }, { url: "casamia/wallpapers/backup_jpg/bay_10-wallpaper-3840x2160-thumb.jpg", revision: "73361da2068332d21700861dfc92ee2c" }, { url: "casamia/wallpapers/backup_jpg/bay_10-wallpaper-3840x2160.jpg", revision: "2f75be0bd12437c5edaf41f1880291fd" }, { url: "casamia/wallpapers/backup_jpg/bicycle_aesthetic-wallpaper-3840x2160-thumb.jpg", revision: "d13b6eac59a9e2671ec857bc5b84cf71" }, { url: "casamia/wallpapers/backup_jpg/bicycle_aesthetic-wallpaper-3840x2160.jpg", revision: "0c06080978374ab262ec4188afc8f5f3" }, { url: "casamia/wallpapers/backup_jpg/billie_eilish-wallpaper-5120x2880-thumb.jpg", revision: "7227a60f4d2edc78b4b746b5fa975ed8" }, { url: "casamia/wallpapers/backup_jpg/billie_eilish-wallpaper-5120x2880.jpg", revision: "ac7585a535bc2f322521551fe6d4544a" }, { url: "casamia/wallpapers/backup_jpg/black-wallpaper-20072315472168-thumb.jpg", revision: "47909cb7ac9e9946a87da6b0c93f7d9f" }, { url: "casamia/wallpapers/backup_jpg/black-wallpaper-20072315472168.jpg", revision: "077d20f435cb0e3d770c4aa2d0abc19b" }, { url: "casamia/wallpapers/backup_jpg/black-wallpaper-20091514274141-thumb.jpg", revision: "1d383f4978bfc019e91adbd064079a79" }, { url: "casamia/wallpapers/backup_jpg/black-wallpaper-20091514274141.jpg", revision: "597ad7da2c42b6ef9a1d8d1b82ea7333" }, { url: "casamia/wallpapers/backup_jpg/car-wallpaper-2007261221435-thumb.jpg", revision: "6fdb8f8a6e0a6af520f62ea1cffd2f4f" }, { url: "casamia/wallpapers/backup_jpg/car-wallpaper-2007261221435.jpg", revision: "9ecb68476e41b82aef8c2d8b97399e88" }, { url: "casamia/wallpapers/backup_jpg/car-wallpaper-20072612433540-thumb.jpg", revision: "905b8d88af005bab3e29b1d9edc459fa" }, { url: "casamia/wallpapers/backup_jpg/car-wallpaper-20072612433540.jpg", revision: "6aacaa9624448422c8cd0f864961be02" }, { url: "casamia/wallpapers/backup_jpg/coast_aerial_view_beautiful_landscape-wallpaper-3840x2160-thumb.jpg", revision: "79e9fb143272cd057ad5ff09239043d5" }, { url: "casamia/wallpapers/backup_jpg/coast_aerial_view_beautiful_landscape-wallpaper-3840x2160.jpg", revision: "fec8e04abf20f6248f2e65e339728aae" }, { url: "casamia/wallpapers/backup_jpg/cute_anime_girl_2-wallpaper-3840x2160-thumb.jpg", revision: "1728f3aaf41b5c30f4136634e9081a84" }, { url: "casamia/wallpapers/backup_jpg/cute_anime_girl_2-wallpaper-3840x2160.jpg", revision: "202512c96d948db7c75bc55e57342a6a" }, { url: "casamia/wallpapers/backup_jpg/desert-wallpaper-3840x2160-thumb.jpg", revision: "7184d4a636fa37cb06395f2c15480fdb" }, { url: "casamia/wallpapers/backup_jpg/desert-wallpaper-3840x2160.jpg", revision: "11802a68e545240cb2aee3a9160e855b" }, { url: "casamia/wallpapers/backup_jpg/HP-Wallpaper-thumb.jpg", revision: "18d2a74e02e3757c38bba05e8f5c5d8e" }, { url: "casamia/wallpapers/backup_jpg/HP-Wallpaper.jpg", revision: "6f1a246b76b73b3ccd6a3262fe74f62e" }, { url: "casamia/wallpapers/backup_jpg/miles_morales_night_spark-wallpaper-3840x2160-thumb.jpg", revision: "3e25165511f0b1f7d67c8c2f5a32252a" }, { url: "casamia/wallpapers/backup_jpg/miles_morales_night_spark-wallpaper-3840x2160.jpg", revision: "4f78776c81cf5f8852fbdfa15dd27c82" }, { url: "casamia/wallpapers/backup_jpg/nature-wallpaper-21012223471720-thumb.jpg", revision: "d596d22e1b79228b68727c7a46fc9a4c" }, { url: "casamia/wallpapers/backup_jpg/nature-wallpaper-21012223471720.jpg", revision: "a0f7cecccce27d8be4efc0c14e5855be" }, { url: "casamia/wallpapers/backup_jpg/neon-wallpaper-20070214060650-thumb.jpg", revision: "86e9fdbed5393de5c5901a781d0da290" }, { url: "casamia/wallpapers/backup_jpg/neon-wallpaper-20070214060650.jpg", revision: "7bb0d2fc9e6301d866a90eb5b8ebbf02" }, { url: "casamia/wallpapers/backup_jpg/pastel_macarons_aesthetic-wallpaper-5120x2880-thumb.jpg", revision: "706894d9fad33f861585f301c7d56cc8" }, { url: "casamia/wallpapers/backup_jpg/pastel_macarons_aesthetic-wallpaper-5120x2880.jpg", revision: "a33589d63e7a71dc57d9f8743eb4f80a" }, { url: "casamia/wallpapers/backup_jpg/peaceful-wallpaper-3840x2160-thumb.jpg", revision: "c01a1c76e63ccf7730d4a9c02c3a623b" }, { url: "casamia/wallpapers/backup_jpg/peaceful-wallpaper-3840x2160.jpg", revision: "5c261d761fb93a283f87810b9c02a12a" }, { url: "casamia/wallpapers/backup_jpg/peter_morales-wallpaper-3840x2160-thumb.jpg", revision: "2efc19d8e8fb6aebef1c720dfc82b0ed" }, { url: "casamia/wallpapers/backup_jpg/peter_morales-wallpaper-3840x2160.jpg", revision: "bbf8be13d0b2fc618e829407aed74ff6" }, { url: "casamia/wallpapers/backup_jpg/pink_aesthetic-wallpaper-3840x2160-thumb.jpg", revision: "6bba9ba51a96d1b7b14b7ee3ab4ddb08" }, { url: "casamia/wallpapers/backup_jpg/pink_aesthetic-wallpaper-3840x2160.jpg", revision: "fb17b6d4b6834b06b6ba42d04ea2a504" }, { url: "casamia/wallpapers/backup_jpg/pink_desert_blue_sky-wallpaper-2880x1620-thumb.jpg", revision: "8390d79cf2f2fece0aae082ac2f2d498" }, { url: "casamia/wallpapers/backup_jpg/pink_desert_blue_sky-wallpaper-2880x1620.jpg", revision: "6780368aba40c68eb4baa1b49fbfff59" }, { url: "casamia/wallpapers/backup_jpg/pink_sea_aesthetic-wallpaper-2880x1620-thumb.jpg", revision: "97c8b2a4b07c86675e670eb7bcfaafeb" }, { url: "casamia/wallpapers/backup_jpg/pink_sea_aesthetic-wallpaper-2880x1620.jpg", revision: "38cac7bfcdd56a2adf5d5e64f8f18006" }, { url: "casamia/wallpapers/backup_jpg/pink_umbrellas-wallpaper-5120x2880-thumb.jpg", revision: "f58fa8bb6f028c6159a5d77b752e3948" }, { url: "casamia/wallpapers/backup_jpg/pink_umbrellas-wallpaper-5120x2880.jpg", revision: "b51e62fec817c0ed8288e7c6e9e7c64f" }, { url: "casamia/wallpapers/backup_jpg/space-wallpaper-20082314113712-thumb.jpg", revision: "45a29f003fd2c20b99d300dff6685b0c" }, { url: "casamia/wallpapers/backup_jpg/space-wallpaper-20082314113712.jpg", revision: "f4aa03028007dcda2611d4cdf6c6d3fd" }, { url: "casamia/wallpapers/backup_jpg/Wallpaper-4k-Dark-Blue-Lines-Grid-Lines-Backgrounds-P2-thumb.jpg", revision: "11d4366dedca22088747f5ffb81c0743" }, { url: "casamia/wallpapers/backup_jpg/Wallpaper-4k-Dark-Blue-Lines-Grid-Lines-Backgrounds-P2.jpg", revision: "880b4ee8e6cfeca36243b0795c2abd80" }, { url: "casamia/wallpapers/backup_jpg/Wallpaper-4k-High-Resolution-Mac-3840x2160px-4k-Free-Dow1-thumb.jpg", revision: "4c4aa405e584166116d16744f5b2c6ae" }, { url: "casamia/wallpapers/backup_jpg/Wallpaper-4k-High-Resolution-Mac-3840x2160px-4k-Free-Dow1.jpg", revision: "3f153ee3a86901ea919ec075ef525304" }, { url: "casamia/wallpapers/batman_car_night-wallpaper-3840x2160-thumb.webp", revision: "4dd8fbd2eb686eeac69388e62abd641d" }, { url: "casamia/wallpapers/batman_car_night-wallpaper-3840x2160.webp", revision: "6ae41c7bf8ef64e217f106c16c0f8bc9" }, { url: "casamia/wallpapers/bay_10-wallpaper-3840x2160-thumb.webp", revision: "fa90100b1070602c3cf753a488624a3f" }, { url: "casamia/wallpapers/bay_10-wallpaper-3840x2160.webp", revision: "ffe369af2238d747e184de9e61f28ec5" }, { url: "casamia/wallpapers/bicycle_aesthetic-wallpaper-3840x2160-thumb.webp", revision: "58b3196673f684ebf6c0a6a06d6bb5a8" }, { url: "casamia/wallpapers/bicycle_aesthetic-wallpaper-3840x2160.webp", revision: "b2932e3fe8da3b75088bed762c57cf6c" }, { url: "casamia/wallpapers/billie_eilish-wallpaper-5120x2880-thumb.webp", revision: "0349dfd369eecc655ed1155d41097c8c" }, { url: "casamia/wallpapers/billie_eilish-wallpaper-5120x2880.webp", revision: "cdf3b542b46726ddb3bb9d04365eb0b9" }, { url: "casamia/wallpapers/black-wallpaper-20072315472168-thumb.webp", revision: "9127327f5ea8ba82687727228c268379" }, { url: "casamia/wallpapers/black-wallpaper-20072315472168.webp", revision: "f374b3e1153733fe58c4924359d1d0f4" }, { url: "casamia/wallpapers/black-wallpaper-20091514274141-thumb.webp", revision: "58e2954a4657ed01ac6e436a2b128db7" }, { url: "casamia/wallpapers/black-wallpaper-20091514274141.webp", revision: "559bf8150c48a8584c6d6787b07d62f6" }, { url: "casamia/wallpapers/car-wallpaper-2007261221435-thumb.webp", revision: "d67ade2fbd055bc0a2b795a47bea4da0" }, { url: "casamia/wallpapers/car-wallpaper-2007261221435.webp", revision: "1459fed352bc4bd63da0a010930e7775" }, { url: "casamia/wallpapers/car-wallpaper-20072612433540-thumb.webp", revision: "52c0ac2eb7b9b3b7755ab00a2c6464dd" }, { url: "casamia/wallpapers/car-wallpaper-20072612433540.webp", revision: "28b4f482f869a3eea4b58e1279636fe3" }, { url: "casamia/wallpapers/coast_aerial_view_beautiful_landscape-wallpaper-3840x2160-thumb.webp", revision: "9d3537b903cfe193c2c032eb5d98eb7c" }, { url: "casamia/wallpapers/coast_aerial_view_beautiful_landscape-wallpaper-3840x2160.webp", revision: "fb4f8444c5b2375b2988ec0e4cc45a4f" }, { url: "casamia/wallpapers/cute_anime_girl_2-wallpaper-3840x2160-thumb.webp", revision: "17488d80a953b4045a48300adaab6505" }, { url: "casamia/wallpapers/cute_anime_girl_2-wallpaper-3840x2160.webp", revision: "2f11019bfb3ab547ef12d57a8e3a0439" }, { url: "casamia/wallpapers/desert-wallpaper-3840x2160-thumb.webp", revision: "530a07636405401dc7dabc9c45c28e24" }, { url: "casamia/wallpapers/desert-wallpaper-3840x2160.webp", revision: "f56ff76866e1d65469b692deed1a9e85" }, { url: "casamia/wallpapers/HP-Wallpaper-thumb.webp", revision: "ba5c9e776495719043837c69f0322c92" }, { url: "casamia/wallpapers/HP-Wallpaper.webp", revision: "2c225dffb05cb2cc002648adc70a4ab8" }, { url: "casamia/wallpapers/miles_morales_night_spark-wallpaper-3840x2160-thumb.webp", revision: "9485f97c764b13c42752908d67f5bd56" }, { url: "casamia/wallpapers/miles_morales_night_spark-wallpaper-3840x2160.webp", revision: "ca0aefcdafba13d35be6d0d9791b5cee" }, { url: "casamia/wallpapers/nature-wallpaper-21012223471720-thumb.webp", revision: "e43e4b6c1f061fea25f2bb494d18e4d5" }, { url: "casamia/wallpapers/nature-wallpaper-21012223471720.webp", revision: "f5d8bd85ee2ed26020e746c8eb2ddc49" }, { url: "casamia/wallpapers/neon-wallpaper-20070214060650-thumb.webp", revision: "38b6523443910a20d8b09790ec31b251" }, { url: "casamia/wallpapers/neon-wallpaper-20070214060650.webp", revision: "356a465cdd93a738b3655b47538b2fbd" }, { url: "casamia/wallpapers/pastel_macarons_aesthetic-wallpaper-5120x2880-thumb.webp", revision: "7426a6a2cb21ce2dae080e6275717436" }, { url: "casamia/wallpapers/pastel_macarons_aesthetic-wallpaper-5120x2880.webp", revision: "2ad8729069b34227816795196c6c4dfc" }, { url: "casamia/wallpapers/peaceful-wallpaper-3840x2160-thumb.webp", revision: "eda41aacbff6311d788365b31d459ba6" }, { url: "casamia/wallpapers/peaceful-wallpaper-3840x2160.webp", revision: "068c287f4448e390da72fe35e756cce6" }, { url: "casamia/wallpapers/peter_morales-wallpaper-3840x2160-thumb.webp", revision: "315ef5b8308f45b28093c1d18f7a2ac4" }, { url: "casamia/wallpapers/peter_morales-wallpaper-3840x2160.webp", revision: "b2b4715d84e8d5c7fdf525694168ca8e" }, { url: "casamia/wallpapers/pink_aesthetic-wallpaper-3840x2160-thumb.webp", revision: "05e69d08e6893601120698d181426805" }, { url: "casamia/wallpapers/pink_aesthetic-wallpaper-3840x2160.webp", revision: "7db9f89b1e215170ba297112931a6f7f" }, { url: "casamia/wallpapers/pink_desert_blue_sky-wallpaper-2880x1620-thumb.webp", revision: "c316b57d31c51f381b41f149a82ee5c3" }, { url: "casamia/wallpapers/pink_desert_blue_sky-wallpaper-2880x1620.webp", revision: "9f401c6d0c16fcbb4c41ed85502145b9" }, { url: "casamia/wallpapers/pink_sea_aesthetic-wallpaper-2880x1620-thumb.webp", revision: "d4e5cb328e7e9403b3838bd176ba0237" }, { url: "casamia/wallpapers/pink_sea_aesthetic-wallpaper-2880x1620.webp", revision: "98146e2b5987e82ae2c84ececc8bf978" }, { url: "casamia/wallpapers/pink_umbrellas-wallpaper-5120x2880-thumb.webp", revision: "ac087d9e962c001e883fa07b425485e0" }, { url: "casamia/wallpapers/pink_umbrellas-wallpaper-5120x2880.webp", revision: "e0397f5c375acc4a1cad3e628357fca2" }, { url: "casamia/wallpapers/space-wallpaper-20082314113712-thumb.webp", revision: "7d1418c3bc57c1d4ecf396c5f060bc94" }, { url: "casamia/wallpapers/space-wallpaper-20082314113712.webp", revision: "9e8036eb318c9a6fe2705e337bfabee0" }, { url: "casamia/wallpapers/Wallpaper-4k-Dark-Blue-Lines-Grid-Lines-Backgrounds-P2-thumb.webp", revision: "583c13ba044e6a7ff3f761d679e95cdc" }, { url: "casamia/wallpapers/Wallpaper-4k-Dark-Blue-Lines-Grid-Lines-Backgrounds-P2.webp", revision: "6d1432539fe3350940a8648ce3e0eea8" }, { url: "casamia/wallpapers/Wallpaper-4k-High-Resolution-Mac-3840x2160px-4k-Free-Dow1-thumb.webp", revision: "f61b3f0225e2fd1a449737a3317a4970" }, { url: "casamia/wallpapers/Wallpaper-4k-High-Resolution-Mac-3840x2160px-4k-Free-Dow1.webp", revision: "43b3773ff6b7f8560fef42fb781656c4" }, { url: "casamia/wallpapers/wallpapers_list.json", revision: "fbd6b7c61bed1ab964c7e1a90df011ce" }, { url: "casamia/webfonts/Flaticon.woff", revision: "1dbab8d47aa2e11c55216ab3286d6f69" }], { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }) }));
//# sourceMappingURL=sw.js.map
