import { Component } from "@angular/core";
import { FileService } from "./file.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "";
  takenNames: string;

  constructor(private fileService: FileService) {
    this.displayTakenNames();
  }

  save(): void {
    this.fileService.save(this.name);
    this.displayTakenNames();
  }

  displayTakenNames(): void {
    this.name = "";
    this.takenNames = this.fileService.takenNames.join(", ");
  }
}
