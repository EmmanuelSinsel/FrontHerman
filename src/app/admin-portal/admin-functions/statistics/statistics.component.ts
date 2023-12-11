import { Component } from '@angular/core';
import { CanvasJSChart } from '@canvasjs/angular-charts';
import { CrudService } from 'src/services/crud.service';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  datas:any[] = [];

  constructor(private crud: CrudService){}
  
  chartOptions = {
	}	
  donutChartOptions = {
	}	

  ngOnInit(){
    this.get_data()

  }

  get_data(){
    this.crud.get_statistics().subscribe(
      (res: any) => {
        console.log(res)
        let count: number = 0
        let months = res['data']
        let cats = res['categories']
        let cat_data = res['cats']
        console.log(cat_data)
        let fulldata = []
        let fullcatdata: any[] = []
        cats.forEach((element: any) => {count++});
        for(let i = 0; i< count ; i++){
          let temp = {
            y:cat_data[cats[i][0]]['count'],
            name:cat_data[cats[i][0]]['category']
          }
          fullcatdata.push(temp)
        }
      
        for(let i = 0; i< count ; i++){
          let dataPoins: any[] = []
          for(let j = 1; j <= 12; j++){
            let temp = {x:new Date(2021, j-1, 1),y:0}
            for(let k = 0; k< count ; k++){
              if(months[j][cats[k][0]]['id_category']==cats[i][0]){
                console.log(months[j][cats[k][0]]['count'])
                temp.y=months[j][cats[k][0]]['count']
              }
            }
            dataPoins.push(temp)
          }
          let data = {
            type:"line",
            name: cats[i][1],
            showInLegend: true,
            yValueFormatString: "#",
            dataPoints: dataPoins
          }
          fulldata.push(data)
        }
        
        let temp = {
          animationEnabled: true,
          theme: "light2",
          backgroundColor: "#FAFAFA",
          title: {
            text: "Prestamos en el año",
            fontFamily: "Palatino",
            fontWeight: "bold",
          },
          axisX: {
            valueFormatString: "MMM",
            intervalType: "month",
            interval: 1
          },
          axisY: {
            title: "Prestamos",
          },
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            itemclick: function(e: any){
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              } else{
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          data:fulldata
        }
        this.chartOptions = temp
        let tempdonut = {
          animationEnabled: true,
          backgroundColor: "#FAFAFA",
          title:{
          text: "Total de libros por categoria",
          fontFamily: "Palatino",
          fontWeight: "bold",
          },
          data: [{
          type: "doughnut",
          yValueFormatString: "#,###.##",
          indexLabel: "{name}",
          dataPoints: fullcatdata
          }]
        }
        this.donutChartOptions = tempdonut
      },
      (error) => {
      }
    );
  }
}
function viewchild(basechartdirective: any): (target: StatisticsComponent, propertyKey: "chart") => void {
  throw new Error('Function not implemented.');
}

