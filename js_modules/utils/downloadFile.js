// export const downloadFile = (path, filename) => {
//     // Create a new link
//     const anchor = document.createElement('a');
//     anchor.href = path;
//     anchor.download = filename;

//     // Append to the DOM
//     document.body.appendChild(anchor);

//     // Trigger `click` event
//     anchor.click();

//     // Remove element from DOM
//     document.body.removeChild(anchor);
// };

export function downloadFile(url) {
  // console.log(WALLPAPERS_URL + selectedWallpaper);
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', 'CasaMia-Downloaer');
  element.target = '_blank';
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  /* alert(
  "If the download doesn't start, disable the pop-up blocker extensions."
); */
};
