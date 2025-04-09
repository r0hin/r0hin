function update_kitty --wraps='curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin' --description 'alias update_kitty curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin'
  curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin $argv
        
end
