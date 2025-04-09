function launch_server --wraps='python -m http.server' --description 'alias launch_server python -m http.server'
  python -m http.server $argv
        
end
