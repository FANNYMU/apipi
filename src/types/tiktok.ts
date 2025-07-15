export interface TiktokDown {
  code: number;
  msg: string;
  processed_time: number;
  data: {
    id: string;
    region: string;
    title: string;
    cover: string;
    ai_dynamic_cover: string;
    origin_cover: string;
    duration: number;
    play: string;
    wmplay: string;
    size: number;
    wm_size: number;
    music: string;
    music_info: {
      id: string;
      title: string;
      play: string;
      cover: string;
      author: string;
      original: boolean;
      duration: number;
      album: string;
    };
    play_count: number;
    digg_count: number;
    comment_count: number;
    share_count: number;
    download_count: number;
    collect_count: number;
    create_time: number;
    anchors: any | null;
    anchors_extras: string;
    is_ad: boolean;
    commerce_info: {
      adv_promotable: boolean;
      auction_ad_invited: boolean;
      branded_content_type: number;
      with_comment_filter_words: boolean;
    };
    commercial_video_info: string;
    item_comment_settings: number;
    mentioned_users: string;
    author: {
      id: string;
      unique_id: string;
      nickname: string;
      avatar: string;
    };
    images: string[];
  };
}
export interface TiktokSearch {
  code: number;
  msg: string;
  processed_time: number;
  data: {
    videos: {
      video_id: string;
      region: string;
      title: string;
      cover: string;
      ai_dynamic_cover: string;
      origin_cover: string;
      duration: number;
      play: string;
      wmplay: string;
      size: number;
      wm_size: number;
      music: string;
      music_info: {
        id: string;
        title: string;
        play: string;
        cover: string;
        author: string;
        original: boolean;
        duration: number;
        album: string;
      }[];
      play_count: number;
      digg_count: number;
      comment_count: number;
      share_count: number;
      download_count: number;
      create_time: number;
      anchors: null;
      anchors_extras: string;
      is_ad: boolean;
      commerce_info: {
        auction_ad_invited: boolean;
        with_comment_filter_words: boolean;
        adv_promotable: boolean;
        branded_content_type: number;
      };
      commercial_video_info: string;
      item_comment_settings: number;
      mentioned_users: string;
      author: {
        id: string;
        unique_id: string;
        nickname: string;
        avatar: string;
      };
      is_top: number;
    };
    cursor: number;
    has_more: boolean;
  };
}
