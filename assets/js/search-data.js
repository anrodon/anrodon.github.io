// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-predicting-road-accidents-in-spain-using-open-data",
        
          title: "Predicting road accidents in Spain using Open Data",
        
        description: "How Open Data can help to improve the security of our roads",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Predicting-road-accidents-in-Spain-using-Open-Data/";
          
        },
      },{id: "post-spain-s-bumpy-road-towards-electrification",
        
          title: "Spain’s bumpy road towards electrification",
        
        description: "What the last 12 months of car registrations in Spain tell us about its path to a zero-emissions car park",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Spain's-bumpy-road-towards-electrification/";
          
        },
      },{id: "news-i-uploaded-to-kaggle-the-microdata-of-all-the-cars-registered-in-spain-for-the-last-10-years",
          title: 'I uploaded to Kaggle the microdata of all the cars registered in Spain...',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/i-uploaded-to-kaggle-the-microdata-of-all-the-cars-registered-in-spain-for-the-last-10-years/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/anrodon", "_blank");
        },
      },{
        id: 'social-kaggle',
        title: 'Kaggle',
        section: 'Socials',
        handler: () => {
          window.open("https://www.kaggle.com/anrodon", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/andreurodriguezdonaire", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
