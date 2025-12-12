function cinema --wraps='ssh -o StrictHostKeyChecking=no watch.ascii.theater' --description 'alias cinema ssh -o StrictHostKeyChecking=no watch.ascii.theater'
    ssh -o StrictHostKeyChecking=no watch.ascii.theater $argv
end
