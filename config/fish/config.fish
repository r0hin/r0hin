if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Rose pine theme
fish_config theme choose "Rosé Pine Moon"

# pnpm global
set -gx PNPM_HOME ~/.pnpm/store

# Pyenv 
pyenv init - | source

# GPG & SSH
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
gpgconf --launch gpg-agent

# Fuck
thefuck --alias | source

# Clear
function claer
  echo 'fuck you'
end

function clera
  echo 'lmao'
end

# YTDLs
function ytdlv
    yt-dlp -S vcodec:h264,res,acodec:m4a $argv
end

function ytdla
    yt-dlp -x --audio-format mp3 $argv
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
