---
layout: post
title: Predicting road accidents in Spain using Open Data
date: 2025-05-19 12:00:00
description: How Open Data can help to improve the security of our roads
tags: cars Spain data
categories: data-science cars code
giscus_comments: true
social: true
---

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/post-pic.jpg" class="img-fluid rounded z-depth-1" %}

In Spain, road accidents remain a significant public safety concern, leading to loss of lives (**1.154 people lost their live on inter-urban roads in 2024**)(font: [El País](https://elpais.com/espana/2025-01-10/1154-personas-murieron-en-las-carreteras-en-2024-14-mas-que-el-ano-anterior.html)), injuries (**4.634 hospital admissions in 2024**)(font: [El País](https://elpais.com/espana/2025-01-10/1154-personas-murieron-en-las-carreteras-en-2024-14-mas-que-el-ano-anterior.html)), and economic burdens. **Despite various measures, predicting and preventing these incidents remains a challenge.**

This article summarizes a small project I made which aims to leverage the power of **machine learning to identify high-risk scenarios and suggest preventive measures**.

The aim of the project was to build a model that can **predict if a road accident will have mortal victims or not**, to be able to find which are the **most relevant factors that lead to fatalities on the road**.

The metrics that I used to evolve the model have been accuracy and recall on the positive values for fatal accidents. I made this because it was crucial for me in this analysis to clearly detect the fatal accidents and was not that important if we had some false positives. **At the end of the day, any recommendation we can give to avoid any accident will work on the right direction to safer roads.**

With the identification of these factors I obtained conclusions that may help to provide measures that can prevent losses of lives.

The data used for this project is the [Ficheros microdatos de accidentes con víctimas 2023 dataset](https://www.dgt.es/menusecundario/dgt-en-cifras/dgt-en-cifras-resultados/dgt-en-cifras-detalle/Ficheros-microdatos-de-accidentes-con-victimas-2023/) by the Spanish General Traffic Administration (DGT — Dirección General de Tráfico). In the dataset webpage there is an excel file with the data and another one with the diccionary of the category identifiers.

At the start of the project I took a look into the data and draw some plots that would help me understand better the dataset and obtain some draft hypothesis to work on.

The first thing I saw is that the datset was clearly imbalanced. This was due to the fact that (luckily) most of the accidents don’t have fatal victims. **In our dataset, more than 98% of the accidents didn’t have fatal victims.** This fact would be a problem in order to create our model, so I created a new balanced version of the dataset selecting randomly non-fatal accidents until I had 50% of fatal and non-fatal accidents.

With the plots previously drawn I was able to see some other interesting facts:

- Spain has a **much higher fatality rate in the weekends and in holiday seasons** (summer months + november and december).

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig1.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" caption="Proportion of Fatal and Non-Fatal accidents per day of the week" %}

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig2.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" caption="Proportion of Fatal and Non-Fatal accidents per month" %}

- **Fatal accidents use to happen in interurban roads**. We can see it not only in the `ZONA_AGRUPADA` category (the one that indicates 1 if the road where the accident happen is inter-urban and 2 if it is urban) but also in the `ZONA` (showing a big proportion of fatal accidents in inter-urban roads and an inverse proportion in streets) or the `COD_PROVINCIA` (shows a bigger proportion of non-fatal accidents in provinces like Madrid or Barcelona which most of its population lives in big cities).

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig3.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" caption="1 means inter-urban roads and 2 urban roads" %}

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig4.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" caption="1 means inter-urban road, 2 means inter-urban road inside town, 3 means street, 4 urban motorway" %}

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig5.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" caption="Most populated areas show less percentage of fatal accidents" %}

- **Almost half of the mortal accidents happen in single-lane conventional roads**. The other half is mostly happening in urban roads and expressways.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig6.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" caption="1 and 2 mean toll and toll-free highways, 3 means motorway, 6 means single-lane conventional road, 9 means street" %}

- **Most fatal accidents are frontal collisions followed by run-off-road collisions and pedestrian hits.**

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig7.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" caption="1=frontal, 2=fronto-lateral, 3=lateral, 4=rear-end, 7=pedestrian hits, 10=falls, 12&16=run-off-road with collision" %}

- **Most fatal accident victims are car & motorbike drivers/passengers & pedestrians.** This demonstrates the obvious fact that public transportation is a safer alternative of transportation

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig8.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

- **There are more fatal accidents happening in the night, specially at 3AM.**

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig9.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

These first facts already give hints about where to look deeper to increase security on the spanish roads.

After this analysis, I started investigating which models would work better to classify if one accident will have or not fatal victims.

After reading [Machine learning predictive model based on national data for fatal accidents of construction workers](https://www.google.com/url?q=https%3A%2F%2Fwww.sciencedirect.com%2Fscience%2Farticle%2Fabs%2Fpii%2FS0926580519305151) by Jongko Choi, Bonsung Gu, Sangyoon Chin, Jong-Seok Lee, I decided to proceed with a model based on a **Random Forest Classifier as it was predictive model that performed the best when classifying workers who might face a fatality risk.**

In addition to this, the **Pandas Random Forest Classifier provides built-in feature importance scores**. These **scores indicate how much each feature contributes to the model’s predictions**. This helped to identify which are the factors that contribute the most to fatality in road accidents.

Before starting with the model, I eliminated from the dataset all columns that indicated number of fatalities as they would clearly influence my analisis to much.

After that, to be able to use the Random Forest Classifier I needed all the variables in my dataset to be numerical, so I converted all the non-numerical columns to numerical and imputed the NaNs. I created a pipeline for that and then created train and test inputs to fit the model.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig10.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

This first version of the model showed to perform really good, with an accuracy of 86%.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig11.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

I decided to see which were the features that had more importance in order to find useful conclusions and I saw that the most important features were the number of injured people in the accident.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig12.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

**Surprisingly, the 2 features indicating the number of minor injured victims showed much higher importance than the major injured.**

As this conclusions were not enough for me, I decided to eliminate from the original dataset the columns that had information about the injured victims and fit the model again.

As expected the accuracy of the model was much lower (75%), so I decided to improve the model by trying a couple of things:

1.  Add engineered features
2.  Doing RandomSearch to look for better parameters that should help obtain better accuracy

I tried to add the following engineered features:

1.  Weekend: 1 if weekend else 0
2.  Night: 1 if hour between 0 and 8 and between 21 and 24 else 0
3.  inStreet: 1 if accident happened in a street else 0

After doing so, I **fitted the model again without satisfactory results so I decided to remove the new features**.

Then, proceeded to do the **RandomSearch which provided great improvements in our target metric** (recall) (**up to 87% for predicting actual fatal accidents**). The number of **false positives also incremented** but is nothing to worry about as the **worst that could happen is that we recommend measures to reduce mortality in accidents that are already not mortal**.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig13.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

Being happy with the model, I started analysing the importance of the features in predicting fatal accidents.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig14.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

As is clearly shown in the graphic, by far the most relevant feature was `SENTIDO_1F` when the value was 4. When `SENTIDO_1F` is equal to 1 it means that the vehicle was going in the direction that augments the kilometric point of the road, 2 when its in the opposite direction, 3 when both and 4 when unknown.

When `SENTIDO_1F`is unknown is most probably because **the road itself doesn't have kilometric points**. In Spain, those roads are **basically urban roads and the highways, which we know for the statistical analysis that are the ones with lower fatality rates**.

This makes much sense as basically this feature indicates that the **road where the accident happened should be a safe road**.

In this regard we also see in the top20 features like `inStreet` or `TIPO_VIA_9` which clearly indicate **streets**.

On the other hand we also see features like the number of vehicles taking part in the accident (`TOTAL_VEHICULOS`). We can explore this later.

Other interesting findings are `CONDICION_ILUMINACION_6` which means that there was **no artificial or natural light in the accident (may lead to think about nightime)** or `ACERA_998` which means that the information about the **sidewalk does not apply (may lead to think about interurban roads)**.

Another repeated column in the features with most importance seems to be the accident type. Because of that, I wanted to see the feature importance of the type of accidents and type of roads.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig15.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

We basically see 5 types of accidents with the highest feature importance.

- **Type 1:** Frontal crash
- **Type 10:** Fall
- **Type 4:** Read-end
- **Type 16:** Run-off-road with crash to the right side
- **Type 8:** Animal runover

It’s interesting to see that type pedestrian runover doesn’t have importance in predicting the fatality of an accident when there are so many pedestrian deads due to these type of accidents.

Looking at our descriptive statistics from before, we can tell that probably a **frontal crash or a run-off-road with crash to the right side will predict a fatal accident** and that a **fall, a rear-end or an animal runover may predict a non fatal accident**.

I also wanted to look again at the importance of the features related with the type of the road, which showed me again that if accidents happen in streets is the only type of road that is important in order to predict (non-)fatal accidents.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig16.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

To finish, I wanted to look deeper at the `TOTAL_VEHICULOS` feature.

Let’s see in a plot how the fatality rate evolves in relationship with the total amount of vehicles involved in an accident.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig17.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

The graphic shows us that for most fatal accidents, surprisingly the more frequent feature is only one vehicle involved.

Let’s see fatal accidents with just one vehicle involved by accident type.

{% include figure.liquid loading="eager" path="assets/img/posts/2025-05-19-Predicting-road-accidents-in-Spain-using-Open-Data/fig18.png" class="img-fluid rounded z-depth-1 d-block mx-auto w-75" %}

We see that they are mostly pedestrian hits and run-off-road accidents.

To conclude with this small experiment, we can say:

- **Weekends and holiday seasons are more likely to have fatal accidents, specially in the night.** We see a correlation of this with the deployment of special controls by police officers for example.
- **Fatal accidents use to happen in inter-urban roads, specially in single-lane roads.** The administration has already a track record of measures working to reduce the fatality rate in inter-urban roads with the installation of speed cameras, speed-enforcement zones, reduction of speed limits in inter-urban roads, etc.
- **Most fatal accidents are frontal collisions followed by run-off-road collisions and pedestrian hits.** The homologation of vehicles is very strict in Europe regarding pedestrian hit security. Also, we see certifications like EuroNCAP evaluating the security of vehicles against many different accidents.
- **Pedestrians, cyclists and motorbike riders/passengers are more likely to die in an accident than other groups on the road.** There is still room to improve in working towards the security of most vulnerable road users, but we have seen already some changes in the laws to improve it.

Luckily we can say that our administrations have in their hands already useful data to make our roads more secure, and measures are already being implement. Besides that is always good to remind that it is a collective work to try to avoid any loss of lives in the road.

As conclusions of the project, I can say that **Open Data can clearly help to improve the security of the roads**. Accessible data like the one in the dataset used may help other data science enthusiasts and professionals in different industries help solve this and other problems that sadly still exist.

Personally this project has been a great experience to learn more about classification models and its optimisation, and also to learn more about the road accidents that sadly still kill too many people in Spain.

All the code can be found in my [Github](https://github.com/anrodon/predicting-road-accidents-in-spain) profile.
