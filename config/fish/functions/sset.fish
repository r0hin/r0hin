function sset --wraps='kitten ssh' --description 'alias s kitten ssh with remote setup'
    kitten ssh $argv -t "sh -c '
        if [ ! -d ~/GitHub/r0hin ]; then
            git clone https://github.com/r0hin/r0hin ~/GitHub/r0hin
        fi

        if [ -x ~/GitHub/r0hin/config/raycast/restore.sh ]; then
            ~/GitHub/r0hin/config/raycast/restore.sh
        fi

        if command -v fish >/dev/null; then
            exec fish -li
        else
            exec \$SHELL -li
        fi
    '"
end