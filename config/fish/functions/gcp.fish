function gcp
    if test (count $argv) -eq 1
        set commit_message $argv[1]
        git add .
        git commit -m "$commit_message"
        git push
    else
        echo "Usage: gcp \"commit message\""
    end
end
