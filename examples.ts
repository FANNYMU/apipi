// import fs from "fs";
// import https from "https";

// import { QuoteScraperFactory } from "./src/core/factory/QuoteScraperFactory";
// import { ScrapingException } from "./src/types/animeQuotes";

// import { Translate } from "./src/core/translate";

// import apipi from ".";

// (async () => {
//   const tiktok = new Tiktok();
//   const response = await tiktok.downloadVideo(
//     "https://www.tiktok.com/@ulti.nolan/video/7498769318122114322?is_from_webapp=1&sender_device=pc",
//   );
//   const videoUrl = response.data.play;
//   const outputPath = "video.mp4";

//   const file = fs.createWriteStream(outputPath);
//   https
//     .get(videoUrl, (response) => {
//       response.pipe(file);

//       file.on("finish", () => {
//         file.close();
//         console.log("Download complete");
//       });
//     })
//     .on("error", (error) => {
//       console.error("Download error:", error);
//     });
//   console.log(
//     JSON.stringify(await tiktok.searchVideos("timoti ronald")),
//     null,
//     2
//   );
// })();

// import { YoutubeService } from "./core/youtube";

// (async () => {
//   const youtube = new YoutubeService();
//   // // Get video info
//   // const info = await youtube.getInfo(
//   //   "https://www.youtube.com/watch?v=BYIQuqrkxzk"
//   // );
//   // console.log(JSON.stringify(info, null, 2));

//   // // Download audio
//   // const audioResult = await youtube.downloadContent(
//   //   "https://www.youtube.com/watch?v=BYIQuqrkxzk",
//   //   "audio"
//   // );

//   // // Download video with specific quality
//   // const videoResult = await youtube.downloadContent(
//   //   "https://www.youtube.com/watch?v=BYIQuqrkxzk",
//   //   "video",
//   //   720
//   // );
//   // console.log(videoResult);

//   // // Download to specific file
//   // const downloadResult = await youtube.downloadToFile(
//   //   "https://www.youtube.com/watch?v=0Nh61ktP90c",
//   //   "./downloads/%(title)s.%(ext)s",
//   //   "video"
//   // );
// })();

// async function to translate text
// Example usage
// async function translateExample() {
//   try {
//     // Simple translation
//     const simple = await Translate.simpleTranslate("Hello world", "id");
//     console.log(simple); // "Halo dunia"

//     // Full translation with details
//     const full = await Translate.translateText("Halo dunia", {
//       from: "id",
//       to: "en",
//     });
//     console.log(full.text); // "Hello world"
//     console.log(full.from.language.iso); // "id"

//     // Auto-detect language
//     const autoDetect = await Translate.translateText("Bonjour le monde", {
//       to: "en",
//     });
//     console.log(autoDetect.text); // "Hello world"
//     console.log(autoDetect.from.language.iso); // "fr" (detected)

//     // Language detection only
//     const detection = await Translate.detectLanguage("Hola mundo");
//     console.log(detection.from.language.iso); // "es"

//     // Batch translation
//     const batch = await Translate.batchTranslate(
//       ["Hello", "Good morning", "Thank you"],
//       "id"
//     );
//     console.log(batch); // ["Halo", "Selamat pagi", "Terima kasih"]

//     // Get language utilities
//     console.log(Translate.getLanguageName("id")); // "Indonesian"
//     console.log(Translate.getLanguageCode("Indonesian")); // "id"
//     console.log(Translate.isLanguageSupported("id")); // true

//     // Get available target languages
//     const targets = Translate.getAvailableTargets("en");
//     console.log(targets.length); // Number of available target languages
//   } catch (error) {
//     console.error("Translation error:", error);
//   }
// }

// // example();

// translateExample();
// async function animeQuotesExample() {
//   const scraper = QuoteScraperFactory.createAnimeQuoteScraper();

//   try {
//     console.log("Fetching random anime quote...");
//     const randomQuote = await scraper.getRandomQuote();

//     if (randomQuote) {
//       console.log("\n=== Random Anime Quote ===");
//       console.log(`Character: ${randomQuote.character}`);
//       console.log(`Anime: ${randomQuote.anime}`);
//       console.log(`Episode: ${randomQuote.episode}`);
//       console.log(`Quote: "${randomQuote.quote}"`);
//       if (randomQuote.image) {
//         console.log(`Image: ${randomQuote.image}`);
//       }
//       console.log(`Link: ${randomQuote.link}`);
//     } else {
//       console.log("No quotes found");
//     }

//     // Example of getting all quotes
//     console.log("\n=== Fetching all quotes ===");
//     const allQuotes = await scraper.getAllQuotes();
//     console.log(`Total quotes found: ${allQuotes.length}`);
//   } catch (error) {
//     if (error instanceof ScrapingException) {
//       console.error(`Scraping Error: ${error.message}`);
//       if (error.statusCode) {
//         console.error(`Status Code: ${error.statusCode}`);
//       }
//       if (error.originalError) {
//         console.error(`Original Error: ${error.originalError.message}`);
//       }
//     } else {
//       console.error("Unexpected error:", error);
//     }
//   }
// }

// if (require.main === module) {
//   animeQuotesExample().catch(console.error);
// }

// import { spotifydl } from "./src/core/spotify";

// class SpotifyExamples {
//   private readonly exampleUrls = [
//     "https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh",
//     "https://open.spotify.com/intl-id/track/7qiZfU4dY1lWllzX7mPBI3",
//     "https://open.spotify.com/track/1A8mOHkHgVrJGhYf4vO8Xg?si=abc123def456",
//   ];

//   async basicUsage(): Promise<void> {
//     try {
//       const url = "https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh";
//       const result = await spotifydl(url);

//       console.log("Track Info:", {
//         id: result.info.id,
//         type: result.info.type,
//         title: result.info.name,
//         artist: result.info.artists,
//         duration: result.info.duration_ms,
//         image: result.info.image,
//         gid: result.info.gid,
//       });

//       console.log("Download URL:", result.url);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   async downloadMultipleTracks(): Promise<void> {
//     const results = [];

//     for (const url of this.exampleUrls) {
//       try {
//         console.log(`Downloading: ${url}`);
//         const result = await spotifydl(url);
//         results.push({
//           url,
//           success: true,
//           data: result,
//         });
//         console.log(`✓ Successfully downloaded: ${result.info.name}`);
//       } catch (error) {
//         results.push({
//           url,
//           success: false,
//           error: error instanceof Error ? error.message : "Unknown error",
//         });
//         console.error(`✗ Failed to download: ${url}`);
//       }
//     }

//     console.log("\nDownload Summary:");
//     console.log(`Total: ${results.length}`);
//     console.log(`Success: ${results.filter((r) => r.success).length}`);
//     console.log(`Failed: ${results.filter((r) => !r.success).length}`);
//   }

//   async downloadWithErrorHandling(): Promise<void> {
//     const url = "https://open.spotify.com/track/invalid-track-id";

//     try {
//       const result = await spotifydl(url);
//       console.log("Download successful:", result);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Download failed:", error.message);
//       } else {
//         console.error("Unknown error occurred");
//       }
//     }
//   }

//   async downloadAndSave(): Promise<void> {
//     try {
//       const url = "https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh";
//       const result = await spotifydl(url);

//       const trackData = {
//         metadata: {
//           id: result.info.id,
//           type: result.info.type,
//           name: result.info.name,
//           artists: result.info.artists,
//           duration: result.info.duration_ms,
//           image: result.info.image,
//           gid: result.info.gid,
//         },
//         downloadUrl: result.url,
//         downloadedAt: new Date().toISOString(),
//       };

//       console.log(
//         "Track data ready for saving:",
//         JSON.stringify(trackData, null, 2)
//       );
//     } catch (error) {
//       console.error("Failed to process track:", error);
//     }
//   }

//   async runAllExamples(): Promise<void> {
//     console.log("=== Spotify Downloader Examples ===\n");

//     console.log("1. Basic Usage:");
//     await this.basicUsage();

//     console.log("\n2. Multiple Tracks Download:");
//     await this.downloadMultipleTracks();

//     console.log("\n3. Error Handling:");
//     await this.downloadWithErrorHandling();

//     console.log("\n4. Download and Save:");
//     await this.downloadAndSave();
//   }
// }

// const examples = new SpotifyExamples();

// export const runSpotifyExamples = async (): Promise<void> => {
//   await examples.runAllExamples();
// };

// export const quickSpotifyDownload = async (url: string): Promise<void> => {
//   try {
//     console.log(`Starting download for: ${url}`);
//     const result = await spotifydl(url);

//     console.log("Download completed!");
//     console.log(`ID: ${result.info.id}`);
//     console.log(`Type: ${result.info.type}`);
//     console.log(`Title: ${result.info.name}`);
//     console.log(`Artist(s): ${result.info.artists}`);
//     console.log(`Duration: ${result.info.duration_ms}ms`);
//     console.log(`GID: ${result.info.gid}`);
//     console.log(`Download URL: ${result.url}`);
//   } catch (error) {
//     console.error("Download failed:", error);
//   }
// };

// if (require.main === module) {
//   runSpotifyExamples();
// }
