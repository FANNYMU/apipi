/**
 * Response interface for TikTok video download operations.
 *
 * This interface defines the complete response structure returned by the TikTok
 * download API, including status information, processing metrics, and comprehensive
 * video data with metadata, statistics, and author information.
 *
 * @interface TiktokDown
 * @author FANNYMU
 */
export interface TiktokDown {
  /**
   * Response status code indicating success or failure.
   * @example 0 (success), -1 (error)
   */
  code: number;

  /**
   * Human-readable message describing the response status.
   * @example "success", "Video not found"
   */
  msg: string;

  /**
   * Processing time in seconds for the download request.
   * @example 1.25, 0.75
   */
  processed_time: number;

  /**
   * Main data container with comprehensive video information.
   */
  data: {
    /**
     * Unique TikTok video identifier.
     * @example "7234567890123456789"
     */
    id: string;

    /**
     * Geographic region where the video was uploaded.
     * @example "US", "GB", "JP"
     */
    region: string;

    /**
     * Video title or caption text.
     * @example "Amazing dance video! #fyp"
     */
    title: string;

    /**
     * URL to the video thumbnail cover image.
     * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
     */
    cover: string;

    /**
     * URL to the AI-generated dynamic cover image.
     * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
     */
    ai_dynamic_cover: string;

    /**
     * URL to the original cover image.
     * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
     */
    origin_cover: string;

    /**
     * Video duration in seconds.
     * @example 15, 30, 60
     */
    duration: number;

    /**
     * Direct download URL for the video without watermark.
     * @example "https://v16-web.tiktok.com/video/..."
     */
    play: string;

    /**
     * Download URL for the video with watermark.
     * @example "https://v16-web.tiktok.com/video/..."
     */
    wmplay: string;

    /**
     * File size in bytes for the non-watermarked video.
     * @example 2048576
     */
    size: number;

    /**
     * File size in bytes for the watermarked video.
     * @example 2248576
     */
    wm_size: number;

    /**
     * Direct download URL for the background music.
     * @example "https://sf16-ies-music-va.tiktokcdn.com/obj/..."
     */
    music: string;

    /**
     * Detailed information about the background music.
     */
    music_info: {
      /**
       * Unique music track identifier.
       * @example "6987654321098765432"
       */
      id: string;

      /**
       * Title of the music track.
       * @example "Original Sound", "Popular Song"
       */
      title: string;

      /**
       * Direct URL to play the music.
       * @example "https://sf16-ies-music-va.tiktokcdn.com/obj/..."
       */
      play: string;

      /**
       * URL to the music cover artwork.
       * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
       */
      cover: string;

      /**
       * Music artist or creator name.
       * @example "Artist Name", "username"
       */
      author: string;

      /**
       * Whether this is original music or a remix.
       * @example true, false
       */
      original: boolean;

      /**
       * Music duration in seconds.
       * @example 30, 60, 120
       */
      duration: number;

      /**
       * Album name if applicable.
       * @example "Album Title", ""
       */
      album: string;
    };

    /**
     * Total number of video views.
     * @example 1000000, 50000
     */
    play_count: number;

    /**
     * Number of likes (hearts) on the video.
     * @example 50000, 1000
     */
    digg_count: number;

    /**
     * Number of comments on the video.
     * @example 500, 100
     */
    comment_count: number;

    /**
     * Number of times the video was shared.
     * @example 1000, 50
     */
    share_count: number;

    /**
     * Number of times the video was downloaded.
     * @example 5000, 200
     */
    download_count: number;

    /**
     * Number of times the video was collected/bookmarked.
     * @example 2000, 75
     */
    collect_count: number;

    /**
     * Video creation timestamp in Unix format.
     * @example 1672531200
     */
    create_time: number;

    /**
     * Additional anchor information, typically null.
     */
    anchors: any | null;

    /**
     * Extra anchor data as string.
     * @example "", "additional_data"
     */
    anchors_extras: string;

    /**
     * Whether this video is a promoted advertisement.
     * @example true, false
     */
    is_ad: boolean;

    /**
     * Commerce and advertising related information.
     */
    commerce_info: {
      /**
       * Whether the video is eligible for advertising promotion.
       * @example true, false
       */
      adv_promotable: boolean;

      /**
       * Whether invited to auction advertising.
       * @example true, false
       */
      auction_ad_invited: boolean;

      /**
       * Type of branded content classification.
       * @example 0, 1, 2
       */
      branded_content_type: number;

      /**
       * Whether comment filtering is applied.
       * @example true, false
       */
      with_comment_filter_words: boolean;
    };

    /**
     * Commercial video information as string.
     * @example "", "commercial_data"
     */
    commercial_video_info: string;

    /**
     * Comment settings configuration.
     * @example 0, 1, 2
     */
    item_comment_settings: number;

    /**
     * Mentioned users data as string.
     * @example "", "user1,user2"
     */
    mentioned_users: string;

    /**
     * Video author/creator information.
     */
    author: {
      /**
       * Unique author identifier.
       * @example "1234567890123456789"
       */
      id: string;

      /**
       * Author's unique username.
       * @example "cool_username"
       */
      unique_id: string;

      /**
       * Author's display nickname.
       * @example "Cool User"
       */
      nickname: string;

      /**
       * URL to author's profile avatar.
       * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
       */
      avatar: string;
    };

    /**
     * Array of additional image URLs if available.
     * @example ["https://image1.jpg", "https://image2.jpg"]
     */
    images: string[];
  };
}

/**
 * Response interface for TikTok video search operations.
 *
 * This interface defines the structure returned by TikTok search API operations,
 * containing an array of video results with pagination information and metadata
 * for each video found in the search results.
 *
 * @interface TiktokSearch
 * @author FANNYMU
 */
export interface TiktokSearch {
  /**
   * Response status code indicating success or failure.
   * @example 0 (success), -1 (error)
   */
  code: number;

  /**
   * Human-readable message describing the response status.
   * @example "success", "No results found"
   */
  msg: string;

  /**
   * Processing time in seconds for the search request.
   * @example 0.85, 1.2
   */
  processed_time: number;

  /**
   * Main data container with search results and pagination.
   */
  data: {
    /**
     * Array of video search results.
     */
    videos: {
      /**
       * Unique video identifier.
       * @example "7234567890123456789"
       */
      video_id: string;

      /**
       * Geographic region of the video.
       * @example "US", "GB", "JP"
       */
      region: string;

      /**
       * Video title or caption.
       * @example "Funny cat video #cats"
       */
      title: string;

      /**
       * Video thumbnail cover URL.
       * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
       */
      cover: string;

      /**
       * AI-generated dynamic cover URL.
       * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
       */
      ai_dynamic_cover: string;

      /**
       * Original cover image URL.
       * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
       */
      origin_cover: string;

      /**
       * Video duration in seconds.
       * @example 15, 30, 60
       */
      duration: number;

      /**
       * Direct video play URL without watermark.
       * @example "https://v16-web.tiktok.com/video/..."
       */
      play: string;

      /**
       * Video play URL with watermark.
       * @example "https://v16-web.tiktok.com/video/..."
       */
      wmplay: string;

      /**
       * Non-watermarked video file size in bytes.
       * @example 2048576
       */
      size: number;

      /**
       * Watermarked video file size in bytes.
       * @example 2248576
       */
      wm_size: number;

      /**
       * Background music download URL.
       * @example "https://sf16-ies-music-va.tiktokcdn.com/obj/..."
       */
      music: string;

      /**
       * Array of music information objects.
       */
      music_info: {
        /**
         * Music track identifier.
         * @example "6987654321098765432"
         */
        id: string;

        /**
         * Music track title.
         * @example "Original Sound"
         */
        title: string;

        /**
         * Music play URL.
         * @example "https://sf16-ies-music-va.tiktokcdn.com/obj/..."
         */
        play: string;

        /**
         * Music cover artwork URL.
         * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
         */
        cover: string;

        /**
         * Music artist name.
         * @example "Artist Name"
         */
        author: string;

        /**
         * Whether music is original.
         * @example true, false
         */
        original: boolean;

        /**
         * Music duration in seconds.
         * @example 30, 60
         */
        duration: number;

        /**
         * Album name.
         * @example "Album Title"
         */
        album: string;
      }[];

      /**
       * Number of video plays/views.
       * @example 1000000, 50000
       */
      play_count: number;

      /**
       * Number of likes on the video.
       * @example 50000, 1000
       */
      digg_count: number;

      /**
       * Number of comments.
       * @example 500, 100
       */
      comment_count: number;

      /**
       * Number of shares.
       * @example 1000, 50
       */
      share_count: number;

      /**
       * Number of downloads.
       * @example 5000, 200
       */
      download_count: number;

      /**
       * Video creation timestamp.
       * @example 1672531200
       */
      create_time: number;

      /**
       * Anchor information, typically null.
       */
      anchors: null;

      /**
       * Additional anchor data.
       * @example ""
       */
      anchors_extras: string;

      /**
       * Whether video is an advertisement.
       * @example true, false
       */
      is_ad: boolean;

      /**
       * Commerce information object.
       */
      commerce_info: {
        /**
         * Auction ad invitation status.
         * @example true, false
         */
        auction_ad_invited: boolean;

        /**
         * Comment filter application status.
         * @example true, false
         */
        with_comment_filter_words: boolean;

        /**
         * Advertisement promotion eligibility.
         * @example true, false
         */
        adv_promotable: boolean;

        /**
         * Branded content type classification.
         * @example 0, 1, 2
         */
        branded_content_type: number;
      };

      /**
       * Commercial video information.
       * @example ""
       */
      commercial_video_info: string;

      /**
       * Comment settings configuration.
       * @example 0, 1, 2
       */
      item_comment_settings: number;

      /**
       * Mentioned users data.
       * @example ""
       */
      mentioned_users: string;

      /**
       * Video author information.
       */
      author: {
        /**
         * Author unique identifier.
         * @example "1234567890123456789"
         */
        id: string;

        /**
         * Author username.
         * @example "cool_username"
         */
        unique_id: string;

        /**
         * Author display name.
         * @example "Cool User"
         */
        nickname: string;

        /**
         * Author avatar URL.
         * @example "https://p16-sign-va.tiktokcdn.com/obj/..."
         */
        avatar: string;
      };

      /**
       * Top result indicator.
       * @example 0, 1
       */
      is_top: number;
    };

    /**
     * Pagination cursor for next results.
     * @example 10, 20, 0
     */
    cursor: number;

    /**
     * Whether more results are available.
     * @example true, false
     */
    has_more: boolean;
  };
}
