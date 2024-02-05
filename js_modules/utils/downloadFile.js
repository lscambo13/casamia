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

export function downloadMe(url) {
  const opts = {
    headers: {
      'mode': 'cors',
    },
  };

  // Fetch the original image
  fetch(url, opts)
    // Retrieve its body as ReadableStream
    .then((response) => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    // Create a new response out of the stream
    .then((stream) => new Response(stream))
    // Create an object URL for the response
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    // Update image
    .then((url) => console.log((image.src = url)))
    .catch((err) => console.error(err));
}
