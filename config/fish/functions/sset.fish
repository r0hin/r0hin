function sset --wraps='kitten ssh' --description 'alias s kitten ssh with remote setup'
    kitten ssh $argv -t "sh -c '
        # Clone the repo if needed
        if [ ! -d ~/GitHub/r0hin ]; then
            git clone https://github.com/r0hin/r0hin ~/GitHub/r0hin
        fi

        # Install Oh My Fish
        curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish

        # Run restore script if it exists and is executable
        if [ -x ~/GitHub/r0hin/config/raycast/restore.sh ]; then
            ~/GitHub/r0hin/config/raycast/restore.sh
        fi

        # Start appropriate shell
        if command -v fish >/dev/null; then
            exec fish -li
        else
            exec \$SHELL -li
        fi
    '"
end