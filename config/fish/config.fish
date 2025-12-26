# Normalise $HOME if a macOS path leaked into a Linux SSH session
if test (uname) = Linux
    if string match -q "/Users/*" "$HOME"
        if type -q getent
            set -l real_home (getent passwd $USER | cut -d: -f6)
            if test -n "$real_home"
                set -gx HOME "$real_home"
            end
        end
    end
end

function does_command_exist
    type -q $argv[1]
end

if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Rose pine theme
if fish_config theme list &>/dev/null
    fish_config theme choose "Rosé Pine Moon"
end

# pnpm global
set -gx PNPM_HOME ~/.pnpm/store

# Bat theme
if does_command_exist "bat"
    set -gx BAT_THEME rose-pine
    function cat --wraps='bat --color=always --plain' --description 'alias cat bat'
        bat $argv
    end
end

if does_command_exist "eza"
    function ls --wraps='eza --color=always --long --git --icons=always --no-time --no-user --no-permissions' --description 'alias ls eza --color=always --long --git --icons=always --no-time --no-user --no-permissions'
        eza --color=always --long --git --icons=always --no-time --no-user --no-permissions $argv
    end
end

# GPG & SSH
if test "$USER" = "rohin"; and not set -q SSH_CLIENT
    set -x SSH_AUTH_SOCK (gpgconf --list-dirs agent-ssh-socket)
    gpgconf --launch gpg-agent
end

# Zoxide
if does_command_exist "zoxide"
    zoxide init fish | source
    function cd --wraps=z --description 'alias cd z'
        z $argv
    end
    function j --wraps=z --description 'alias j z'
        z $argv
    end
end

# FZF
if does_command_exist "fzf"
    fzf --fish | source
end

# Fuck
if does_command_exist "thefuck"
    thefuck --alias | source
end

function deactivate
    echo (set_color magenta) "🥲 them vscode integrated terminal launch arguments messing up my terminal"
end

if not set -q SSH_CLIENT; and does_command_exist pyenv
    pyenv init - | source
end

# Auto venv
if test "$USER" = "rohin"; and not set -q SSH_CLIENT
    function auto_venv --on-variable PWD
        # Check if there's a venv or .venv folder in the current directory
        if test -d "$PWD/venv" -o -d "$PWD/.venv"
            if set -q VIRTUAL_ENV
                deactivate
            end
            
            set venv_path "$PWD/venv"
            if test -d "$PWD/.venv"
                set venv_path "$PWD/.venv"
            end
            
            source "$venv_path/bin/activate.fish"

            # Ensure venv's bin directory is at the front of the PATH
            set -gx PATH "$VIRTUAL_ENV/bin" $PATH
            echo (set_color green) "🐍 Activated virtual environment in $venv_path" (set_color normal)
        else
            # Deactivate if no venv folder is found
            if set -q VIRTUAL_ENV
                deactivate
                echo (set_color red) "❌ Deactivated virtual environment" (set_color normal)
            end
        end
    end

    auto_venv
end
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
if not set -q SSH_CLIENT
    if test -f /opt/anaconda3/bin/conda
        eval /opt/anaconda3/bin/conda "shell.fish" "hook" $argv | source
    else
        if test -f "/opt/anaconda3/etc/fish/conf.d/conda.fish"
            . "/opt/anaconda3/etc/fish/conf.d/conda.fish"
        else
            set -x PATH "/opt/anaconda3/bin" $PATH
        end
    end
end

# <<< conda initialize <<<

set -gx TERM xterm

