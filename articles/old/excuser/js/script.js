function generate() {

one = document.getElementById('1').value
two = document.getElementById('2').value
three = document.getElementById('3').value

num = Math.floor(Math.random() * 4);



if (num == 0) {
var res = 'OMG I just got a call from the ER one of my family members has some big accident I have to go there now! I cant go to the ' + one + ', but im sure you will undesrstand. could we find some other time to' + two + 'with you? Sorry, ' + three + ', I really got to go now, im so worried.'
}
else if (num == 1) {
var res = "omg i just checked my calendar and I've got a appointement at that day. Dang, I was really looking forward to the " + one + ". :( arrggg now I won't be able to " + two + " with you. Maybe, we could try and do something else together on a different date? Just let me know, ok? Again, sorry, " + three + ". I owe you one!"
}
else if (num == 2) {
    var res = 'Sorry I cant come today, I have been feeling SUPER sick lately I can barely get out of bed and ive got so low energy. I dont know when the sickness will end so i may not be able to go to the ' + one + ' with you. Man I hate being sick ugh, I wont be able to ' + two + ' with you now. Sorry, Ill make it up to you, ' + three + '! :/'
}
else if (num == 3) {
    var res = 'omg i just found out that i need to visit my family in another city so i cant come to the ' + one + '. I tried to stay here a few extra days but my family just wont hear it. I wish I could ' + two + ' with you but my family has been planning this for months. Sorry, maybe we could find another day together to make it up. Again, sorry, ' + three + '.'
}
else if (num == 4) {
    var res = 'Owww I just hit my head on the refrigerator its hurting soo much ahhgh, i think I need to go to doctors for some time so i might not make it to the ' + one + ', unfortuntely :(. I really wanted to ' + two + 'with u but life happens, I guess. Sorry, could we do something else together to make it up? Oww got to go, sorry. ' + three + '. :('
}


document.getElementById('text').innerHTML = res
$('#exampleModal2').modal('show')


}