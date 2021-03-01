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

  constructor(fileService: FileService) {
    this.takenNames = fileService.takenNames.join(", ");
  }
}
