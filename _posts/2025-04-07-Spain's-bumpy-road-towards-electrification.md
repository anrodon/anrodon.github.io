---
layout: post
title: Spain’s bumpy road towards electrification
date: 2025-04-07 12:00:00
description: What the last 12 months of car registrations in Spain tell us about its path to a zero-emissions car park
tags: cars Spain data
categories: data-science cars
giscus_comments: true
social: true
---

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/car-traffic.jpeg" class="img-fluid rounded z-depth-1" %}

The automotive industry is undergoing one of the most significant transformation periods in its history. New propulsion systems, regulations, consumer demands, and other factors are challenging the status quo of this century-old industry.

According to the European Commission, **passenger cars are responsible for around 16% of the total CO2 emissions in Europe**, and because of that, the European administration has set [fleet-wide CO2 emission targets](https://climate.ec.europa.eu/eu-action/transport/road-transport-reducing-co2-emissions-vehicles/co2-emission-performance-standards-cars-and-vans_en) to contribute to reaching at least 55% net greenhouse gas emission reductions by 2030 compared to 1990 as well as achieving climate neutrality by 2050, in line with the [European Climate Law](https://climate.ec.europa.eu/eu-action/european-climate-law_en).

**Spain is the second largest passenger car producer in Europe** (behind Germany) and the automotive industry generates approximately the 7% of the Spanish GDP. But Spain is not only a major automobile producer; it is also a significant consumer market for cars, with **yearly registration figures close to 1 million vehicles**.

The Spanish General Traffic Administration ([DGT — Dirección General de Tráfico](https://www.dgt.es/)) has an Open Data portal called [DGT en Cifras](https://www.dgt.es/menusecundario/dgt-en-cifras/), which allow everyone to download various data related to car registrations, drivers, fines, and other interesting topics related to the spanish car park.

I was curious about analyzing one of its datasets storing microdata of the registered cars for each month ([Microdatos de Matriculaciones de Vehículos (mensual)](https://www.dgt.es/menusecundario/dgt-en-cifras/dgt-en-cifras-resultados/dgt-en-cifras-detalle/Microdatos-de-parque-de-vehiculos-anual/)) and the results of this analysis show a really sad reality: **the spanish market is not choosing to purchase zero-emissions vehicles**.

Before starting to work with the data, I wrote four questions to guide my analysis:

1.  **Are the Spanish costumers purchasing electrified vehicles?**
2.  **Which Spanish provinces have the biggest and smallest number of electrified vehicles registrations?**
3.  **Which Spanish provinces are registering more and fewer polluting vehicles?**
4.  **Which car brands are selling more and fewer ecological cars in Spain?**

These questions were written with the aim of assessing if the spanish car consumers are taking or not into account the CO2 emissions when purchasing a new car. Because of that, we only took into account new passenger cars from the dataset (we did not include commercial vehicles, vans, industrial machinery, etc and neither used cars being registered again).

**The data used has been from March 2024 to February 2025 (last 12 available months of data).**

In regards of the first question the situation is the following:

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig1.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-50" %}

Even though **HEV cars** (Hybrid Electric Vehicles — gas cars with electric motor support) **are the ones being registered the most**, **PHEV** (Plug-in Hybrid Electric Vehicles) **and BEV** (Battery Electric Vehicles) **together account for only 11.3% of the registrations, with only 6.1% being fully electric**. This indicates that Spain still has a long way to go to reach zero-emission registrations.

With the second question, **“Which Spanish provinces have the highest and lowest number of electrified vehicle registrations?”**, I tried to delve deeper into the dataset.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig2.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

With the graphic above, I saw that the capital **Madrid is the clear winner in terms of zero-emissions vehicle registrations**, followed by big cities like Barcelona or Valencia. The top 10 bar graph states the same:

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig3.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

The capital of the country being so different from the other regions was a bit suspicious to me, so I started to think that the large numbers might be related to fleets (rental cars, leasing, etc.) of companies registered there.

Luckily, our dataset differentiated vehicles registered by natural and legal persons, so we could find the answer to confirm or reject my hypothesis.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig4.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

Looking at the graphic, **Madrid and Barcelona had a large proportion of cars registered by legal entities**, but I still wanted to know which of those cars were actually destined to be driven by customers who chose that kind of car (I didn’t want to take into account company fleets, for example).

Another interesting field in the dataset indicates whether the car is a renting car or not, so I could use it to separate the cars actually being driven by actual end customers from the other company cars.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig5.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

This last graphic made me see that our second question was not going to be answered with the data that we had. We see that **most of the PHEV and BEV cars registered by companies in Madrid are for Renting** (probably because most of the banks and renting companies in Spain are registered in Madrid), so **close to half of the PHEV and BEV cars registered in Madrid are probably to be driven by renting customers in other areas of Spain**.

So, we have an answer for our second question as we know that **Madrid is the province registering more electrified cars, but the customer behind the wheel may not be driving it in the capital**.

To complement this half answered question, I made a ratio of cars per habitant of each of the top 5 provinces registering more PHEV and BEV only by natural persons.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig6.png" caption="Top 5 provinces with more PHEV + BEV car registrations by natural persons" class="img-fluid rounded z-depth-1 d-block mx-auto w-50" %}

We can see that **Madrid and Valencia are the leaders in terms of electrified vehicles per capita** and Barcelona, Alicante and Malaga have similar numbers but are a slightly behind. Would be interesting to analize what is driving this behaviour in Madrid and Valencia to be able to implement measures to improve the rates in the other provinces.

To answer the third question, “**Which spanish provinces are registering more and less polluting vehicles?”**, I used the field in the dataset that indicates the g Co2/km of each car to have an average for each province.

Doing a quick average between all the cars registered, I found that **the average of CO2 emissions for cars registered in Spain for the last 12 months have been 123,09 g Co2/km**.

**This number is really alarming as the EU Commission target was 95 g Co2/km for 2024 and is 93,6 g Co2/km for 2025 to 2029.**

To get a bit of feeling of how bad the situation is, I wanted to see the average CO2 emissions of the top 15 sold models.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig7.png" caption="Top 15 car models by volume (BASTIDOR_ITV) with its average CO2 emmissions" class="img-fluid rounded z-depth-1 d-block mx-auto w-50" %}

We see that **for the 15 models with more registrations in the last 12 months, only the TOYOTA C-HR has an average g CO2 /km value inside the EU Comission Targets.**

Now focusing on the provinces, I took the company registered vehicles apart from the analysis to not contaminate the big picture, and printed the average emissions by province.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig8.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

Bad news again. **Not even one of the provinces in Spain is achieving the average emission targets of the EU Commission for the new cars registered**, but the accumulated fleet-wide average will be worse!

Let’s see it even more graphically:

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig9.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

In the map above, **the scale is set so all the provinces below the EU Commission targets should be shown in white, and more red as they pass the 95 g CO2/km figure**. All the map is dark red!

The map also gives us another sad fact. Before unveiling it, let’s see another bar graphic that may help identify it.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig10.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

**The top 10 provinces which registered bigger average CO2 emissions are in the southern part of Spain** (besides the 3 forming Aragón), **which is really sad taking in account the amount of sun hours they get every year which should lead to competitive 100% renewable electricity prices.**

**Again, we see a clear open task for both the central and regional administrations to boost electromobility.**

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig11.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

We see that Madrid is the city with less CO2 emissions per registered vehicle, but still has a long way to reach the targets of the EU Comission.

With this, our third question was answered. Only the fourth question is left: **Which car brands are selling more and less ecological cars in Spain?**

It is kind of obvious that the companies selling 100% BEVs are the ones selling the more ecological cars, but let’s see them ordered by volumes:

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig12.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

What we see basically is that **TESLA and BYD are the two brands leading the pack of companies with 100% electrified sales**.

But as we have seen, PHEV and BEV car registrations amount for a bit more than 10% of the market. Let’s see what happens with all the other cars. For my last graphic, I wanted to focus just on those brands who register more than 1.000 cars in the last 12 months in Spain.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-04-07-Spain's-bumpy-road-towards-electrification/fig13.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

**From all the brands selling more than 1.000 cars in the last 12 months, only TESLA, BYD and MINI are registering an average of g CO2/km below the EU Comission Targets.**

In my opinion, this is not something that the other brands are happy about. Most of them share proudly the vision of a future for the automotive industry with only zero-emissions vehicles, have invested lots of money into developing this kind of cars and spend a lot into advertising of their electric models.

**What this analysis shows is that the market in Spain is not choosing the electromobility options that the brands offer, and this is something that the spanish administrations should be really worried about.**

**It is urgent that the spanish market has the right incentives to buy zero-emission cars, not only to save the spanish automotive sector which is one of the most importants in the country, but to ensure that the future generations have a planet where to drive their cars too.**

_The full analysis and the code used can be found in this_ [_Github Repo_](https://github.com/anrodon/spanish-vehicle-registrations-analysis/tree/main).
