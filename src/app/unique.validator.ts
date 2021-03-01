import { Directive, Input } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { FileService } from "./file.service";

@Directive({
  selector: "[uniqueFileName]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueFileNameValidator,
      multi: true
    }
  ]
})
export class UniqueFileNameValidator implements AsyncValidator {
  @Input("uniqueFileName")
  forbiddenName: string;

  constructor(private fileService: FileService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.log(`start validating token "${this.forbiddenName}"`);
    const forbidden =
      this.forbiddenName && (control.dirty || control.touched)
        ? this.fileService.validate(control.value)
        : of(false);

    return forbidden.pipe(map(forbiddenName => ({ forbiddenName })));
  }
}
