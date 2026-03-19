#!/bin/bash

# Set the center coordinates of the circle
#center_x=`xdotool getmouselocation | cut -d ' ' -f 1 | cut -d ':' -f 2`
#center_y=`xdotool getmouselocation | cut -d ' ' -f 2 | cut -d ':' -f 2`
# Set the radius of the circle
radius=600
#center_x=$center_x-$radius
center_x=1199.8
center_y=989.9
xdotool mousemove $(echo "$center_x+$radius" | bc) $center_y
# Calculate the coordinates for drawing the circle

# Set the number of points (more points for smoother circle)
num_points=140

# Calculate the angle increment for each point
angle_increment=$(echo "scale=10; 360 / $num_points" | bc)
xdotool mousedown 1
#echo $center_x
#echo $center_y

# Loop through each angle and draw the circle
for ((i = 0; i < num_points; i++)); do
    angle=$(echo "$i * $angle_increment" | bc)

    # Calculate the coordinates for this point
    x=$(echo "$center_x + $radius * c($angle * 3.1415926535897932384626433832795 / 180)" | bc -l)
    y=$(echo "$center_y + $radius * s($angle * 3.1415926535897932384626433832795 / 180)" | bc -l)

    # Move the mouse to the calculated coordinates
    xdotool mousemove "$x" "$y"
    
    # echo $i

    # Simulate holding the mouse button (left click)

    # Wait for a short duration (adjust as needed)

    # Release the mouse button
    sleep 0.1
done
xdotool mouseup 1

