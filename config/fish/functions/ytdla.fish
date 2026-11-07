function ytdla --description 'Download audio as MP3'
    yt-dlp -x --audio-format mp3 $argv
end
