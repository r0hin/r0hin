if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Rose pine theme
fish_config theme choose "Rosé Pine Moon"

# Pyenv 
pyenv init - | source

# GPG & SSH
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
gpgconf --launch gpg-agent