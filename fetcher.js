// fetcher code
const needle = require('needle');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error("Please provide a URL and a file path.");
  process.exit(1);
}

needle.get(url, (error, response) => {
  if (error) {
    console.error(`Error fetching URL: ${error.message}`);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Request failed with status code: ${response.statusCode}`);
    return;
  }

  const data = response.body;

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(`Failed to write to file: ${err.message}`);
      return;
    }
    console.log(`Downloaded and saved ${data.length} bytes to ${filePath}`);
  });
});
