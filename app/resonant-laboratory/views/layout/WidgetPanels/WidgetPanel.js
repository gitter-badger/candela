import Backbone from 'backbone';
import d3 from 'd3';

// All widgets that are available
// TODO: When webpack supports it, this would be
// an ideal place for code splitting... only load
// widgets as they're needed
import DatasetView from '../../widgets/DatasetView';
import MatchingView from '../../widgets/MatchingView';
import VisualizationView from '../../widgets/VisualizationView';
let WIDGETS = {
  DatasetView: DatasetView,
  MatchingView: MatchingView,
  VisualizationView: VisualizationView
};
import DatasetIcon from '../../../images/dataset.svg';
import MatchingIcon from '../../../images/matching.svg';
import VisualizationIcon from '../../../images/scatterplot.svg';
let ICONS = {
  DatasetView: DatasetIcon,
  MatchingView: MatchingIcon,
  VisualizationView: VisualizationIcon
};

let WidgetPanel = Backbone.View.extend({
  initialize: function (spec) {
    this.spec = spec;
    this.widget = new WIDGETS[spec.widgetType](spec);
  },
  render: function () {
    // We need a header
    let header = d3.select(this.el)
      .selectAll('div.sectionHeader').data([0]);
    let headerEnter = header.enter().append('div')
      .attr('class', 'sectionHeader')
      .on('click', () => {
        this.widget.toggle();
      });

    let titleEnter = headerEnter.append('div')
      .attr('class', 'titleSection');

    // Add the icon that goes with the panel
    titleEnter.append('img')
      .attr('src', ICONS[this.widget.spec.widgetType]);

    // Add a title to the header that collapses / expands
    // the section
    titleEnter.append('h2')
      .attr('class', 'title');

    // Add a little space for the widget to
    // store status indicators and icons
    let indicatorsEnter = headerEnter.append('div')
      .attr('class', 'indicators');

    indicatorsEnter.append('div')
      .attr('class', 'indicatorIcons');

    // Finally, a div (that will scroll)
    // to contain the view
    let container = d3.select(this.el)
      .selectAll('#' + this.spec.hashName + 'Container')
      .data([0]);
    container.enter().append('div').attr({
      id: this.spec.hashName + 'Container',
      class: this.spec.widgetType + ' content'
    });

    // Now let's let the widget know
    // that we have its element
    this.widget.setPanel(this, container.node());

    this.renderIndicators();
  },
  renderIndicators () {
    // Update our title
    d3.select(this.el).select('h2.title')
      .text(this.widget.statusText.text)
      .attr('title', this.widget.statusText.title);

    // Update our set of indicator icons
    let indicatorIcons = d3.select(this.el)
      .select('.indicatorIcons')
      .selectAll('img').data(this.widget.icons);

    indicatorIcons.enter().append('img');
    indicatorIcons.exit().remove();
    indicatorIcons.attr('src', (d) => {
      return typeof d.src === 'function' ? d.src() : d.src;
    }).attr('title', (d) => {
      let title = typeof d.title === 'function' ? d.title() : d.title;
      return title || null;
    }).attr('class', (d) => {
      let className = typeof d.className === 'function' ? d.className() : d.className;
      return className || null;
    }).on('click', (d) => {
      d3.event.stopPropagation();
      if (d.onclick) {
        d.onclick(d3.event);
      }
    });
  }
});

WidgetPanel.WIDGETS = WIDGETS;
module.exports = WidgetPanel;
