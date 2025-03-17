if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Rose pine theme
fish_config theme choose "Rosé Pine Moon"

# pnpm global
set -gx PNPM_HOME ~/.pnpm/store

# Bat theme
if command -q bat
    set -gx BAT_THEME rose-pine
    function cat --wraps='bat --color=always --plain' --description 'alias cat bat'
        bat $argv
    end
end

if command -q eza
    function ls --wraps='eza --color=always --long --git --icons=always --no-time --no-user --no-permissions' --description 'alias ls eza --color=always --long --git --icons=always --no-time --no-user --no-permissions'
        eza --color=always --long --git --icons=always --no-time --no-user --no-permissions $argv
    end
end

# Pyenv 
pyenv init - | source

# GPG & SSH
if test "$USER" = "rohin" && not set -q SSH_CLIENT
    export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
    gpgconf --launch gpg-agent
end

# Zoxide
if command -q zoxide
    zoxide init fish | source
    function cd --wraps=z --description 'alias cd z'
        z $argv
    end
    function j --wraps=z --description 'alias j z'
        z $argv
    end
end

# FZF
if command -q fzf
    fzf --fish | source
end

# Fuck
if command -q thefuck
    thefuck --alias | source
end

function deactivate
    echo (set_color magenta) "🥲 them vscode integrated terminal launch arguments messing up my terminal"
end

# Auto venv
function auto_venv --on-variable PWD
    # Check if there's a venv folder in the current directory
    if test -d "$PWD/venv"
        if set -q VIRTUAL_ENV
            deactivate
        end
        source "$PWD/venv/bin/activate.fish"

        # Ensure venv's bin directory is at the front of the PATH
        set -gx PATH "$VIRTUAL_ENV/bin" $PATH
        echo (set_color green) "🐍 Activated virtual environment in $PWD" (set_color normal)
    else
        # Deactivate if no venv folder is found
        if set -q VIRTUAL_ENV
            deactivate
            echo (set_color red) "❌ Deactivated virtual environment" (set_color normal)

        end
    end
end

auto_venv
