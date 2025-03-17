function does_command_exist
    type -q $argv[1]
end

if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Rose pine theme
fish_config theme choose "Rosé Pine Moon"

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

if does_command_exist "pyenv"
    pyenv init - | source
end

# Auto venv
if test "$USER" = "rohin"; and not set -q SSH_CLIENT
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
end
