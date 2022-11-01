import { createGlobalStyle } from 'styled-components';

import Cinzel from './Cinzel/Cinzel-VariableFont_wght.ttf';
import Old_Standard_TT from './Old_Standard_TT/OldStandardTT-Regular.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Cinzel';
    src: local('Cinzel'), url(${Cinzel}) format('truetype');
  }
  @font-face {
    font-family: 'OldStandard';
    src: local('Old_Standard_TT'), url(${Old_Standard_TT}) format('truetype');
  }
`;