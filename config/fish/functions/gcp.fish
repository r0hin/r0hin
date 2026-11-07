function gcp --description 'Stage, commit, and push the current project'
    if test (count $argv) -ne 1
        echo 'Usage: gcp "commit message"' >&2
        return 2
    end
    git add .; and git commit -m "$argv[1]"; and git push
end
