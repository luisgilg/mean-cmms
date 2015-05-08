'use strict';

google.load('visualization', '1', {
  packages: ['corechart']
});

angular.module('cmmsApp')
  .controller('ChartsCtrl', function ($scope) {
    
   var data = google.visualization.arrayToDataTable([
        ['Año', 'Ventas', 'Gastos'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
      ]);
      var options = {
        //title: 'Desempeño de la empresa'
        //,colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']

      };
      var chart_linea = new google.visualization.LineChart(document.getElementById('chart_linea')); 
      chart_linea.draw(data, options);

      var chart_torta = new google.visualization.PieChart(document.getElementById('chart_torta')); 
      chart_torta.draw(data, options);

      var chart_barra = new google.visualization.BarChart(document.getElementById('chart_barra')); 
      chart_barra.draw(data, options);

      var chart_columna = new google.visualization.ColumnChart(document.getElementById('chart_columna')); 
      chart_columna.draw(data, options);

      options.is3D = true;

      var chart_torta_3d = new google.visualization.PieChart(document.getElementById('chart_torta_3d')); 
      chart_torta_3d.draw(data, options);


  });
