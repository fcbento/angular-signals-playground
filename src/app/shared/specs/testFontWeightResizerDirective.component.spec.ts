import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TestFontWeightResizerDirectiveComponent } from "./testFontWeightResizerDirective.component"
import { FontWeightResizerDirective } from "../directives/fontWeightResizer";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe('TestFontWeightResizerDirectiveComponent', () => {
  let fixture: ComponentFixture<TestFontWeightResizerDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestFontWeightResizerDirectiveComponent,
        FontWeightResizerDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(TestFontWeightResizerDirectiveComponent);
    fixture.detectChanges();
  })

  it("should font-weight to be bold", () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const fontWeight = h2.style.fontWeight;
    expect(fontWeight).toEqual('bold');
  })

})