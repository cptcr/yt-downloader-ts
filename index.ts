import chalk from 'chalk';
import ytdl, { videoFormat, videoInfo } from 'ytdl-core';
import readlineSync from 'readline-sync';
import fs from 'fs';

type LogFunction = (msg: string) => void;

const log: { success: LogFunction; warning: LogFunction; error: LogFunction } = {
    success: (msg: string) => console.log(chalk.green(`[ SUCCESS ] ${msg}`)),
    warning: (msg: string) => console.log(chalk.yellow(`[ WARNING ] ${msg}`)),
    error: (msg: string) => console.log(chalk.red(`[ FAILED ] ${msg}`)),
};

console.log(chalk.red("YOUTUBE DOWNLOADER"));

const url: string = readlineSync.question("Enter the YouTube video URL you want to download: ");

function getVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"'\n\s?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const videoId: string | null = getVideoId(url);

if (!videoId) {
    log.error("Invalid YouTube URL!");
    process.exit(1);
}

async function getVideoInfo(url: string): Promise<{ title: string; formats: videoFormat[] }> {
    try {
        const info: videoInfo = await ytdl.getInfo(url);
        return {
            title: info.videoDetails.title,
            formats: info.formats,
        };
    } catch (error) {
        log.error("Unable to fetch video information!");
        process.exit(1);
    }
}

(async () => {
    const { title, formats } = await getVideoInfo(url);
    console.log(chalk.cyan(`Video Title: ${title}`));

    const confirmDownload: boolean = readlineSync.keyInYNStrict("Do you want to download this video?");
    if (!confirmDownload) {
        log.warning("Download cancelled by user.");
        process.exit(0);
    }

    const format: string = readlineSync.question("Choose the format to download (MP3, MP4, WEBM): ").toUpperCase();

    const availableFormats: string[] = formats
        .filter((f) => {
            if (format === 'MP3') return f.mimeType?.includes('audio/mp4');
            if (format === 'MP4') return f.container === 'mp4' && f.hasVideo && f.hasAudio;
            if (format === 'WEBM') return f.container === 'webm';
            return false;
        })
        .map((f) => f.qualityLabel)
        .filter(Boolean) as string[];

    if (availableFormats.length === 0) {
        log.error(`No available formats found for ${format}`);
        process.exit(1);
    }

    console.log(chalk.cyan(`Available qualities for ${format}: ${availableFormats.join(", ")}`));

    const quality: string = readlineSync.question("Enter the desired quality: ");

    if (!availableFormats.includes(quality)) {
        log.error("Invalid quality selected!");
        process.exit(1);
    }

    const selectedFormat: videoFormat | undefined = formats.find(
        (f) =>
            f.qualityLabel === quality &&
            ((format === 'MP3' && f.mimeType?.includes('audio/mp4')) ||
                (format === 'MP4' && f.container === 'mp4') ||
                (format === 'WEBM' && f.container === 'webm'))
    );

    if (!selectedFormat) {
        log.error("Selected format not found!");
        process.exit(1);
    }

    console.log(chalk.yellow("Downloading..."));

    const outputFilename: string = `downloaded_video_${Date.now()}.${format.toLowerCase()}`;
    const writeStream = fs.createWriteStream(outputFilename);
    
    ytdl(url, { format: selectedFormat })
    .pipe(writeStream)
    .on('finish', () => log.success(`Download complete! Saved as ${outputFilename}`))
    .on('error', (err: Error) => log.error(`Download error: ${err.message}`))
    .on('close', () => console.log(chalk.green('Stream closed.')))
    .on('open', () => console.log(chalk.blue('Stream opened.')))
    .on('end', () => console.log(chalk.green('Stream ended.')))
    .on('data', (chunk: Buffer) => console.log(chalk.yellow(`Downloading chunk of size: ${chunk.length}`)));
})();
