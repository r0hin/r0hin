function launch_server --description 'Serve the current directory with Python 3'
    python3 -m http.server $argv
end
