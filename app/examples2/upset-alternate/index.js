import { simpsons_alternate } from '../util/datasets';
import showComponent from '../util/showComponent';

import '../../examples/index.styl';

window.onload = () => {
  showComponent('UpSet', 'div', {
    data: simpsons_alternate,
    id: 'Name',
    sets: [
      'Male',
      'Power Plant',
      'Evil',
      'Blue Hair',
      'Duff Fan',
      'School'
    ],
    fields: ['School']
  });
};
