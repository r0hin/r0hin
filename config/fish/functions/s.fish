function s --wraps='kitten ssh' --description 'alias s kitten ssh'
  kitten ssh $argv -t "sh -c 'if which fish >/dev/null ; then exec fish -li; else exec \$SHELL -li; fi'"
end