function ccp --description 'Copy a file to the clipboard'
    if test (count $argv) -ne 1
        echo 'Usage: ccp FILE' >&2
        return 2
    end
    pbcopy < "$argv[1]"
end
