function newlatex --description 'Run the LaTeX project helper'
    set -l script "$HOME/Github/latex/start.py"
    if not test -f "$script"
        echo 'Clone r0hin/latex into ~/Github/latex first.' >&2
        return 1
    end
    python3 "$script" $argv
end
