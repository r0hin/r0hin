function sset --wraps='kitten ssh' --description 'alias s kitten ssh with remote setup'
    kitten ssh $argv -t "sh -c '
        # Install git
        sudo apt-get install git-all

        # Install rsync
        sudo apt-get install rsync

        # Clone the repo if needed
        if [ ! -d ~/GitHub/r0hin ]; then
            git clone https://github.com/r0hin/r0hin ~/GitHub/r0hin
        fi

        # Install repo
        sudo apt-add-repository ppa:fish-shell/release-3

        # Updates
        sudo apt-get update && sudo apt-get upgrade

        # Install fish
        sudo apt-get install fish

        sudo apt-get install pyenv

        # Install Oh My Fish
        curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish

        # Run restore script
        ~/GitHub/r0hin/config/raycast/restore.sh

        # Start appropriate shell
        if command -v fish >/dev/null; then
            exec fish -li
        else
            exec \$SHELL -li
        fi
    '"
end