import { Component } from "@angular/core";
import { FontWeightResizerDirective } from "../directives/fontWeightResizer";

@Component({
  imports: [FontWeightResizerDirective],
  standalone: true,
  template: `
    <h2 fontWeightResizer="bold">Test directive</h2>
  `
})

export class TestFontWeightResizerDirectiveComponent { }