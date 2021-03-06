# [candela](../..#readme).[components](..#readme).SurvivalPlot

A survival plot, used to visualize mortality rates of, e.g., patients with a
disease undergoing experimental treatments.  This visualization expects data
with a column specifying *time* as an offset from the start of the study
indicating the time of observed deaths or withdrawal from the study (aka
"censoring"), a column specifying *censorship status* (`0` if the patient has
left the study, aka been "right censored"; `1` if the patient has died), and an
optional column by which to group patients by, e.g., treatment type.

The number of surviving patients is plotted as a decreasing step function, with
crosses overplotted whenever a patient is censored from the study.

**extends** [VisComponent](../../VisComponent#readme)

### new ScatterPlot(el, options)

* **el** is the DOM element that will contain the visualization.

* **options** is an object with the following fields:

| Option    | Type   | Description  |
| :-------- | :----- | :----------- |
| width     | Number | Width of the chart in pixels. See [Sizing](../../#sizing). |
| height    | Number | Height of the chart in pixels. See [Sizing](../../#sizing). |
| renderer  | String | Whether to render in "svg" or "canvas" mode (default "canvas"). |
| data      | [Table](../..#table) | The data table. |
| time      | String | The observation event time field. Must contain numeric data. See [Axis Scales](../../#axis-scales). |
| censor    | String | The censorship status field. Must contain `0` or `1` only. |
| group     | String | The field used to split patients into groups. *Optional* |
| xAxis.title | String | The label to use for the x axis. Default: `Time` |
| yAxis.title | String | The label to use for the y axis. Default: `Survivors` |
| legend    | Boolean | Whether to enable the legend. Default: `false` |
| legendTitle | String | The title to use for the legend. Default: `Legend` |
