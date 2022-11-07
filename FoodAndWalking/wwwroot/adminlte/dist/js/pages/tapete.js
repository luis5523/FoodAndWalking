/*
 * Author: luis alberto ramirez
 * Date: 22 Julio 2022
 * Description:
 *    genera la grafica 
 **/

/* global moment:false, Chart:false, Sparkline:false */

anychart.onDocumentReady(function () {
    anychart.data.loadJsonFile(
        'https://raw.githubusercontent.com/luis5523/FoodAndWalking/master/FoodAndWalking/wwwroot/resources/surfaceAreaData.json',
        function (data) {
            // processing of the data
            var result = [];
            for (var x = 0; x < data.x.length; x++) {
                for (var y = 0; y < data.y.length; y++) {
                    result.push([x, data.y.sort()[y], data.z[x][y]]);
                }
            }

            // create surface chart
            var chart = anychart.surface();

            // enable markers and set data for them
            chart.markers().enabled(true).data(result);

            // set x axis labels format
            chart
                .xAxis()
                .labels()
                .format(function () {
                    return data.x[Math.round(this.value)];
                });

            // set x axis scale maximum
            chart.xScale().maximum(data.x.length - 1);

            // set chart paddings
            chart.padding(25, 50, 75, 50);

            // set chart title
            chart.title('Datos procesados tapete');

            // set container id for the chart
            chart.container('containergrafica');

            // initiate chart drawing
            chart.draw();
        }
    );
});
