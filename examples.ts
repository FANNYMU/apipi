// import fs from "fs";
// import https from "https";

import { Translate } from "./src/core/translate";

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
