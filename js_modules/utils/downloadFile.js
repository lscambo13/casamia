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

export function downloadFile(url, title) {
  const e = document.createElement('a');
  e.setAttribute('href', url);
  e.setAttribute('download', title);
  e.style.display = 'none';
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
};
