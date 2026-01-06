function fish_right_prompt
    set_color normal
    mommy -1 -s $status
    set_color brblack
    echo -n ' '
    echo -n (date '+%H:%M:%S')
end
