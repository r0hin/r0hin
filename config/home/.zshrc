
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# bun completions
[ -s "/Users/rohin/.bun/_bun" ] && source "/Users/rohin/.bun/_bun"

# fnm
FNM_PATH="/Users/rohin/Library/Application Support/fnm"
if [ -d "$FNM_PATH" ]; then
  export PATH="/Users/rohin/Library/Application Support/fnm:$PATH"
  eval "`fnm env`"
fi

# Added by Windsurf
export PATH="/Users/rohin/.codeium/windsurf/bin:$PATH"
export EDITOR=/Applications/Windsurf.app/Contents/MacOS/Electron

# Added by Windsurf
export PATH="/Users/rohin/.codeium/windsurf/bin:$PATH"

# Added by Windsurf
export PATH="/Users/rohin/.codeium/windsurf/bin:$PATH"

# Added by Windsurf
export PATH="/Users/rohin/.codeium/windsurf/bin:$PATH"

# Added by Windsurf
export PATH="/Users/rohin/.codeium/windsurf/bin:$PATH"

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<


# pnpm
export PNPM_HOME="/Users/rohin/.pnpm/store"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
