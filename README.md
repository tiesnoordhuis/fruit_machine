# instructions

on port: /dev/ttyACM0
add user to group
`sudo usermod -a -G dialout $USER`
give group permissions
`sudo chmod a+rw /dev/ttyACM0`

run react
`npm run start`