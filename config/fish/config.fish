eval (/opt/homebrew/bin/brew shellenv fish)
set -gx EDITOR 'zed --wait'
set -gx VISUAL 'zed --wait'

if status is-interactive
    set -g fish_greeting
    set -g pure_enable_single_line_prompt true
    fish_config theme choose 'Rosé Pine Moon'
    fzf --fish | source
    zoxide init fish | source
    set -g pure_check_for_new_release false
end

function c --description 'Open in Zed'
    zed $argv
end

function tmp --description 'Enter a new temporary directory'
    cd (mktemp -d)
end

function please --wraps=sudo
    sudo $argv
end
