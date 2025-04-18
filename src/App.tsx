import React from 'react';
import NewsSnippet, { IData_SnippetNews } from './components/NewsSnippet.tsx';

const App = () => {
  const newsData: IData_SnippetNews = {
    "ID": 260855433,
    "TI": "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones",
    "AB": "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones\nAugust 2020 by Kaspersky\nNew research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by Kaspersky, nearly half (47%) of smartphone owners who use a banking app don't protect their mobile device with antivirus or security software. More than half (52%) of UK smartphone owners who access bank accounts with their mobile device are worried about their banking app being hacked if their phone was lost or stolen. Despite that fear, 47% are banking on devices without antivirus protection. Surprisingly, one fifth (21%) of adults overall, and one third (33%) of Generation Z, believe their phone can't be hacked, despite the level of mobile malware attacks rising over the past 12 months. Around two-in-five of those without antivirus and security software say they don't see the need for it.",
    "URL": "https://www.globalsecuritymag.com/Mobile-bankers-left-vulnerable-47,20200819,101944.html",
    "DP": "2025-03-06T21:00:00",
    "DOM": "globalsecuritymag.com",
    "SENT": "negative",
    "LANG": "en",
    "AU": ["Emily C.", "Taormina A."],
    "FAV": "/favicons/e65d69dc71ab539384fcc63062efdd3d.png",
    "KW": [
      {
        "value": "antivirus",
        "count": 10
      },
      {
        "value": "kaspersky",
        "count": 5
      },
      {
        "value": "new",
        "count": 1
      },
      {
        "value": "security",
        "count": 8
      },
      {
        "value": "banking",
        "count": 7
      },
      {
        "value": "mobile",
        "count": 6
      },
      {
        "value": "research",
        "count": 2
      }
    ],
    "HIGHLIGHTS": [
      "August 2020 by <kw>Kaspersky</kw> <kw>New</kw> research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by <kw>Kaspersky</kw>...",
      "...with <kw>antivirus</kw> or security software. More than half (52%) of UK smartphone owners who access bank accounts with their mobile device are worried about their banking app being hacked if their phone was lost or stolen. Despite that fear, 47% are banking on devices without <kw>antivirus</kw>...",
      "...phone with <kw>antivirus</kw> protection. Surprisingly, one fifth (21%) of adults overall, and one third (33%) of Generation Z, believe their phone can't be hacked, despite the level of mobile malware attacks rising over the past 12 months. Around two-in-five of those without <kw>antivirus</kw> and security software say they don't see the need for it."
    ],
    "REACH": 2392,
    "CNTR": "France",
    "CNTR_CODE": "fr",
    "TRAFFIC": [
      {
        "value": "India",
        "count": 0.779
      },
      {
        "value": "United States of America",
        "count": 0.101
      },
      {
        "value": "Mexico",
        "count": 0.036
      },
      {
        "value": "United Kingdom",
        "count": 0.028
      },
      {
        "value": "Germany",
        "count": 0.022
      }
    ]
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <NewsSnippet data={newsData} />
    </div>
  );
};

export default App;