import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country: string = "";

  constructor(private activatedRoute: ActivatedRoute) 
  {
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params["country"]);
        this.country = params["country"]
      }
    )
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params["country"]);
        this.country = params["country"]
      }
    )
  }

}
