import * as fromCity from './city.actions';

describe('loadCitys', () => {
  it('should return an action', () => {
    expect(fromCity.loadCitys().type).toBe('[City] Load Citys');
  });
});
