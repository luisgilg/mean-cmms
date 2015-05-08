'use strict';

google.load('visualization', '1', {
    packages: ['bar']
});


angular.module('cmmsApp')
.controller('MonitorOSCtrl', ['$scope', '$http', 
    function($scope,$http) {
        
        $scope.fecHasta = new Date();
        var desde = new Date();
        desde.setMonth(desde.getMonth() - 1);
        $scope.fecDesde = desde;
        
        $scope.toggleReporte = function() {
            $scope.isCantidad = !$scope.isCantidad;
            if ($scope.isCantidad) {
                $scope.cards = cardsCantidad;
                $scope.view = viewCantidad;
                chart_linea.draw($scope.view, options);
                return;
            }
            
            $scope.cards = cardsImporte;
            $scope.view = viewImporte;
            chart_linea.draw($scope.view, options);
        }
        
        var cardsCantidad = [
            {
                title: 'Activo Omint',
                selected: true,
                max: {title: 'obra social max W W W',value: 0},
                min: {title: 'obra social min W',value: 9007199254740991}
            }, 
            {
                title: 'Emitido OOSS',
                selected: true,
                max: {title: 'obra social max X',value: 0},
                min: {title: 'obra social min X X X',value: 9007199254740991}
            }, 
            {
                title: 'Cobrado Omint',
                selected: true,
                max: {title: 'OSDE',value: 0},
                min: {title: 'obra social',value: 9007199254740991}
            }, 
            {
                title: 'Anulado',
                selected: true,
                max: {title: 'obra social max Z',value: 0},
                min: {title: 'obra social min Z',value: 9007199254740991}
            }];
        
        var cardsImporte = [
            {
                title: 'Activo Omint',
                selected: true,
                max: {title: 'obra social max W W W',value: 0},
                min: {title: 'obra social min W',value: 9007199254740991}
            }, 
            {
                title: 'Emitido OOSS',
                selected: true,
                max: {title: 'obra social max X',value: 0},
                min: {title: 'obra social min X X X',value: 9007199254740991}
            }, 
            {
                title: 'Cobrado Omint',
                selected: true,
                max: {title: 'OSDE',value: 0},
                min: {title: 'obra social',value: 9007199254740991}
            }, 
            {
                title: 'Anulado',
                selected: true,
                max: {title: 'obra social max Z',value: 0},
                min: {title: 'obra social min Z',value: 9007199254740991}
            }];
        
        $scope.cards = cardsCantidad;

        //var estados = ['OS','Estado 1','Estado 2','Estado 3','Estado 4'];
        //var vals = [];
        
        var valuesCantidad = new google.visualization.DataTable();
        var valuesImporte = new google.visualization.DataTable();
        
        var columStates = [];
        valuesCantidad.addColumn('string', 'OS');
        
        valuesImporte.addColumn('string', 'OS');
        
        columStates.push(true);
        
        for (var x in cardsCantidad) {
            valuesCantidad.addColumn('number', cardsCantidad[x].title);
            valuesImporte.addColumn('number', cardsCantidad[x].title);
        }
        
        var rnd = function(min, max) {
            return Math.floor(Math.random() * max) + min;
        }
        
        $scope.getData = function() {
            $http.post('http://10.10.20.30:18111/api/rest/TraerMonitorOSCarpetas', {
                FechaDesde: $scope.fecDesde,
                FechaHasta: $scope.fecHasta
            })
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            
            
            });
        
        }();
        
        
        
        for (var i = 0; i < 50; i++) {

            //Aca comienza la simulacion de datos de la respuesta        
            //valores de cantidad
            var est1 = rnd(5, 100);
            var est2 = rnd(50, 400);
            var est3 = rnd(100, 200);
            var est4 = rnd(5, 50);

            //valores para importe
            var est1i = est1 * rnd(5, 10);
            var est2i = est2 * rnd(5, 10);
            var est3i = est3 * rnd(5, 10);
            var est4i = est4 * rnd(5, 10);
            
            var item = {
                OOSS: 'obra social ' + i,
                Estado1: [est1, est1i], //Cantidad , Importe
                Estado2: [est2, est2i],
                Estado3: [est3, est3i],
                Estado4: [est4, est4i],
            }
            //Aca termina la simulacion de datos de la respuesta
            
            if (cardsCantidad[0].min.value > item.Estado1[0]) {
                cardsCantidad[0].min.value = item.Estado1[0];
                cardsCantidad[0].min.title = item.OOSS;
            }
            
            if (cardsCantidad[0].max.value < item.Estado1[0]) {
                cardsCantidad[0].max.value = item.Estado1[0];
                cardsCantidad[0].max.title = item.OOSS;
            }
            
            if (cardsCantidad[1].min.value > item.Estado2[0]) {
                cardsCantidad[1].min.value = item.Estado2[0];
                cardsCantidad[1].min.title = item.OOSS;
            }
            
            if (cardsCantidad[1].max.value < item.Estado2[0]) {
                cardsCantidad[1].max.value = item.Estado2[0];
                cardsCantidad[1].max.title = item.OOSS;
            }
            
            
            if (cardsCantidad[2].min.value > item.Estado3[0]) {
                cardsCantidad[2].min.value = item.Estado3[0];
                cardsCantidad[2].min.title = item.OOSS;
            }
            
            if (cardsCantidad[2].max.value < item.Estado3[0]) {
                cardsCantidad[2].max.value = item.Estado3[0];
                cardsCantidad[2].max.title = item.OOSS;
            }
            
            if (cardsCantidad[3].min.value > item.Estado4[0]) {
                cardsCantidad[3].min.value = item.Estado4[0];
                cardsCantidad[3].min.title = item.OOSS;
            }
            
            if (cardsCantidad[3].max.value < item.Estado4[0]) {
                cardsCantidad[3].max.value = item.Estado4[0];
                cardsCantidad[3].max.title = item.OOSS;
            }
            
            
            
            if (cardsImporte[0].min.value > item.Estado1[1]) {
                cardsImporte[0].min.value = item.Estado1[1];
                cardsImporte[0].min.title = item.OOSS;
            }
            
            if (cardsImporte[0].max.value < item.Estado1[1]) {
                cardsImporte[0].max.value = item.Estado1[1];
                cardsImporte[0].max.title = item.OOSS;
            }
            
            if (cardsImporte[1].min.value > item.Estado2[1]) {
                cardsImporte[1].min.value = item.Estado2[1];
                cardsImporte[1].min.title = item.OOSS;
            }
            
            if (cardsImporte[1].max.value < item.Estado2[1]) {
                cardsImporte[1].max.value = item.Estado2[1];
                cardsImporte[1].max.title = item.OOSS;
            }
            
            
            if (cardsImporte[2].min.value > item.Estado3[1]) {
                cardsImporte[2].min.value = item.Estado3[1];
                cardsImporte[2].min.title = item.OOSS;
            }
            
            if (cardsImporte[2].max.value < item.Estado3[1]) {
                cardsImporte[2].max.value = item.Estado3[1];
                cardsImporte[2].max.title = item.OOSS;
            }
            
            if (cardsImporte[3].min.value > item.Estado4[1]) {
                cardsImporte[3].min.value = item.Estado4[1];
                cardsImporte[3].min.title = item.OOSS;
            }
            
            if (cardsImporte[3].max.value < item.Estado4[1]) {
                cardsImporte[3].max.value = item.Estado4[1];
                cardsImporte[3].max.title = item.OOSS;
            }
            
            
            var datum = [item.OOSS, item.Estado1[0], item.Estado2[0], item.Estado3[0], item.Estado4[0]];
            valuesCantidad.addRow(datum);
            
            datum = [item.OOSS, item.Estado1[1], item.Estado2[1], item.Estado3[1], item.Estado4[1]];
            valuesImporte.addRow(datum);
        }
        
        
        
        
        var options = {
            height: 300,
            
            hAxis: {
                //title: 'OOSS',
                textPosition: 'out',
                textStyle: {fontSize: 10},
                slantedText: true,
                viewWindowMode: 'pretty' //pretty|maximized
            },

            //vAxis: {
            //title: 'Cantidad'
            //},
            
            chartArea: {left: 50,top: 10,width: '100%',height: '75%'},
            
            width: valuesCantidad.getNumberOfRows() * 40,
            bar: {groupWidth: 70},
            legend: {
                position: 'in', //bottom|left|in|none|top
                maxLines: 3,
                textStyle: {fontSize: 10}
            },
            fontSize: 12,

        //title: 'Desempeño de la empresa'
        //,colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
        
        };
        var chart_linea = new google.visualization.ColumnChart(document.getElementById('chart'));
        
        var viewCantidad = new google.visualization.DataView(valuesCantidad);
        chart_linea.draw(valuesCantidad, options);
        
        var viewImporte = new google.visualization.DataView(valuesImporte);
        //chart_linea.draw(valuesCantidad, options);
        
        $scope.isCantidad = true;
        $scope.view = viewCantidad;
        
        $scope.estadoChanged = function(item) {
            
            var visiblesColums = [0];
            for (var x in $scope.cards) {
                if ($scope.cards[x].selected) {
                    visiblesColums.push(parseInt(x) + 1);
                }
            }
            
            var index = $scope.cards.indexOf(item);
            if (!item.selected) {
                if (visiblesColums.length > 1)
                    $scope.view.hideColumns([index + 1]);
            
            } else {
                $scope.view.setColumns(visiblesColums);
            }
            
            chart_linea.draw($scope.view, options);
        }
    
    
    }]);
