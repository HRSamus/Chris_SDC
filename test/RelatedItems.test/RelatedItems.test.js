/**
 * @jest-environment jsdom
 */
import Carousel from '../../client/src/components/RelatedItems/Carousel.jsx';
import YourOutfit from '../../client/src/components/RelatedItems/YourOutfit.jsx';
import testData from '../../client/src/components/RelatedItems/testData.js';
import renderer from 'react-test-renderer';
import {render, screen, cleanup} from '@testing-library/react';


test('next hides on change', () => {
  render(<Carousel data={testData}><YourOutfit/></Carousel>);

  const nextButtonElement = screen.getByTestId('nextControl');
  expect(nextButtonElement).not.toBeNull();

})