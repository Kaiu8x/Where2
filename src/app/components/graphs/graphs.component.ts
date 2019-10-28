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
            { y: 71, label: "Week 1" },
            { y: 55, label: "Week 2" },
            { y: 50, label: "Week 3" },
            { y: 65, label: "Week 4" }
          ]
        }
      ]
    });

    chart.render();
  }
}
