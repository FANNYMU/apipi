import axios from "axios";
import { TiktokDown, TiktokSearch } from "../types/tiktok";

export class Tiktok {
  public async downloadVideo(
    url: string,
    highDefinition: boolean = false
  ): Promise<TiktokDown> {
    try {
      const params = new URLSearchParams();
      params.append("url", url);
      if (highDefinition) params.append("hd", "1");

      const response = await axios.post<TiktokDown>(
        "https://tikwm.com/api/",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Cookie: "current_language=en",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
          },
        }
      );

      const data = response.data;
      if (!data || typeof data.code !== "number") {
        throw new Error("Invalid API response");
      }

      return data;
    } catch (error) {
      throw new Error(`Tiktok API Error: ${(error as Error).message}`);
    }
  }

  public async searchVideos(query: string): Promise<TiktokSearch> {
    try {
      const response = await axios({
        method: "POST",
        url: "https://tikwm.com/api/feed/search",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        data: `keywords=${encodeURIComponent(query)}&count=10&cursor=0&HD=1`,
      });

      const data = response.data;
      if (!data || typeof data.code !== "number" || data.code !== 0) {
        throw new Error("Invalid API response");
      }

      if (!data.data || !Array.isArray(data.data.videos)) {
        throw new Error("Invalid API response structure");
      }

      return data as TiktokSearch;
    } catch (error: any) {
      throw new Error(
        "Failed to get results from TikTok API: " + error.message
      );
    }
  }
}
