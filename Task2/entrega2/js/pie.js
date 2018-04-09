

function pieChart(pais){

  d3.csv("order_country_year.csv", function(d) {
    return {
      state : d.state,
      telephone: +d.Telephone,
      visit: +d["Sales visit"],
      special:+d.Special,
      mail: +d.Mail,
      email: +d["E-mail"],
      fax: +d.Fax,
      web:+d.Web
  };
},
 function (data) {
    console.log(pais);
   var Npais=21; // 21= World
   for (i = 0; i < 21; i++){
      if(pais==data[i].state){
          Npais=i;
      }
  }

var dades = [
  {	"label": "Telephone",
    "value": data[Npais].telephone,
    "color": "#2383c1"
  },

  {
    "label": "Sales visit",
    "value": data[Npais].visit,
    "color": "#64a61f"
  },
  {
    "label": "Special",
    "value": data[Npais].special,
    "color": "#7b6788"
  },
  {
    "label": "Mail",
    "value": data[Npais].mail,
    "color": "#a05c56"
  },
  {
    "label": "E-mail",
    "value": data[Npais].email,
    "color": "#961919"
  },
  {
    "label": "Web",
    "value": data[Npais].web,
    "color": "#e98125"
  },
  {
    "label": "Fax",
    "value": data[Npais].fax,
    "color": "#d8d239"
  }
]
  console.log(dades);

var pie = new d3pie("pieChart", {

  "header": {
    "title": {
      "text": "Order types percetatges",
      "fontSize": 24,
      "font": "open sans"
    },
    "subtitle": {
      "color": "#999999",
      "fontSize": 12,
      "font": "open sans"
    },
    "titleSubtitlePadding": 9
  },
  "footer": {
    "color": "#999999",
    "fontSize": 10,
    "font": "open sans",
    "location": "bottom-left"
  },
  "size": {
    "canvasWidth": 590,
    "pieInnerRadius": "35%",
    "pieOuterRadius": "89%"
  },
  "data": {
    "sortOrder": "value-desc",
    "content": dades

  },
  "labels": {
    "outer": {
      "pieDistance": 12
    },
    "inner": {
      "hideWhenLessThanPercentage": 3
    },
    "mainLabel": {
      "fontSize": 15
    },
    "percentage": {
      "color": "#ffffff",
      "fontSize": 16,
      "decimalPlaces": 1
    },
    "value": {
      "color": "#adadad",
      "fontSize": 13
    },
    "lines": {
      "enabled": true,
      "style": "straight"
    }
  },
  "effects": {
    "pullOutSegmentOnClick": {
      "effect": "none",
      "speed": 400,
      "size": 8
    }
  },
  "misc": {
    "gradient": {
      "enabled": true,
      "percentage": 70
    }
  },
  "callbacks": {}
});
});

return pie;
}

var pais='Canada'
var pie = pieChart(pais)
