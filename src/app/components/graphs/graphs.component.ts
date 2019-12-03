import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "../../../assets/js/canvasjs.min.js";

@Component({
  selector: "app-graphs",
  templateUrl: "./graphs.component.html",
  styleUrls: ["./graphs.component.scss"]
})
export class GraphsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Events per Month"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { y: 71, label: "Jan" },
            { y: 55, label: "Feb" },
            { y: 50, label: "Mar" },
            { y: 65, label: "Apr" }
          ]
        }
      ]
    });

    chart.render();
  }
}
