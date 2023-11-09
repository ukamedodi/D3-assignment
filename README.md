# D3-assignment
Weclome Andy to my assignment Repository 

Aim of the project: To design a map of the Uk which comprises of the following countries, Scotland, Northern Ireland, England and Wales on the map 
using the Programing language Java script and specifically we did this by using D3 (or D3.js) which is a free, open-source JavaScript library for visualizing data. Its low-level approach built on web standards offers unparalleled flexibility in authoring dynamic, data-driven graphics. D3 here stands for Data driven document. 

Description of the project 
We were provided with the following JSON feed at: http://34.38.72.236/Circles/Towns/50

In it we had a random collection of towns in the United Kingdom starting with the letter "A" 
Hence why i titled the project : " "A" Literal Map of the UK" the towns were limited to a maximum of 500 as shown in the reload slider on the map.

Ways the project was implimented 

Writing a D3 program that cosumes the feed, this shown in my code.js file which will be attached and pushed in the repository, here we used codes to do the following below: 
(i) Uploading the Map of the united Kingdom using gb.json
(ii) Defining the map projection for the provided map code (in this we adjsuted the map to fit inside the container using variables
(iii) creating and SVG element for the map inside the dic with the map id here we specified coordinates 
(iV) The defining and creating color scales for different subnits or regions on the map
(v) Appending cirlces with the longitudes and Latitudes provided in the gb.json in here i provided enhancements and used animations mouseover to display town names 
(vi) Then i created a reload button as well as the slider and then we have the map



As specified by the professor we were asked to add to tooltips which i did and can be seen when one clicks on the points it displays the name of the town and the actual population of the town
when the towns are reoladed they appear randomly with a bouncing effect on to the map.

References 
https://github.com/isurueshan/d3ukmap (here i got the outlay for the map) 
Stack overflow to debug codes 
Andy Cobleys Lecture slides and Notes for the concepts 
