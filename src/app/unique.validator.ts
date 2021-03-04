import { Directive, Input } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { debounceTime, map, tap } from "rxjs/operators";
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
    const token = this.forbiddenName || control.value;

    let validate$ = this.fileService.validate(control.value).pipe(
        debounceTime(300),
        tap(() => console.log(`start validating token "${token}"`))
    );

    const forbidden =
     token && (control.dirty || control.touched)
        ? validate$
        : of(false);

    return forbidden.pipe(map(forbiddenName => ({ forbiddenName })));
  }
}
