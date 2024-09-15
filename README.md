
# YouTube Downloader in TypeScript

This is a command-line tool to download YouTube videos in various formats (MP3, MP4, WEBM) using TypeScript. The tool leverages `ytdl-core` for fetching YouTube video data and `readline-sync` for interactive command-line input.

## Prerequisites

- Node.js installed on your system (version 12 or higher).
- npm (Node Package Manager) should be installed.
- TypeScript globally installed (`npm install -g typescript`).

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/cptcr/yt-downloader-ts/
   cd https://github.com/cptcr/yt-downloader-ts/
   ```

2. **Install Dependencies**

   Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Compile TypeScript to JavaScript**

   Compile the TypeScript code to JavaScript:

   ```bash
   npx tsc
   ```

   This will generate the compiled JavaScript files in the same directory.

4. **Run the YouTube Downloader**

   After compiling, you can run the script using Node.js:

   ```bash
   node <compiled-file-name>.js
   ```

   Replace `<compiled-file-name>` with the actual compiled JavaScript file name.

## How to Use

1. Enter the YouTube video URL you want to download.
2. Confirm if you want to download the video after seeing its title.
3. Choose the format you want to download (MP3, MP4, WEBM).
4. Select the desired quality for the download.
5. Wait for the download to complete. The file will be saved in the same directory.

## Notes

- Ensure you have a stable internet connection for downloading videos.
- The downloaded files will be saved with a timestamp to avoid overwriting existing files.

## Troubleshooting

- If you encounter issues while downloading, ensure the YouTube URL is valid.
- For permission errors, make sure you have the appropriate write permissions in the directory where you are running the script.
- If you receive "No available formats found," the video might have restricted formats. Try another video.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [chalk](https://www.npmjs.com/package/chalk) for coloring terminal output.
- [ytdl-core](https://www.npmjs.com/package/ytdl-core) for downloading YouTube videos.
- [readline-sync](https://www.npmjs.com/package/readline-sync) for interactive command-line input.

Enjoy downloading YouTube videos!
