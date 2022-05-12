import {
  BarChart,
  LineChart,
  PieChart,
  RingChart
} from './lib'

var con=document.getElementById('container');
var pie=new PieChart(con);
pie.init({
    title:'网站用户访问来源',
    toolTip:'访问来源',
    data:[
        {value:435, name:'直接访问', color: '#7eaafb'},
        {value:310, name:'邮件营销', color: '#7ee2bb'},
        {value:238, name:'联盟广告', color: '#8090ac'},
        {value:136, name:'视频广告', color: '#f8ce41'},
        {value:158, name:'搜索引擎', color: '#ee8a70'}
    ]
});

var bar = new BarChart(document.querySelector('#container1'))

bar.init({
  data: [
    {xAxis:'2012',value:2141, color: '#7eaafb'},
    {xAxis:'2013',value:1499, color: '#7eaafb'},
    {xAxis:'2014',value:3260, color: '#7eaafb'},
    {xAxis:'2015',value:1170, color: '#7eaafb'},
    {xAxis:'2016',value:970, color: '#7eaafb'},
    {xAxis:'2017',value:2350, color: '#7eaafb'}
  ]
})

var line = new LineChart(document.querySelector('#container2'))
line.init({
  color: '#249dff',
  data: [
    {xAxis:'2012',value:11},
    {xAxis:'2013',value:199},
    {xAxis:'2014',value:60},
    {xAxis:'2015',value:470},
    {xAxis:'2016',value:40},
    {xAxis:'2017',value:90},
    {xAxis:'2012',value:129},
    {xAxis:'2013',value:19},
    {xAxis:'2014',value:320},
    {xAxis:'2015',value:70},
    {xAxis:'2016',value:88},
    {xAxis:'2017',value:39}
  ]
})


var ring = new RingChart(document.querySelector('#container3'))

ring.init({
  data:[
    {value:45, name:'直接访问', color: '#7eaafb'},
    {value:80, name:'邮件营销', color: '#7ee2bb'},
    {value:238, name:'联盟广告', color: '#8090ac'},
    {value:36, name:'视频广告', color: '#f8ce41'},
    {value:158, name:'搜索引擎', color: '#ee8a70'}
]
})