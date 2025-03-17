function does_command_exist
    type -q $argv[1]
end

if does_command_exist "fnm"
    fnm env --use-on-cd --shell fish | source
end
