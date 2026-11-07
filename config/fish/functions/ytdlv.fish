function ytdlv --description 'Download video, preferring H.264 and M4A'
    yt-dlp -S vcodec:h264,res,acodec:m4a $argv
end
