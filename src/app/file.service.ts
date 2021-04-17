import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class FileService {
  takenNames = ["File1", "File2", "File3"];

  constructor() {}

  validate(name: string): Observable<boolean> {
    return of(this.takenNames).pipe(
      delay(500),
      map(files => files.some(f => f.toLowerCase() === name.toLowerCase()))
    );
  }

  save(fileName: string): void {
    if (!fileName) {
      return;
    }
    this.takenNames.push(fileName);
  }
}
