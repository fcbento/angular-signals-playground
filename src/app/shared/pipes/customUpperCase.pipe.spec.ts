import { CustomUpperCasePipe } from "./customUpperCase.pipe"

describe('CustomUpperCasePipe', () => {
  const customUpperCasePipe = new CustomUpperCasePipe();
  
  it('should transform letter to uppercase', () => {
    const textTransformed = customUpperCasePipe.transform('felipe');
    expect(textTransformed).toEqual('FELIPE')  
  })

  it('should return same string', () => {
    const textTransformed = customUpperCasePipe.transform('FELIPE');
    expect(textTransformed).toEqual('FELIPE')  
  })

})