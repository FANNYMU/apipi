// import { Tiktok } from "./core/tiktok";
// import fs from "fs";
// import https from "https";

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
